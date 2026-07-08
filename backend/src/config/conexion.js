const mysql = require("mysql2");

const conexion = mysql.createPool({

    host: "localhost",

    user: "root",

    password: "",

    database: "sistema_recetarios",

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

});

module.exports = conexion.promise();