const bcrypt = require("bcrypt");
const repository = require("../repository/repository");

module.exports = function (app) {
    app.post('/adduser', async (req, res) => {
        // Check if required fields are present in the request body
        validateRequiredFields(req, ['username', 'password']);
        // Valores de la petición
        const { user, password } = req.body;
        // Encrypt the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        // Llamada al repositorio para chequear si existe el usuario
        const userExists = repository.checkIfUserExist(user).then(async u => {
        if (u) {
            res.status(401).json({ error: "User already exists" });
            return;
        }
            // Llamada al repositorio para añadir al usuario
            repository.addUser(user, hashedPassword).then(result => res.json(result))
            .catch((error) => errorHandler(error, res));
        })
        .catch(error => errorHandler(error, res));
    });
};