'use client'

import Link from "next/link";
import {useState} from "react";

export default function Home() {
    const [firstName, setFirstName] = useState(""); 
    return (
        <main className="flex flex-col items-center min-h-screen w-[95vw] mx-8 pt-28 bg-blue-100">
          <div className="w-full max-w-lg shadow-xl bg-white rounded-3xl text-center">
            <Link
                href={`/information-gathering`}
                className="inline-block text-white bg-blue-700 hover:bg-sky-600 active:bg-sky-900 active:translate-y-[0.3vh] transform font-medium rounded-lg text-sm px-50 py-2.5 my-5"
            >
                Next Step
            </Link>
 
          </div>
        </main>


    );
}