// created by ZL(lzhx@bu.edu)
// returns whether current IP match env IP (boolean | undefined)

'use client'

import getAttendenceIP from "@/lib/getAttendanceIP";
import getIP from "@/lib/getIP";

export default async function getIPCheck() {
    const dataIP = getIP();
    const attendanceIP = await getAttendenceIP();
    if (dataIP) {
        return (dataIP == attendanceIP);
    } else {
        return undefined;
    }
};