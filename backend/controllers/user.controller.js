import bcrypt from "bcrypt"
import crypto from "crypto"
import sanitize from "mongo-sanitize"
import { getVerifyEmailHtml } from "../config/html.js"
import sendMail from "../config/sendMail.js"
import { registerSchema } from "../config/zod.js"
import { redisClient } from "../index.js"
import TryCatch from "../middlewares/TryCatch.js"
import { User } from "../models/user.model.js"

export const registerUser = TryCatch(async (req, res) => {
    const sanitizedBody = sanitize(req.body)

    const validation = registerSchema.safeParse(sanitizedBody)

    if (!validation.success) {
        const zodError = validation.error

        let firstErrorMessage = "Validation Failed"
        let allErrors = []

        if (zodError?.issues && Array.isArray(zodError.issues)) {
            allErrors = zodError.issues.map((issue) => ({
                field: issue.path ? issue.path.join(".") : "Unknown",
                message: issue.message || "Validation Error",
                code: issue.code
            }))

            firstErrorMessage = allErrors[0]?.message || "Validation Error"
        }
        return res.status(400).json({
            message: firstErrorMessage,
            error: allErrors
        })
    }

    const { name, email, password } = validation.data

    const reateLimitKey = `Register-rate-limit: ${req.ip}:${email}`

    if (await redisClient.get(reateLimitKey)) {
        return res.status(429).json({
            message: "Too many requests, Try again Later"
        })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const verifyToken = crypto.randomBytes(32).toString("hex")

    const verifyKey = `verify:${verifyToken}`

    const dataToStore = JSON.stringify({
        name, email, password: hashPassword
    })

    await redisClient.set(verifyKey, dataToStore, { EX: 300 })

    const subject = "Verify your email for Account Creation"
    const html = getVerifyEmailHtml({ email, token: verifyToken })

    await sendMail({ email, subject, html })

    await redisClient.set(reateLimitKey, "true", { EX: 60 })

    res.json({
        message: "If your email is valid, a verification link has been sent. It will expires in 5 minutes."
    })
})
