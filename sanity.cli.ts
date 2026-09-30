import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "zbmgwp5w";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineCliConfig({
  api: {
    dataset,
    projectId
  },
  deployment: {
    appId: "he2g911wzol7mfamwm3wqiay"
  },
  typegen: {
    generates: "./sanity.types.ts",
    path: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
    schema: "./schema.json"
  }
});
