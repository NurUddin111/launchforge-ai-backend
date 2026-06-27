export const logger = {
  info: (message: string) => console.log(message),
  error: (message: string, error?: unknown) => {
    console.error(message);
    if (error) console.error(error);
  },
  warn: (message: string) => console.warn(message),
};
