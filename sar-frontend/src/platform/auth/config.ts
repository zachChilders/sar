import { createEnvConfig } from "lib/createEnvConfig";

export const { clientId, domain, audience } = createEnvConfig({
  development: {
    clientId: "BDZ7Cf06EmdjlGYxOwXIxRpYbFa3toEC",
    domain: "dev-qk7unf8tab34juvy.us.auth0.com",
    audience: "https://datumsource.us",
  },
  production: {
    clientId: "deBRXyxyWBtxo3zOFLg0zNHVte5PxRJF",
    domain: "datumsource.us.auth0.com",
    audience: "https://datumsource.us",
  },
});
