import { json } from "@/core";
import { Post } from "@/core/models";

export const GET = async (req, { params }) => {
    const post = await Post.findOne({
        where: { slug: params.slug }
    });
    return json(post);
}
