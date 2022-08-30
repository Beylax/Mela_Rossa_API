import mysql from "mysql2/promise";

export default async function getAllUsers(req, res) {
    const dbconnection = await mysql.createConnection({
        host: "sql11.freesqldatabase.com",
        database: "sql11513563",
        port: 3306,
        user: "sql11513563",
        password: "eTPq74SdEt"
    });

    try {
        const query = "SELECT * FROM Users";
        const values = [];
        const [data] = await dbconnection.execute(query, values);
        dbconnection.end();

        res.status(200).json({ results: data });
    } catch (error) {
        res.status(500).json({ error: error.message});
    }

}