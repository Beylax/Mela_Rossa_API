import mysql from "mysql2/promise";
import dbconn from "../../../dbconnection";
import NextCors from "nextjs-cors";

export default async function getAllRoles(req, res) {
	const dbconnection = await mysql.createConnection(dbconn);
	await NextCors(req, res, {
		// Options
		methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
		origin: "*",
	});
	if (req.method === "GET") {
		try {
			const query = "SELECT * FROM Roles";
			const values = [];
			const [data] = await dbconnection.execute(query, values);
			dbconnection.end();

			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else if (req.method === "POST") {
		try {
			const role = req.body;
			const query = "INSERT INTO Roles VALUES (?, ?, ?)";
			const values = [role.Hierarchy, role.Name, role.Description];
			const [data] = await dbconnection.execute(query, values);
			dbconnection.end();

			res.status(201).json();
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}
