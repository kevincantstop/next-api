import { json } from "@/core";
import { Category } from "@/core/models";

export const GET = async (req, { params }) => {
    const category = await Category.findOne({
        where: { slug: params.slug }
    });
    return json(category);
}
