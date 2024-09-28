import { json } from "@/core";
import { Category } from "@/core/models";

export const GET = async () => {
    const categories = await Category.findAll()
    return json(categories)
}

export const POST = async (req) => {
    const body = await req.json();
    const category = await Category.create(body)
    return json(category)
}
