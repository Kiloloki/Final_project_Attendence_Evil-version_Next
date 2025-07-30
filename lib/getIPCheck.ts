// created by ZL(lzhx@bu.edu)
// returns whether current IP match env IP (boolean | undefined)

'use client'

import getIP from "@/lib/getIP";

export default function getIPCheck() {
    const dataIP = getIP();
    const attendanceIP = process.env.ATTENDANCE_IP;
    console.log(dataIP?.ip);
    console.log(attendanceIP);
    if (dataIP) {
        return (dataIP.ip == attendanceIP);
    } else {
        return undefined;
    }
};