import { json } from "@/core";
import { Category } from "@/core/models";

export const GET = async (req, { params }) => {
    const user = await Category.findByPk(params.id);
    return json(user);
}

export const PATCH = async (req, { params }) => {
    const body = await req.json();
    const category = await Category.findByPk(params.id)

    if (category) {
        const updated = await Category.update({ ...body }, {
            where: { id: category.id }
        })
        return json({ ok: true, affected: updated })
    }
    return json({ message: `Category: ${params.id} not found` }, 404)
}
