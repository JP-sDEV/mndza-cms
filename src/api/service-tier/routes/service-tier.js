"use strict";

// /**
//  * service-tier router
//  */

// const { createCoreRouter } = require("@strapi/strapi").factories;

// module.exports = createCoreRouter("api::service-tier.service-tier");

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::service-tier.service-tier", {
  config: {
    find: {
      middlewares: ["global::api-key"],
    },
    findOne: {
      middlewares: ["global::api-key"],
    },
  },
});
