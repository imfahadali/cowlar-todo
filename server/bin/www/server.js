const normalizePort = require("normalize-port");

const app = require("../../app");
const { port } = require("../../config/appConfig");

const PORT = normalizePort(port);

app.listen(PORT, () => {
  console.log(`listenting on port ${PORT}`);
});
