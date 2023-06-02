const normalizePort = require("normalize-port");

const app = require("../../app");

const PORT = normalizePort(process.env.PORT || "4000");
// const PORT = process.env.PORT || "4000";

app.listen(PORT, () => {
  console.log(`listenting on port ${PORT}`);
});
