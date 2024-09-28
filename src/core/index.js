import { NextResponse } from "next/server";

module.exports = {
    json: (o, status = 200) => {
        const response = NextResponse.json(o, { status });
        response.headers.set('Content-Type', 'application/json')
        return response;
    }
}
