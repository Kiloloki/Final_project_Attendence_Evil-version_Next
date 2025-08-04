// // created by ZL(lzhx@bu.edu), to check if ip is fetched and is correct

'use client'

import Link from "next/link";
import { useInformation } from "@/context/InformationContext";
import { useEffect, useState } from "react";
import getAttendanceIP from "@/lib/getAttendanceIP";

export default function IPCheck() {
    const [matchIP, setMatchIP] = useState<boolean | undefined>(undefined);
    const { setContext } = useInformation();

    useEffect(() => {
        async function fetchIPMatch() {
            try {// fetch User's current IP from IPify
                const responseIP = await fetch("https://api.ipify.org/?format=json");
                const { ip } = await responseIP.json();
                const dataIP = ip;
                const attendanceIP = await getAttendanceIP();

                console.log("Current IP:", dataIP);
                console.log("Attendance IP:", attendanceIP);

                if (!dataIP || !attendanceIP) {
                    setMatchIP(undefined);
                    return;
                }

                const isMatch = dataIP === attendanceIP;
                setMatchIP(isMatch);

                if (isMatch) {
                    setContext({
                        atCorrectIP: true,
                        firstName: "",
                        lastName: "",
                        buid: "",
                        emailAddress: "",
                    });
                }
            } catch (error) {
                console.error("IP match error:", error);
                setMatchIP(undefined);
            }
        }

        fetchIPMatch();
    }, [setContext]);

    // Conditional rendering:
    if (matchIP === undefined) {
        return (
            <div className="w-full max-w-lg shadow-xl bg-white rounded-3xl text-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold p-2">
                        Unable to Retrieve Your IP
                    </h2>
                    <p className="text-neutral-500">
                        Please try again later or contact your Professor if this keeps occurring.
                    </p>
                </div>
                <Link
                    href="/"
                    className="inline-block text-white bg-blue-700 hover:bg-sky-600 active:bg-sky-900 active:translate-y-[0.3vh] transform font-medium rounded-lg text-sm px-50 py-2.5 my-5"
                >
                    Refresh Page
                </Link>
            </div>
        );
    }

    if (!matchIP) {
        return (
            <div className="w-full max-w-lg shadow-xl bg-white rounded-3xl text-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold p-2">
                        IP Not Matched
                    </h2>
                    <p className="text-neutral-500">
                        Please try again when you're at the classroom.
                    </p>
                </div>
                <Link
                    href="/"
                    className="inline-block text-white bg-blue-700 hover:bg-sky-600 active:bg-sky-900 active:translate-y-[0.3vh] transform font-medium rounded-lg text-sm px-50 py-2.5 my-5"
                >
                    Refresh Page
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-lg shadow-xl bg-white rounded-3xl text-center">
            <div className="text-center">
                <h2 className="text-3xl font-bold p-2">
                    IP Check Completed
                </h2>
                <p className="text-neutral-500">
                    You are at the classroom, proceed to enter your information.
                </p>
            </div>
            <Link
                href="/information-gathering"
                className="inline-block text-white bg-blue-700 hover:bg-sky-600 active:bg-sky-900 active:translate-y-[0.3vh] transform font-medium rounded-lg text-sm px-50 py-2.5 my-5"
            >
                Next Step
            </Link>
        </div>
    );
}