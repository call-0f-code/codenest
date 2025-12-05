const validateEnvVar = (name: string, value: string | undefined): string => {
    if (!value) {
        throw new Error(`${name} is not defined in environment variables`);
    }
    return value;
};


export default{
    port: process.env.PORT || 3000,
    allowed_origins: process.env.ALLOWED_ORIGINS || "*",
    rate_limit_window_minutes: ()=>{
        if(!process.env.RATE_LIMIT_WINDOW_MINUTES){
            return 15;
        }
        return parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES)
    },
    rate_limit_max_request: ()=>{
        if(!process.env.RATE_LIMIT_MAX_REQUESTS){
            return 100;
        }
        return parseInt(process.env.RATE_LIMIT_MAX_REQUESTS)
    },
     REFRESH_TTL: ()=>{
        if(!process.env.REFRESH_TTL){
            return 7;
        }
        return parseInt(process.env.REFRESH_TTL)
    },
    ACCESS_TTL: ()=>{
        if(!process.env.ACCESS_TTL){
            return 15;
        }
        return parseInt(process.env.ACCESS_TTL)
    },
    REFRESH_SECRET: validateEnvVar('REFRESH_SECRET', process.env.REFRESH_SECRET),
    JWT_SECRET: validateEnvVar('JWT_SECRET', process.env.JWT_SECRET),
    SALTING: validateEnvVar('SALTING', process.env.SALTING),
    API_URL: validateEnvVar('API_URL', process.env.API_URL),
    GOOGLE_CLIENT_ID: validateEnvVar('GOOGLE_CLIENT_ID', process.env.GOOGLE_CLIENT_ID),
    GOOGLE_CLIENT_SECRET: validateEnvVar('GOOGLE_CLIENT_SECRET', process.env.GOOGLE_CLIENT_SECRET),
    GOOGLE_CALLBACK_URL: validateEnvVar('GOOGLE_CALLBACK_URL', process.env.GOOGLE_CALLBACK_URL),
    GITHUB_CLIENT_ID: validateEnvVar('GITHUB_CLIENT_ID', process.env.GITHUB_CLIENT_ID),
    GITHUB_CLIENT_SECRET: validateEnvVar('GITHUB_CLIENT_SECRET', process.env.GITHUB_CLIENT_SECRET),
    GITHUB_CALLBACK_URL: validateEnvVar('GITHUB_CALLBACK_URL', process.env.GITHUB_CALLBACK_URL),
    EMAIL_ID: validateEnvVar('EMAIL_ID', process.env.EMAIL_ID),
    RESEND_API_KEY: validateEnvVar('RESEND_API_KEY', process.env.RESEND_API_KEY),
}