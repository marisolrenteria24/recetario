// Aquí consumiremos posteriormente la API pública TheMealDB
const axios = require("axios");

const URL = "https://www.themealdb.com/api/json/v1/1";

async function buscarReceta(nombre) {
    try {

        const respuesta = await axios.get(`${URL}/search.php?s=${nombre}`);

        return respuesta.data;

    } catch (error) {

        throw error;

    }
}

async function buscarCategoria(categoria) {

    try {

        const respuesta = await axios.get(`${URL}/filter.php?c=${categoria}`);

        return respuesta.data;

    } catch (error) {

        throw error;

    }

}

module.exports = {

    buscarReceta,
    buscarCategoria

};