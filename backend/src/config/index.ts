const validateEnvVar = (name: string, value: string | undefined): string => {
    if (!value) {
        throw new Error(`${name} is not defined in environment variables`);
    }
    return value;
};


export default{
    port: process.env.PORT || 3000,
    allowed_origins: process.env.ALLOWED_ORIGINS || "*",

    JWT_SECRET: validateEnvVar('JWT_SECRET', process.env.JWT_SECRET),
    SALTING: validateEnvVar('SALTING', process.env.SALTING),
    API_URL: validateEnvVar('API_URL', process.env.API_URL),
    GOOGLE_CLIENT_ID: validateEnvVar('GOOGLE_CLIENT_ID', process.env.GOOGLE_CLIENT_ID),
    GOOGLE_CLIENT_SECRET: validateEnvVar('GOOGLE_CLIENT_SECRET', process.env.GOOGLE_CLIENT_SECRET),
    GOOGLE_CALLBACK_URL: validateEnvVar('GOOGLE_CALLBACK_URL', process.env.GOOGLE_CALLBACK_URL),
    GITHUB_CLIENT_ID: validateEnvVar('GITHUB_CLIENT_ID', process.env.GITHUB_CLIENT_ID),
    GITHUB_CLIENT_SECRET: validateEnvVar('GITHUB_CLIENT_SECRET', process.env.GITHUB_CLIENT_SECRET),
    GITHUB_CALLBACK_URL: validateEnvVar('GITHUB_CALLBACK_URL', process.env.GITHUB_CALLBACK_URL)
}