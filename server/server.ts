import express from "express";
import sessions from "express-session";
import Redis from "ioredis";
import RedisStore from "connect-redis";
import cors from "cors";
import dotenv from "dotenv";
import { sessionTracker } from "./middlewares/sessionTracker";
import trackRoutes from "./routes/sessionTrackRoutes";
import { connectToDB } from "./db/connectToDB";
import typeORMConnect from "./db/typeorm";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
const redisClient = new Redis(
	{
		host:process.env.REDIS_URL,
		port:19635,
		username: 'default',
    password: process.env.REDIS_PASSWORD,
	}
);
const redisStore = new RedisStore({client:redisClient});
app.use(
	sessions({
		store: redisStore,
		secret: "this is s secret",
		resave: false,
		saveUninitialized: true,
		cookie: { httpOnly:true,sameSite:'lax', maxAge: 1000 * 60 * 60 * 24 },
	})
);
typeORMConnect()

app.use(sessionTracker);

app.use("/", trackRoutes);
connectToDB();
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
