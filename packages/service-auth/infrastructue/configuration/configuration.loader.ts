export const ConfigurationLoader = () => ({
  jwt: {
    accessToken: {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
    },
    refreshToken: {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
    }
  },
  microservices: {
    users: {
      host: process.env.SERVICE_USERS_HOST,
      port: process.env.SERVICE_USERS_PORT
    }
  },
  authStrategies: {
    google: {
      callbackUrl: process.env.AUTH_STRATEGY_GOOGLE_CALLBACK_URL,
      clientId: process.env.AUTH_STRATEGY_GOOGLE_CLIENT_ID,
      secret: process.env.AUTH_STRATEGY_GOOGLE_SECRET
    }
  }
});
