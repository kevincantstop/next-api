import { json } from "@/core";
import { Category } from "@/core/models";

export const GET = async () => {
    const categories = await Category.findAll();
    return json(categories);
}

export const POST = async (req) => {
    const body = await req.json();

    const categoryBySlug = await Category.findOne({ where: { slug: body.slug } });
    if (categoryBySlug) {
        return json({ message: `Category has the same slug not allowed` }, 401);
    }

    const category = await Category.create(body);
    return json(category);
}
