import { json } from "@/core";
import { Post, User, Category } from "@/core/models";

export const GET = async () => {
    const posts = await Post.findAll();
    return json(posts);
}

export const POST = async (req) => {
    const body = await req.json();
    const associate = {};

    if (body.authorId) {
        const user = await User.findByPk(body.authorId)
        if (user == null) {
            return json({ message: `Author: ${body.authorId} not found.` }, 404);
        }
        associate.user = user;
    }

    if (body.categoryId) {
        const category = await Category.findByPk(body.categoryId)
        if (category == null) {
            return json({ message: `Category: ${body.categoryId} not found.` }, 404);
        }
        associate.category = category;
    }

    const post = await Post.create(body);

    return json(post);
}
