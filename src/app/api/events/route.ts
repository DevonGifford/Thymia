import type { NextApiRequest } from "next";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    return NextResponse.json({ success:  `${req.body} event logged successfully` }, { status: 200 });
  } catch (error) {
    // Handle errors, if any
    return NextResponse.json({ error: "Something went wrong" }, { status: 405 });
  }
}