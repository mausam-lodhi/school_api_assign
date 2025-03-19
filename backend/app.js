require("dotenv").config();
const mysql = require("mysql2/promise");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const schoolRoutes = require("./routes/schoolRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", schoolRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const fs = require("fs");

async function testConnection() {
	try {
		const connection = await mysql.createConnection({
			host: process.env.DB_HOST,
			port: process.env.DB_PORT || 3306,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			connectTimeout: 30000, // Increased timeout to 30 seconds
		});
		await connection.ping();
		console.log("Connection successful");
		await connection.end();
	} catch (error) {
		if (error.code === "ETIMEDOUT") {
			console.error("Connection timed out. Please check your database server and network settings.");
		} else {
			console.error("Connection failed:", error);
		}
	}
}

testConnection();
// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: "Internal Server Error" });
});
