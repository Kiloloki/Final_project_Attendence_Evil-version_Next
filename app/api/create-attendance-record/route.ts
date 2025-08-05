import { NextResponse } from "next/server";
import { Record } from "@/types/Record";
import getCollection, { POSTS_COLLECTION } from "@/db";

export async function POST(req: Request) {
  console.log("Creating a new attendance record");

  try {
    const body = await req.json();
    const record: Record = {
      firstName: body.firstName,
      lastName: body.lastName,
      buid: body.buid,
      emailAddress: body.emailAddress,
    };

    const postCollection = await getCollection(POSTS_COLLECTION);
    console.log("Collection is:", postCollection);

    const res = await postCollection.insertOne({ ...record });

    return NextResponse.json({ success: true, record });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
