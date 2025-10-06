const env = process.env.NODE_ENV
export const phpbackendURL = 'https://api.hstockalbums.com'
export const isDevCookies = env == "development" ?  "authjs.session-token": "__Secure-authjs.session-token"
export const BASE_URL = env == "development" ? "http://localhost:3000/api"  : "https://hstock.vercel.app/api"
export const Domain = env == "development" ? "http://localhost:3000"  : "https://hstock.vercel.app/api"
export const API_ENDPOINT ={
    alluserList:"/all-user",
    getAllCode:"/referral/get-code",
    validateCode:"/referral/validate",
    updateCodeStatus:"/referral/get-code",  // post method
    youtubeVideo:"/you-tube-video",
    createCode:"/referral/create",
    planApi:"/plan",
    heroSection:"/hero-section/",
    myPurchase:'/done'
    
}