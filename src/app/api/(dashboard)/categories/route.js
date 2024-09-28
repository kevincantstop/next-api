import { json } from "@/core";
import { Category } from "@/core/models";

export const GET = async () => {
    const categories = Category.findAll()
    return json(categories)
}
