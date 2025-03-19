const pool = require("../config/db");

// Helper function to calculate distance
const getDistance = (lat1, lon1, lat2, lon2) => {
	lat1 = parseFloat(lat1);
	lon1 = parseFloat(lon1);
	lat2 = parseFloat(lat2);
	lon2 = parseFloat(lon2);
	const R = 6371; // Earth radius in km
	const dLat = ((lat2 - lat1) * Math.PI) / 180;
	const dLon = ((lon2 - lon1) * Math.PI) / 180;
	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
};

exports.addSchool = async (req, res) => {
	try {
		const { name, address, latitude, longitude } = req.body;
		const [result] = await pool.query("INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)", [name, address, latitude, longitude]);

		// Log the inserted data
		console.log("Inserted School:", { id: result.insertId, name, address, latitude, longitude });

		res.status(201).json({
			message: "School added successfully",
			id: result.insertId,
			name,
			address,
			latitude,
			longitude,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

exports.listSchools = async (req, res) => {
	try {
		const userLat = parseFloat(req.query.latitude);
		const userLon = parseFloat(req.query.longitude);

		if (isNaN(userLat) || isNaN(userLon)) {
			return res.status(400).json({ message: "Valid latitude and longitude are required" });
		}

		const [schools] = await pool.query({
			sql: "SELECT * FROM schools ORDER BY latitude, longitude",
			timeout: 10000, // 10 seconds timeout
		});

		const schoolsWithDistance = schools.map((school) => ({
			...school,
			distance: getDistance(userLat, userLon, school.latitude, school.longitude),
		}));

		schoolsWithDistance.sort((a, b) => a.distance - b.distance);

		// Log the retrieved data
		console.log("Retrieved Schools:", schoolsWithDistance);

		res.json({
			message: "Schools retrieved successfully",
			data: schoolsWithDistance,
		});
	} catch (error) {
		if (error.code === "ETIMEDOUT") {
			console.error("Database query timed out:", error);
			res.status(504).json({ message: "Database query timed out" });
		} else {
			console.error(error);
			res.status(500).json({ message: "Server error" });
		}
	}
};
