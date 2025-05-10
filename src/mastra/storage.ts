import { LibSQLStore } from "@mastra/libsql";
// import { PostgresStore } from "@mastra/pg";

export const libSqlStorage = new LibSQLStore({
  url: ":memory:",
});

// export const postgresStorage = new PostgresStore({
//   connectionString: process.env.DATABASE_URL!,
// });
