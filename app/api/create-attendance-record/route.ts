import { NextResponse } from "next/server";
import { Record } from "@/types/Record";
import getCollection, { POSTS_COLLECTION } from "@/db";

export async function POST(req: Request) {
  console.log("Creating or updating an attendance record");

  try {
    const body = await req.json();
    const record: Record = {
      firstName: body.firstName,
      lastName: body.lastName,
      buid: body.buid,
      emailAddress: body.emailAddress,
      totalAttendance: 1,
    };

    const postCollection = await getCollection(POSTS_COLLECTION);
    const previousRecord = await postCollection
      .find({ buid: record.buid })
      .toArray();
    console.log("PREVIOUE RECORD: " + previousRecord);

    if (previousRecord.length > 0) {
      // if there is previous record about this student, then increment its totalAttendance by 1
      // source: https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndUpdate/
      const updated = await postCollection.findOneAndUpdate(
        { buid: record.buid },
        { $inc: { totalAttendance: 1 } },
        { returnDocument: "after" } // returns the updated document.
      );

      console.log("Just Updated the Record: " + updated);

      return NextResponse.json({ success: true, record: updated });
    } else {
      const res = await postCollection.insertOne(record);
      console.log("Just Inserted a New Record: ");

      return NextResponse.json({ success: true, record });
    }
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
