export interface User {
    role: string;
    name: string;
    email: string;
    password: string;
    userId: number;
}

export type UserEmail = Pick<User, "email">;

export interface UserType {
    id: number;
    type: string;
}
