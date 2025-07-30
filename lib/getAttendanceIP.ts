'use server'

export default async function getAttendenceIP() {
    return process.env.ATTENDANCE_IP;
}