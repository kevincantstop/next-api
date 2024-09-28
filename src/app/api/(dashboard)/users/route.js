import { json } from "@/core";
import { User } from "@/core/models";

export const GET = async () => {
    const users = await User.findAll();
    return json(users);
}

export const POST = async (req) => {
    const body = await req.json();
    const user = await User.create(body);

    return json(user);
}
