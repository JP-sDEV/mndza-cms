/* eslint-disable no-undef */
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    if (!data.uuid) {
      data.uuid = uuidv4();
    }

    const q = await strapi.db.query("api::project.project").findMany({
      where: {
        order: {
          $notNull: true,
        },
      },
      orderBy: { order: "desc" },
    });

    // check if order field is non-empty and is non-negative
    if (typeof data.order !== "number" || data.order < 1) {
      throw new Error("Order must be a positive integer.");
    }

    // check if order number is taken
    const targetOrder = data.order;
    const match = q.find((proj) => proj.order === targetOrder);
    const existingUUID = match ? match.uuid : null;

    // reassign the old entry with an order of null
    // find project by UUID
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
          // Top-level publish flag
          publish: true,
        }
      );
    }
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;

    console.log("where: ", where);

    const current = await strapi.db
      .query("api::project.project")
      .findOne({ where });

    if (current?.order === data.order) return;

    const q = await strapi.db.query("api::project.project").findMany({
      where: {
        order: {
          $notNull: true,
        },
      },
      orderBy: { order: "desc" },
    });

    // check if order field is non-empty and is non-negative
    if (typeof data.order !== "number" || data.order < 1) {
      throw new Error("Order must be a positive integer.");
    }

    // check if order number is taken
    const targetOrder = data.order;
    const match = q.find((proj) => proj.order === targetOrder);
    const existingUUID = match ? match.uuid : null;

    // reassign the old entry with an order of null
    // Find project by UUID
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
          // Top-level publish flag
          publish: true,
        }
      );
    }

    // prevenet uuid from being mutated
    if (data.uuid) {
      delete data.uuid;
    }
  },
};
