const getEnvVars = () => {
  return {
    API_URL: process.env.EXPO_PUBLIC_API_URL,
    AI_API_KEY: process.env.EXPO_PUBLIC_AI_API_KEY,
  };
};

export const env = getEnvVars();
