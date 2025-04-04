"use strict";

const axios = require("axios");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const { data } = await axios.get("https://rickandmortyapi.com/api/character");

      const characters = data.results.map((char) => ({
        name: char.name,
        status: char.status,
        species: char.species,
        gender: char.gender,
        origin: char.origin.name, 
        image: char.image,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert("characters", characters);
      console.log("Seeders ejecutados");
    } catch (error) {
      console.error("Error al ejecutar seeds", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("characters", null, {});
    console.log("Seeds eliminads");
  },
};
