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
    title: "title",
    version: "1.0.0",
    description: "",
  },
  snakeCase: true,
  debug: false, // set to true, to get some useful debug output
  ignore: ["/swagger", "/docs"],
  preferredPutPatch: "PUTCH", // if PUT/PATCH are provided for the same route, prefer PUT
  common: {
    parameters: {}, // OpenAPI conform parameters that are commonly used
    headers: {}, // OpenAPI conform headers that are commonly used
  },
  securitySchemes: {
    
  }, // optional
  authMiddlewares: ["auth", "auth:api"], // optional
  defaultSecurityScheme: "BearerAuth", // optional
  persistAuthorization: true, // persist authorization between reloads on the swagger page
  showFullPath: false, // the path displayed after endpoint summary
}
