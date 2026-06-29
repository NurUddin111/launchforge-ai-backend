const validateRequest = (schema) => async (req, _res, next) => {
    await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
    });
    next();
};
export default validateRequest;
//# sourceMappingURL=validateRequest.js.map