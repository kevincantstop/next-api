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

export const PATCH = async (req) => {
    const body = await req.json();
    const user = await User.findByPk(body.id)

    if (user) {
        delete body.id;

        const updated = await User.update({ ...body }, {
            where: { id: user.id }
        })
        return json({ ok: true, affected: updated })
    }
    return json({ message: `User: ${body.id} not found` }, 404)
}

export const DELETE = async (req) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id")

    const user = await User.findByPk(id)

    if (user) {
        await User.destroy({ where: { id: user.id } })
        return json({ ok: true })
    }
    return json({ message: `User: ${id} not found` }, 404)
}
