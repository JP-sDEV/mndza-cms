"use strict";

// /**
//  * project router
//  */

// const { createCoreRouter } = require("@strapi/strapi").factories;

// module.exports = createCoreRouter("api::project.project");

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::project.project", {
  config: {
    find: {
      middlewares: ["global::api-key"],
    },
    findOne: {
      middlewares: ["global::api-key"],
    },
  },
});
