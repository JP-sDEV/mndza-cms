module.exports = ({ env }) => {
  const client = env("DATABASE_CLIENT", "postgres");

  const connections = {
    postgres: {
      connection: env("DATABASE_URL")
        ? {
            connectionString: env("DATABASE_URL"),
            ssl: env.bool("DATABASE_SSL", false) && {
              rejectUnauthorized: env.bool(
                "DATABASE_SSL_REJECT_UNAUTHORIZED",
                true
              ),
              ca: env("DATABASE_SSL_CA"),
            },
          }
        : {
            host: env("DATABASE_HOST", "localhost"),
            port: env.int("DATABASE_PORT", 5432),
            database: env("DATABASE_NAME", "strapi"),
            user: env("DATABASE_USERNAME", "strapi"),
            password: env("DATABASE_PASSWORD", "strapi"),
            ssl: env.bool("DATABASE_SSL", false) && {
              rejectUnauthorized: env.bool(
                "DATABASE_SSL_REJECT_UNAUTHORIZED",
                true
              ),
              ca: env("DATABASE_SSL_CA"),
            },
          },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
