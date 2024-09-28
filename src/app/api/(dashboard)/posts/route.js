import { json } from "@/core";
import { Post } from "@/core/models";

export const GET = async () => {
    const posts = await Post.findAll();
    return json(posts);
}

export const POST = async (req) => {
    const body = await req.json();
    const post = await Post.create(body);

    return json(post);
}
