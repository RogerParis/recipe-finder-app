import Constants from 'expo-constants';

const ENV = process.env.EXPO_PUBLIC_ENV || 'dev';

const getEnvVars = () => {
  const extra = Constants.expoConfig?.extra;
  return {
    API_URL: extra?.API_URL[ENV] || extra?.API_URL['dev'],
    AI_API_KEY: extra?.AI_API_KEY[ENV] || extra?.AI_API_KEY['dev'],
  };
};

export const env = getEnvVars();
