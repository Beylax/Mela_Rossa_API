import mysql from "mysql2/promise";
import dbconn from "../../../dbconnection";

export default async function getAllSummerCenters(req, res) {
	const dbconnection = await mysql.createConnection(dbconn);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "1800");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"PUT, POST, GET, DELETE, PATCH, OPTIONS",
	);
	if (req.method === "GET") {
		try {
			const query = "SELECT * FROM Summer_Centers";
			const values = [];
			const [data] = await dbconnection.execute(query, values);
			dbconnection.end();

			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else if (req.method === "POST") {
		try {
			const summer_center = req.body;
			const query =
				"INSERT INTO Summer_Centers (Name, Society, Address, Min_Age_Range, Max_Age_Range, Cost, Start_Day, End_Day, Description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
			const values = [
				summer_center.Name,
				summer_center.Society,
				summer_center.Address,
				summer_center.Min_Age_Range,
				summer_center.Max_Age_Range,
				summer_center.Cost,
				summer_center.Start_Day,
				summer_center.End_Day,
				summer_center.Description,
			];
			const [data] = await dbconnection.execute(query, values);
			dbconnection.end();

			res.status(201).json();
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}
