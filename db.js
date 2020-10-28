import appConfig from "./config";
const pg = require("pg");

console.log("-=-=-==-",appConfig.db.url);
export const connect = (config = appConfig) => {
  // console.log("=-=-url", appConfig.db.url);
  const client = new pg.Client(appConfig.db.url)
  client.connect().then(() => console.log("=-=-=-=-=-connect success"))
  // public_con = client
  return client
};


