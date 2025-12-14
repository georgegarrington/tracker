import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:8791/openapi.json", // sign up at app.heyapi.dev
  output: "src/tracker-client",
});
