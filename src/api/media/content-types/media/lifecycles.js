module.exports = {
  async beforeCreate(event) {
    enforceExclusiveFileOrUrl(event.params.data);
  },

  async beforeUpdate(event) {
    enforceExclusiveFileOrUrl(event.params.data);
  },
};

function enforceExclusiveFileOrUrl(data) {
  const hasFile =
    (Array.isArray(data.file) && data.file.length > 0) ||
    (typeof data.file === "object" && data.file !== null);

  const hasUrl = !!data.url && data.url.trim() !== "";

  if ((hasFile && hasUrl) || (!hasFile && !hasUrl)) {
    throw new Error(
      "Exactly one of 'file' or 'url' must be provided, not both or neither."
    );
  }

  if (hasFile) {
    data.url = null;
  }
  if (hasUrl) {
    data.file = null;
  }
}
