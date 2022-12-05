const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");
const { Users } = require("./models");

///// ROUTERS
app.use("/", require("./routes/Users"));
//////////

db.sequelize
	.sync({ alter: true })
	.then(() => {
		app.listen(8080, () => {
			console.log("Server is running on port 8080");
		});
	})
	.catch((err) => {
		console.error(err);
		console.log(err.message);
		console.log("Server couldn't connect to the database!");
	});
