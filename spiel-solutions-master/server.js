const express = require("express");
const cookies = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(cookies());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

require("./server/config/mongoose.config");

// Code that allows us to get req.body information
app.use(express.json(), express.urlencoded({ extended: true }));

const AllMyRoutes = require("./server/routes/spiel.routes");
AllMyRoutes(app);

const UserRoutes = require("./server/routes/user.routes");
UserRoutes(app);

app.listen(port, () => console.log(`Running on port ${port}!!`));
