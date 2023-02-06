import { client } from "../util/db";
import { User } from "../util/model";

export async function getUserById(userId: number) {
    let result = await client.query(`select * from users where id = $1 `, [userId]);
    let user = result.rows[0];
    if (!user) {
        throw new Error(`User not found`);
    }

    return user;
}

export async function getUserByEmail(email: string) {
    let result = await client.query<User>(`select * from users where email = $1 `, [email]);
    let user = result.rows[0];
    if (!user) {
        throw new Error(`User not found`);
    }

    return user;
}
