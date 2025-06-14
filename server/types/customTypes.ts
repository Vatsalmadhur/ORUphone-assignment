export interface User {
	id: number;
	username: string;
	password: string;
	email?: string;
	created_at?: Date;
}

export interface SessionUser {
	email: string;
	username: string;
}
