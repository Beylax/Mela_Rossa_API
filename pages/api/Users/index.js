import mysql from "mysql2/promise";
import dbconn from "../../../dbconnection";

export default async function getAllUsers(req, res) {
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
			const query = "SELECT * FROM Users";
			const values = [];
			const [data] = await dbconnection.execute(query, values);
			dbconnection.end();

			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else if (req.method === "POST") {
		try {
			const user = req.body;
			const query =
				"INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
			const values = [
				user.Username,
				user.Email,
				user.Pwd,
				user.Surname,
				user.Firstname,
				user.Lastname,
				user.Telephone,
				user.Description,
				user.Role,
			];
			const [data] = await dbconnection.execute(query, values);
			dbconnection.end();

			res.status(201).json();
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}
