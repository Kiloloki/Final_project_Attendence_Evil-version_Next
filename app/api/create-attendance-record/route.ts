// Author: Emily Yang (eyang4@bu.edu)
// Description: The api that updates or create an attendance record.

import { NextResponse } from "next/server";
import { Record } from "@/types/Record";
import getCollection, { POSTS_COLLECTION } from "@/db";

// POST Route Handler. Resource: https://www.wisp.blog/blog/nextjs-14-app-router-get-and-post-examples-with-typescript
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
      // resource: https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndUpdate/
      const updated = await postCollection.findOneAndUpdate(
        { buid: record.buid },
        { $inc: { totalAttendance: 1 } },
        { returnDocument: "after" } // returns the updated document.
      );

      console.log("Just Updated the Record: " + updated);

      // Produce a response
      // resource: https://nextjs.org/docs/app/api-reference/functions/next-response#json
      return NextResponse.json({ success: true, record: updated });
    } else {
      // if there is no previous record about this student, then create a new attendance record
      const res = await postCollection.insertOne(record);
      console.log("Just Inserted a New Record: ");

      // Produce a response
      // resource: https://nextjs.org/docs/app/api-reference/functions/next-response#json
      return NextResponse.json({ success: true, record });
    }
  } catch (err) {
    console.error("Error:", err);

    // Produce a response
    // resource: https://nextjs.org/docs/app/api-reference/functions/next-response#json
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
