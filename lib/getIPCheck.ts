// created by ZL(lzhx@bu.edu)
// returns whether current IP match env IP (boolean | undefined)

"use client";

import getAttendenceIP from "./getAttendanceIP";
import getIP from "./getIPInfo";

export default async function getIPCheck() {
  const dataIP = getIP();
  const attendanceIP = await getAttendenceIP();
  console.log(dataIP?.ip);
  console.log(attendanceIP);
  if (dataIP) {
    return dataIP.ip == attendanceIP;
  } else {
    return undefined;
  }
}
