// created by ZL(lzhx@bu.edu)
// getIPCheck cannot access environmental variable from the client side;
// getAttendanceIP returns environmental variable to the client side

'use server'

export default async function getAttendanceIP() {
    return process.env.ATTENDANCE_IP;
}