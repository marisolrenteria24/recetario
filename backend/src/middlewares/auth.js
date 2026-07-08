const auth = (req, res, next) => {

    console.log("Middleware de autenticación");

    next();

};

module.exports = auth;