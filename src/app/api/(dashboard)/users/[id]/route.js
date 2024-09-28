import { json } from "@/core";
import { User } from "@/core/models";

export const GET = async (req, { params }) => {
    const user = await User.findByPk(params.id);
    return json(user);
}
