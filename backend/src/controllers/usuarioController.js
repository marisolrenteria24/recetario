const conexion = require("../config/conexion");

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const [usuarios] = await conexion.query("SELECT * FROM usuarios");
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener usuarios",
            error: error.message
        });
    }
};

// Registrar usuario
exports.registrarUsuario = async (req, res) => {
    try {

        const { nombre, apellido, email, contrasena } = req.body;

        await conexion.query(
            "INSERT INTO usuarios(nombre, apellido, email, contrasena) VALUES (?, ?, ?, ?)",
            [nombre, apellido, email, contrasena]
        );

        res.json({
            mensaje: "Usuario registrado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al registrar usuario",
            error: error.message
        });

    }
};

// Login sencillo
exports.login = async (req, res) => {

    try {

        const { email, contrasena } = req.body;

        const [usuario] = await conexion.query(
            "SELECT * FROM usuarios WHERE email=? AND contrasena=?",
            [email, contrasena]
        );

        if (usuario.length === 0) {

            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });

        }

        res.json({
            mensaje: "Inicio de sesión correcto",
            usuario: usuario[0]
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al iniciar sesión",
            error: error.message
        });

    }

};