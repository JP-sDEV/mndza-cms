"use strict";

// /**
//  * tag router
//  */

// const { createCoreRouter } = require("@strapi/strapi").factories;

// module.exports = createCoreRouter("api::tag.tag");

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::tag.tag", {
  config: {
    find: {
      middlewares: ["global::api-key"],
    },
    findOne: {
      middlewares: ["global::api-key"],
    },
  },
});
