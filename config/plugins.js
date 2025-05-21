// ./config/plugins.js
module.exports = ({ env }) => {
  const isProduction = env("NODE_ENV") == "production";

  const uploadConfig = {
    provider: isProduction ? "cloudinary" : "local",
    providerOptions: isProduction
      ? {
          cloud_name: env("CLOUDINARY_NAME"),
          api_key: env("CLOUDINARY_KEY"),
          api_secret: env("CLOUDINARY_SECRET"),
        }
      : {
          sizeLimit: 10 * 1024 * 1024, // 10MB
        },
  };

  console.log(`[Upload Plugin] Using provider: ${uploadConfig.provider}`);

  return {
    upload: {
      config: uploadConfig,
    },
  };
};
