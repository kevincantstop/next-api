import { json } from "@/core";
import { User } from "@/core/models";

export const GET = async (req, { params }) => {
    const user = await User.findByPk(params.id);
    return json(user);
}

export const DELETE = async (req, { params }) => {
    const user = await User.findByPk(params.id)

    if (user) {
        await User.destroy({ where: { id: user.id } })
        return json({ ok: true })
    }
    return json({ message: `User: ${params.id} not found` }, 404)
}

export const PATCH = async (req, { params }) => {
    const body = await req.json();
    const user = await User.findByPk(params.id)

    if (user) {
        const updated = await User.update({ ...body }, {
            where: { id: user.id }
        })
        return json({ ok: true, affected: updated })
    }
    return json({ message: `User: ${params.id} not found` }, 404)
}
