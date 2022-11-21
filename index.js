const dotenv = require("dotenv");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const routes = require("./src/routes/routes");
const swaggerDocument = require("./swagger.json");

const PATH = "./config/.env";

dotenv.config({ path: PATH });

const app = express();

app.use(express.json());
app.use(fileUpload());

app.use("/", cors(), routes);
app.get("/", cors(), (req, res) => {
  res.sendStatus(200);
});

// swagger
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server starting in ${port} `));
