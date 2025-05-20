"use strict";

// /**
//  * media router
//  */

// const { createCoreRouter } = require("@strapi/strapi").factories;

// module.exports = createCoreRouter("api::media.media");

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::media.media", {
  config: {
    find: {
      middlewares: ["global::api-key"],
    },
    findOne: {
      middlewares: ["global::api-key"],
    },
  },
});
