function validateAndParseInt(name: string, string: string, radix?: number | undefined): number {
  const numberFromString = parseInt(string, radix);
  if (isNaN(numberFromString))
    throw new Error(`Argument "${name}" must be number!`);
  return numberFromString;
}

export function ValidateEnvironmentConfiguration() {
  const environment_mode = process.env.NODE_ENV === "production" ? "production" : "development";
  const application = {
    port: validateAndParseInt("APPLICATION_PORT", process.env.APPLICATION_PORT || "3000", 10),
    hostname: process.env.APPLICATION_HOST || "127.0.0.1"
  } as const;

  const database = {
    name: process.env.DB_NAME || "octopus_auth",
    username: process.env.DB_USERNAME || "octopus_auth",
    password: process.env.DB_PASSWORD || "octopus_auth",
    hostname: process.env.DB_HOSTNAME || "127.0.0.1",
    port: validateAndParseInt("DB_PORT", process.env.DB_PORT || "5432", 10)
  } as const;

  const vk = {
    client_id: validateAndParseInt("VK_CLIENT_ID", process.env.VK_CLIENT_ID || "51716242", 10),
    client_secret: process.env.VK_CLIENT_SECRET
  } as const;

  return {
    environment_mode,
    application,
    database,
    vk
  } as const;
}

export type EnvironmentConfiguration = ReturnType<typeof ValidateEnvironmentConfiguration>;