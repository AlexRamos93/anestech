exports.handleError = (err) => {
    const { statusCode, message } = err;

    return { statusCode, message };
};
