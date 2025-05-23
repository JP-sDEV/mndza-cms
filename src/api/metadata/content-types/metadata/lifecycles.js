// src/api/metadata/content-types/metadata/lifecycles.js

module.exports = {
  async beforeUpdate(event) {
    const { data, where } = event.params;

    // If user tries to publish this entry
    if (data.publishedAt && data.publishedAt !== null) {
      // Unpublish all other published entries
      await strapi.db.query("api::metadata.metadata").updateMany({
        where: {
          id: { $ne: where.id }, // Exclude current entry
          publishedAt: { $not: null }, // Only already published
        },
        data: {
          publishedAt: null, // Unpublish
        },
      });
    }
  },

  async beforeCreate(event) {
    const { data } = event.params;

    if (data.publishedAt && data.publishedAt !== null) {
      await strapi.db.query("api::metadata.metadata").updateMany({
        where: {
          publishedAt: { $not: null },
        },
        data: {
          publishedAt: null,
        },
      });
    }
  },
};
