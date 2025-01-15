import path from "node:path"
import url from "node:url"

console.log(path.dirname(url.fileURLToPath(`${import.meta.url}`)))
export default {
  // path: __dirname + "/../", for AdonisJS v5
  path: path.dirname(url.fileURLToPath(`${import.meta.url}`)) + "/../", // for AdonisJS v6
  title: "API Info", // use info instead
  version: "1.0.0", // use info instead
  description: "Test info", // use info instead
  tagIndex: 3,
  info: {
    title: "API info",
    version: "1.0.0",
    description: "",
  },
  snakeCase: true,
  debug: false, // set to true, to get some useful debug output
  ignore: ["/swagger", "/docs", "/api/v1.0/login", "/api/v1.0/logout", "/api/v1.0/change-password", "/api/v1.0/users/create-account", "/api/v1.0/users/reset-password/:id", "/api/v1.0/users/block-user-account/:id", "/api/v1.0/users/change-role/:id", "/api/v1.0/users/roles", "/api/v1.0/files/*"],
  preferredPutPatch: "PUTCH", // if PUT/PATCH are provided for the same route, prefer PUT
  common: {
    parameters: {}, // OpenAPI conform parameters that are commonly used
    headers: {}, // OpenAPI conform headers that are commonly used
  },
  securitySchemes: {}, // optional
  authMiddlewares: ["auth", "auth:api"], // optional
  defaultSecurityScheme: "BearerAuth", // optional
  persistAuthorization: true, // persist authorization between reloads on the swagger page
  showFullPath: false, // the path displayed after endpoint summary
}
