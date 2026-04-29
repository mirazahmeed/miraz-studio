export const config = {
  useApi: process.env.NEXT_PUBLIC_USE_API === 'true',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || '',
};
