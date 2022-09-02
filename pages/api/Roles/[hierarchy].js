import mysql from "mysql2/promise";
import dbconn from "../../../dbconnection";
import NextCors from "nextjs-cors";

export default async function getAllUsers(req, res) {
	const dbconnection = await mysql.createConnection(dbconn);

	try {
		const query = `SELECT * FROM Roles WHERE Hierarchy = ?`;
		const values = [req.query.hierarchy];
		const [data] = await dbconnection.execute(query, values);
		dbconnection.end();

		await NextCors(req, res, {
			// Options
			methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
			origin: "*",
		});
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
