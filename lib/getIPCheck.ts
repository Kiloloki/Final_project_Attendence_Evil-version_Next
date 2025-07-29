// created by ZL(lzhx@bu.edu)
// returns whether current IP match env IP (boolean | undefined)

'use client'

import getIP from "@/lib/getIP";

export default function getIPCheck() {
    const dataIP = getIP();
    let attendenceIP = process.env.ATTENDENCE_IP;
    if (dataIP) {
        if (dataIP.ip === attendenceIP) {
            return true;
        } else {
            return false;
        }
    } else {
        return undefined;
    }
};