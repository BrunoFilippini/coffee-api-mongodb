const express = require("express");
require("dotenv").config();
require("./config/db.config")();

const app = express();

app.use(express.json());

const coffeeRouter = require("./routes/coffee.routes");
app.use("/coffee-inventory", coffeeRouter);

const orderRouter = require("./routes/order.routes");
app.use("/orders", orderRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at PORT ${process.env.PORT}`);
});
