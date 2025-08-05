// import { NextResponse } from "next/server";
// import { Record } from "@/types/Record";
// import getCollection, { POSTS_COLLECTION } from "@/db";

// export default async function POST(req: Request) {
//   console.log("Creating a new attendance record");

//   try {
//     const body = await req.json();
//     const record: Record = {
//       firstName: body.firstName,
//       lastName: body.lastName,
//       buid: body.buid,
//       emailAddress: body.emailAddress,
//     };

//     const postCollection = await getCollection(POSTS_COLLECTION);
//     const res = postCollection.insertOne({ ...record });

//     if (!res) {
//       return NextResponse.json(
//         { success: false, message: "DB insert failed" },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ success: true, record });
//   } catch (err) {
//     console.error("Error:", err);
//     return NextResponse.json(
//       { success: false, message: "Server Error" },
//       { status: 500 }
//     );
//   }
// }

"use server";

import { Record } from "@/types/Record";
import getCollection, { POSTS_COLLECTION } from "@/db";

import { useInformation } from "@/context/InformationContext";
const { context, setContext } = useInformation();

export default async function createNewAttendanceRecord(
  title: string,
  content: string
): Promise<Record> {
  console.log("Creating a new attendance record");

  const record = {
    firstName: context.firstName,
    lastName: context.lastName,
    buid: context.buid,
    emailAddress: context.emailAddress,
  };

  const postCollection = await getCollection(POSTS_COLLECTION);
  const res = postCollection.insertOne({ ...context });

  if (!res) {
    throw new Error("DB insert failed");
  }

  return context;
}
