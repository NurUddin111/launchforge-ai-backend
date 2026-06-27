export const logger = {
    info: (message) => console.log(message),
    error: (message, error) => {
        console.error(message);
        if (error)
            console.error(error);
    },
    warn: (message) => console.warn(message),
};
//# sourceMappingURL=logger.js.map