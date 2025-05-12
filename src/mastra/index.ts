import { Mastra } from "@mastra/core/mastra";
// import { createLogger } from "@mastra/core/logger";

import { burnoutTestAgent } from "./agents/burnout_test";
import { postgresStorage } from "./storage";

export const mastra = new Mastra({
  agents: {
    burnoutTest: burnoutTestAgent,
  },
  storage: postgresStorage,
});
