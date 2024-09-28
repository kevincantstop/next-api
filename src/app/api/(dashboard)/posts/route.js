import { json } from "@/core";
import { Post, User, Category } from "@/core/models";

export const GET = async () => {
    const posts = await Post.findAll();
    return json(posts);
}

export const POST = async (req) => {
    const { categories, data } = await req.json();

    if (!data.authorId) {
        return json({ message: `AuthorId is empty`, ok: false })
    }
    if (!categories || categories.length === 0) {
        return json({ message: `Categories not assigned`, ok: false })
    }

    const user = await User.findByPk(data.authorId);
    if (user == null) {
        return json({ message: `Author: ${data.authorId} not found.` }, 404);
    }

    let cats = await Promise.all(categories.map(Category.findByPk));
    cats = cats.filter(c => c);
    if (cats.length === 0) {
        return json({ message: `No categories found` }, 404);
    }

    const post = await Post.create(data);
    await Promise.all(cats.map(post.setCategory))

    return json(post);
}
