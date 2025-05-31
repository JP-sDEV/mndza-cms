const { v4: uuidv4 } = require("uuid");

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    if (!data.uuid) {
      data.uuid = uuidv4();
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    if (data.uuid) {
      delete data.uuid;
    }
  },
};
