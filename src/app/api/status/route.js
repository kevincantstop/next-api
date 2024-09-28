import { json } from "@/core";
import { sync } from "@/core/models";

export const GET = async () => {
    try {
        await sync();
        return json({ ok: true });
    } catch (error) {
        return json({ ok: false, message: error })
    }
}
