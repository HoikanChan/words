import postgres from "postgres";

const connectionString = process.env.POSTGRES_URL;

export const hasDatabase = Boolean(connectionString);

export const sql = connectionString
  ? postgres(connectionString, {
      ssl: "require",
      max: 1,
      prepare: false,
    })
  : null;
