"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("characters", [
      { name: "Rick Sanchez", status: "Alive", species: "Human", gender: "Male", origin: "Earth (C-137)", image: "url_to_image_1", createdAt: new Date(), updatedAt: new Date() },
      { name: "Morty Smith", status: "Alive", species: "Human", gender: "Male", origin: "Earth (C-137)", image: "url_to_image_2", createdAt: new Date(), updatedAt: new Date() },
      { name: "Summer Smith", status: "Alive", species: "Human", gender: "Female", origin: "Earth (C-137)", image: "url_to_image_3", createdAt: new Date(), updatedAt: new Date() },
      { name: "Beth Smith", status: "Alive", species: "Human", gender: "Female", origin: "Earth (C-137)", image: "url_to_image_4", createdAt: new Date(), updatedAt: new Date() },
      { name: "Jerry Smith", status: "Alive", species: "Human", gender: "Male", origin: "Earth (C-137)", image: "url_to_image_5", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("characters", null, {});
  },
};
