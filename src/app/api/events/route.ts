import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextResponse) {
  try {
    return NextResponse.json({ success:  `${req.body.eventName} event logged successfully` }, { status: 200 });
  } catch (error) {
    // Handle errors, if any
    return NextResponse.json({ error: "Something went wrong" }, { status: 405 });
  }
}