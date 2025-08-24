const env = process.env.NODE_ENV
export const isDevCookies = env == "development" ?  "authjs.session-token": "__Secure-authjs.session-token"
export const BASE_URL = env == "development" ? "http://localhost:3000/api"  : "http://localhost:3000/api"
export const Domain = env == "development" ? "http://localhost:3000"  : "http://localhost:3000/api"
export const API_ENDPOINT ={
    alluserList:"/all-user",
    getAllCode:"/referral/get-code",
    validateCode:"/referral/validate",
    updateCodeStatus:"/referral/get-code",  // post method
    youtubeVideo:"/you-tube-video",
    createCode:"/referral/create",
    planApi:"/plan",
    heroSection:"/hero-section/"
    
}