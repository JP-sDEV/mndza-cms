/* eslint-disable no-undef */
"use strict";

/**
 * `api-key` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("In api-key middleware.");

    const apiKey = ctx.request.headers["x-api-key"];
    const validKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validKey) {
      ctx.throw(401, "Invalid or missing API key");
      return;
    }

    await next();
  };
};
