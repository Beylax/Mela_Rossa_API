import mysql from "mysql2/promise";
import dbconn from "../../../dbconnection";
import NextCors from "nextjs-cors";

export default async function getAllDataRanges(req, res) {
	const dbconnection = await mysql.createConnection(dbconn);
	await NextCors(req, res, {
		// Options
		methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
		origin: "*",
	});

	if (req.method === "GET") {
		try {
			const query = "SELECT * FROM Data_Range_Centers";
			const values = [];
			const [data] = await dbconnection.execute(query, values);
			dbconnection.end();

			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else if (req.method === "POST") {
		try {
			const data_range = req.body;
			const query = "INSERT INTO Data_Range_Centers VALUES (?, ?, ?)";
			const values = [
				data_range.Start_Date,
				data_range.End_Date,
				data_range.Summer_Center,
			];
			const [data] = await dbconnection.execute(query, values);
			dbconnection.end();

			res.status(201).json();
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}
