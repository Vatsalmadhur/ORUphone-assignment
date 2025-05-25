import {Client, QueryResult, QueryResultRow} from "pg";
 const client = new Client({
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASS,
	host: "localhost",
	port: 5432,
	database: "oru_user_tracking",
});

 async function connectToDB() {
	try {
		await client.connect();
		console.log("Connected to PostgreSQL database");
	} catch (error) {
		console.error("Error connecting to PostgreSQL database", error);
	}
}

async function disconnectFromDB() {
  try {
    await client.end();
    console.log("Disconnected from PostgreSQL database");
  } catch (error) {
    console.error("Error disconnecting from PostgreSQL database", error);
    throw error;
  }
}

async function queryDB <T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}

export { client,connectToDB, disconnectFromDB, queryDB };
