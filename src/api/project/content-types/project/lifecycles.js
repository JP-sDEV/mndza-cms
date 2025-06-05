/* eslint-disable no-undef */
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    if (!data.uuid) {
      data.uuid = uuidv4();
    }

    // If no order is provided, skip ordering logic
    if (data.order == null) {
      return;
    }

    // Validate order is a positive integer
    if (typeof data.order !== "number" || data.order < 1) {
      throw new Error("Order must be a positive integer or null.");
    }

    const q = await strapi.db.query("api::project.project").findMany({
      where: {
        order: {
          $notNull: true,
        },
      },
      orderBy: { order: "desc" },
    });

    // check if order number is taken
    const targetOrder = data.order;
    const match = q.find((proj) => proj.order === targetOrder);
    const existingUUID = match ? match.uuid : null;

    // reassign the old entry with an order of null
    const existing = await strapi.db.query("api::project.project").findOne({
      where: { uuid: existingUUID },
    });

    if (existing && existing.uuid !== data.uuid) {
      await strapi.entityService.update(
        "api::project.project",
        existing.id,
        {
          data: { order: null },
        },
        {
          publish: true,
        }
      );
    }
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;

    const current = await strapi.db
      .query("api::project.project")
      .findOne({ where });

    // Skip if order hasn't changed
    if (current?.order === data.order) return;

    // Skip logic if order is null or undefined (i.e., being cleared)
    if (data.order == null) {
      return;
    }

    // Validate that order is a positive integer
    if (typeof data.order !== "number" || data.order < 1) {
      throw new Error("Order must be a positive integer or null.");
    }

    // Continue logic only if order is a valid number
    const q = await strapi.db.query("api::project.project").findMany({
      where: {
        order: {
          $notNull: true,
        },
      },
      orderBy: { order: "desc" },
    });

    const targetOrder = data.order;
    const match = q.find((proj) => proj.order === targetOrder);
    const existingUUID = match ? match.uuid : null;

    const existing = await strapi.db.query("api::project.project").findOne({
      where: { uuid: existingUUID },
    });

    if (existing && existing.uuid !== data.uuid) {
      await strapi.entityService.update(
        "api::project.project",
        existing.id,
        {
          data: { order: null },
        },
        {
          publish: true,
        }
      );
    }

    if (data.uuid) {
      delete data.uuid;
    }
  },
};
