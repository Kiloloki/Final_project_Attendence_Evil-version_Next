// created by ZL(lzhx@bu.edu), to check if ip is fetched and is correct

'use client'

import Link from "next/link";
import getIPCheck from "@/lib/getIPCheck";

export default function IPCheck() {
    const matchIP = getIPCheck();
    // returns whether current IP match env IP (boolean | undefined)
    console.log(matchIP);

    if (matchIP === undefined) { // undefined => IP not fetched
        return (
            <div className="w-full max-w-lg shadow-xl bg-white rounded-3xl text-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold p-2">
                        Unable to Retrieve Your IP
                    </h2>
                    <p className="text-neutral-500">
                        Please try again later or contact your Professor if this keeps occuring.
                    </p>
                </div>
                <Link
                    href={`/`}
                    className="inline-block text-white bg-blue-700 hover:bg-sky-600 active:bg-sky-900 active:translate-y-[0.3vh] transform font-medium rounded-lg text-sm px-50 py-2.5 my-5"
                >
                    Refresh Page
                </Link>
            </div>
        );
    } else if (!matchIP) { // False => IP isn't matched
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
                    href={`/`}
                    className="inline-block text-white bg-blue-700 hover:bg-sky-600 active:bg-sky-900 active:translate-y-[0.3vh] transform font-medium rounded-lg text-sm px-50 py-2.5 my-5"
                >
                    Refresh Page
                </Link>
            </div>
        )

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
                href={`/information-gathering`}
                className="inline-block text-white bg-blue-700 hover:bg-sky-600 active:bg-sky-900 active:translate-y-[0.3vh] transform font-medium rounded-lg text-sm px-50 py-2.5 my-5"
            >
                Next Step
            </Link>
        </div>
    );
}