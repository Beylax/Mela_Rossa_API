import mysql from "mysql2/promise";
import dbconn from "../../../dbconnection";
import NextCors from "nextjs-cors";

export default async function getSummerCenter(req, res) {
	const dbconnection = await mysql.createConnection(dbconn);

	try {
		const query = `SELECT * FROM Summer_Centers WHERE Id = ?`;
		const values = [req.query.id];
		const [data] = await dbconnection.execute(query, values);
		dbconnection.end();

		await NextCors(req, res, {
			// Options
			methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
			origin: "*",
		});
		res.status(200).json(data[0]);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
