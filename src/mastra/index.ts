import { Mastra } from "@mastra/core/mastra";
// import { createLogger } from "@mastra/core/logger";
// import { LibSQLStore } from "@mastra/libsql";

import { burnoutTestAgent } from "./agents/burnout_test";

export const mastra = new Mastra({
  agents: {
    burnoutTest: burnoutTestAgent,
  },
  // storage: new LibSQLStore({
  //   url: ":memory:",
  // }),
  // logger: createLogger({
  //   name: "Mastra",
  //   level: "info",
  // }),
});
