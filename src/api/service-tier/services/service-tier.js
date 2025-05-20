"use strict";

/**
 * service-tier service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::service-tier.service-tier");
