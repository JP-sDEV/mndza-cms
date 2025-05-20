/* eslint-disable no-undef */
module.exports = {
  async beforeCreate(event) {
    if (event.params.data.active) {
      await strapi.db.query("api::metadata.metadata").updateMany({
        where: { active: true },
        data: { active: false },
      });
    }
  },

  async beforeUpdate(event) {
    if (event.params.data.active) {
      await strapi.db.query("api::metadata.metadata").updateMany({
        where: {
          active: true,
          id: { $ne: event.params.where.id },
        },
        data: { active: false },
      });
    }
  },
};
