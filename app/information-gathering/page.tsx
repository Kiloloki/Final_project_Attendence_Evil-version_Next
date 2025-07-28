'use client'

import Link from "next/link";
import {useState} from "react";

export default function InformationGathering() {
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState(""); 
    const [buid, setBuid] = useState(""); 
    const [emailAddress, setEmailAddress] = useState(""); 

    function storeInformation(){





    }


    return (
        <main className="flex flex-col items-center min-h-screen w-[95vw] mx-8 pt-28 bg-blue-100">
          <div className="w-full max-w-lg shadow-xl bg-white rounded-3xl ">
            <div className="text-center">
                    <h2 className="text-3xl font-bold p-2">ID Information Gathering</h2>
                    <p className="text-neutral-500">
                        Please fill in the following fields
                    </p>
            </div>

            <div>
              <div className="py-3 px-7 space-y-5"> 

                {/* Collect First Name */}
                <label htmlFor="firstName" className="font-semibold">
                    First Name
                </label>
                <div className="relative">
                <input
                    id="firstName"
                    placeholder="please input your first name"
                    value={firstName}
                    className="border-2 w-full p-2 rounded-lg"
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                />
                </div> 

                {/* Collect Last Name */} 
                <label htmlFor="lastName" className="font-semibold">
                    Last Name
                </label>
                <div className="relative">
                <input
                    id="lastName"
                    placeholder="please input your last name"
                    value={lastName}
                    className="border-2 w-full p-2 rounded-lg"
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                />
                </div> 

                {/* Collect BUID */} 
                <label htmlFor="buid" className="font-semibold">
                    BUID
                </label>
                <div className="relative">
                <input
                    id="buid"
                    placeholder="please input your BUID number"
                    value={lastName}
                    className="border-2 w-full p-2 rounded-lg"
                    onChange={(e) => {
                        setBuid(e.target.value);
                    }}
                />
                </div> 

                {/* Collect Email Address */} 
                <label htmlFor="emailAddress" className="font-semibold">
                    Email Address
                </label>
                <div className="relative">
                <input
                    id="emailAddress"
                    placeholder="please input your email address"
                    value={lastName}
                    className="border-2 w-full p-2 rounded-lg"
                    onChange={(e) => {
                        setEmailAddress(e.target.value);
                    }}
                />
                </div>
              </div>

              <div className="text-center">
                <button
                    onClick={storeInformation}
                    className="inline-block text-white bg-blue-700 hover:bg-sky-600 active:bg-sky-900 active:translate-y-[0.3vh] transform font-medium rounded-lg text-sm px-50 py-2.5 my-5"
                >
                    Next Step
                </button>
              </div>
            </div>
          </div>
        </main>


    );
}