import dns from "dns"
import dotenv from "dotenv"
import express from "express"
import { createClient } from "redis"
import connectDB from "./config/db.js"
import userRoutes from "./routes/user.routes.js"

dotenv.config()

dns.setServers(["1.1.1.1", "8.8.8.8"])
await connectDB()

const redisUrl = process.env.REDIS_URL
if (!redisUrl) {
    console.log("Missing Rdis Url")
    process.exit(1)
}

export const redisClient = createClient({
    url: redisUrl,
})

redisClient.connect().then(()=>console.log("Connected to Redis")).catch(console.error)

const app = express()

//Middlewares
app.use(express.json())

// Using Routes
app.use("/api/v1", userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
