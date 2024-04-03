module.exports = function (req, res, next) {
    const { username, password } = req.body;

    if (!username) {
        return res.status(400).json({ error: "There is no username" });
    }

    if (!password) {
        return res.status(400).json({ error: "There is no password" });
    }

    next();
};