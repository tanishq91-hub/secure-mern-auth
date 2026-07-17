// The CSRF cookie is deliberately non-httpOnly (see backend/config/csrfMiddleware.js)
// so the frontend can read it and echo it back as a header on state-changing requests.
export function getCookie(name) {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)")
  )
  return match ? decodeURIComponent(match[1]) : null
}
