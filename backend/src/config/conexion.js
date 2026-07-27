const mysql = require("mysql2");

const pool = mysql.createPool({

    host: "localhost",
    user: "root",
    password: "root",
    database: "sistema_recetarios",

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

});

const conexion = pool.promise();

conexion.getConnection()
    .then(connection => {
        console.log("✅ MySQL conectado correctamente");
        connection.release();
    })
    .catch(error => {
        console.log("❌ Error de conexión MySQL:");
        console.log(error.message);
    });

module.exports = conexion;