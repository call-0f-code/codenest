export default{
    port: process.env.PORT || 3000,
    allowed_origins: process.env.ALLOWED_ORIGINS || "*",

    JWT_SECRET: ()=>{
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        return process.env.JWT_SECRET;
    },
    SALTING: ()=>{
        if (!process.env.SALTING) {
            throw new Error("SALTING is not defined in environment variables");
        }
        return process.env.SALTING;
    },
    API_URL:()=>{
        if (!process.env.API_URL) {
            throw new Error("API_URL is not defined in environment variables");
        }
        return process.env.API_URL;
    },

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL!,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID!,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET!,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL!
}