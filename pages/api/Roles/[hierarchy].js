import mysql from "mysql2/promise";
import dbconn from "../../../dbconnection"

export default async function getAllUsers(req, res) {
    const dbconnection = await mysql.createConnection(dbconn);

    try {
        const query = `SELECT * FROM Roles WHERE Hierarchy = ?`;
        const values = [req.query.hierarchy];
        const [data] = await dbconnection.execute(query, values);
        dbconnection.end();

        res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Credentials", "true");
		res.setHeader("Access-Control-Max-Age", "1800");
		res.setHeader("Access-Control-Allow-Headers", "content-type");
		res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }

}