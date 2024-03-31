const validateUserMiddleware = (req, res, next) => {
    const { user, password } = req.body;

    if (!user) {
        return res.status(400).json({ error: "Missing username" });
    }

    if (!password) {
        return res.status(400).json({ error: "Missing password" });
    }

    next();
};

module.exports = validateUserMiddleware;