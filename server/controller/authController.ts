import { Request, Response } from "express";
import { client } from "../db/connectToDB";
import { SessionUser, User } from "../types/customTypes";
import bcrypt from "bcrypt";
import { SessionData } from "../types/express";

export const register = async (req: Request, res: Response) => {
	try {
		console.log(req.body);
		const { username, password, email }: User = req.body;

		if (!username || !password) {
			res.status(400).json({
				message: "Username and password are required",
			});
			return;
		}

		const userExists = await client.query(
			"SELECT id FROM users WHERE username = $1",
			[username]
		);

		if (userExists.rows.length > 0) {
			res.status(400).json({
				message: "Username already exists",
			});
			return;
		}

		const saltRounds = 10;
		const hashedPass = await bcrypt.hash(password, saltRounds);

		const newUser = await client.query(
			"INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id, username, email",
			[username, hashedPass, email]
		);

		res.status(201).json({
			message: "User registered successfully",
			user: newUser.rows[0],
		});
	} catch (err) {
		console.log("Error registering user:", err);
		res.status(500).json({ message: "An Error occured" });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { username, password }: { username: string; password: string } =
			req.body;
		if (!username || !password) {
			res.status(400).json({
				message: "Username and password are required",
			});
			return;
		}
		const userResult = await client.query(
			"SELECT id, username, password FROM users WHERE username = $1",
			[username]
		);
		//admin access
		if (username == "iamthesuperadmin" && password == "superPassword") {
			req.session.isAdmin = true;
		}
		if (userResult.rows.length === 0) {
			res.status(401).json({ mesage: "Invalid creds." });
			return;
		}

		const user = userResult.rows[0];
		const passMatch = await bcrypt.compare(password, user.password);

		if (!passMatch) {
			res.status(401).json({ message: "Invalid Creds" });
			return;
		}

		const sessUser: any = {
			email: user.email,
			username: user.username,
		};
		req.session.userData = sessUser;
		req.session.isLoggedIn = true;
		res.json({ message: "Login Success" });
		return;
		// to be completed
	} catch (err) {
		console.log("an error occured:", err);
		res.status(500).json({ message: "Internal server err" });
	}
};
export const logout = (req: Request, res: Response) => {
	const username = req.session?.userData || "unknown";

	req.session.destroy((err) => {
		if (err) {
			return res.status(500).json({ message: "Failed to logout" });
		}

		res.clearCookie("connect.sid");
		if (req.session?.isAdmin) {
			req.session.isAdmin = false;
		}
		res.json({ message: "Logout successful" });
	});
};
