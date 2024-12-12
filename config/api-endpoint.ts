const env = process.env.NODE_ENV
export const isDevCookies = env == "development" ?  "authjs.session-token": "__Secure-authjs.session-token"
export const BASE_URL = env == "development" ? "http://localhost:3000/api"  : "https://debate-arena.vercel.app/api"
export const Domain = env == "development" ? "http://localhost:3000"  : "https://debate-arena.vercel.app"
export const API_ENDPOINT ={
    debateAPI:"/debate",
    subscriptionGetPlan:"/subscription/getPlan",
    subscriptionDeductMinutes:"/subscription/deductMinutes",
    startDebate:"/start-debate",
    debateList:"/debate-list",
    histroyOfOne:"/history",
    evaluate:"/evaluate-debate",
    payment:"/payments",
    findDebate:"/debate-id"
}