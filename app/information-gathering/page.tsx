// Author: Emily Yang (eyang4@bu.edu), Xiaorui Wang (bella918@bu.edu)
// Description: The page that gathers student's information. 

'use client'

import Link from "next/link";
import {useState} from "react";
import { redirect } from 'next/navigation'; 

import {useInformation} from "@/context/InformationContext"; 

// ===== Created by Xiaorui Wang =====
// Check if input BUID is valid (contains eight digits)
const validBUID = (id: string) => /^[0-9]{8}$/.test(id);
// Check if input BUEmailAdress is valid 
const validBUEmailAddress = (user: string) => /^[a-zA-Z0-9._%+-]+$/.test(user);
// ===== Created by Xiaorui Wang =====

export default function InformationGathering() {
    const { context, setContext } = useInformation(); 

    // if the dtudent doesnt pass the IP check, then remind them to go back and check IP 
    if (!context.atCorrectIP) {
        return (
            <main className="flex flex-col items-center min-h-screen w-[95vw] mx-8 pt-28 bg-blue-100">
                <div className="w-full max-w-lg shadow-xl bg-white rounded-3xl ">
                    <div className="text-center">
                            <h2 className="text-3xl font-bold p-2">ID Information Gathering</h2>
                            <p className="text-neutral-500">
                                Please first verify your IP address.  
                            </p>  
                            <Link
                                href={`/`}
                                className="inline-block text-white bg-blue-700 hover:bg-sky-600 active:bg-sky-900 active:translate-y-[0.3vh] transform font-medium rounded-lg text-sm px-50 py-2.5 my-5"
                            >
                                Go Back
                            </Link>

                    </div>
                </div>
            </main>

        )

    }

    const [firstName, setFirstName] = useState(context.firstName); 
    const [lastName, setLastName] = useState(context.lastName); 
    const [buid, setBuid] = useState(context.buid.replace(/^U/i, ""));
    const [emailAddress, setEmailAddress] = useState(context.emailAddress.replace(/@bu\.edu$/, ""));

    function storeInfo() { 
        // updates the global context (InformationContext) based on recieved informations  
        setContext({
            atCorrectIP: context.atCorrectIP, 
            firstName,
            lastName,
            buid: `U${buid}`,
            emailAddress: `${emailAddress}@bu.edu`,
        }); 
        console.log("storinggggggggggggggggg"); 
        console.log({
            atCorrectIP: context.atCorrectIP, 
            firstName,
            lastName,
            buid: `U${buid}`,
            emailAddress: `${emailAddress}@bu.edu`,
        })

        // proceed to the camera-usage-consent-form page  
        redirect(`/camera-usage-consent-form`); 
    }


    // ===== Created by Xiaorui Wang =====
    const isValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    validBUID(buid) &&
    validBUEmailAddress(emailAddress); 

    // show "invalid input" message based on inputs 
    let errorMsg = "";
    if (buid !== "" && !validBUID(buid)) {
        errorMsg = "BUID must be exactly 8 digits (numbers only).";
    } else if (emailAddress !== "" && !validBUEmailAddress(emailAddress)) {
        errorMsg = "Only use numbers, letters or ._%+- for BU email username.";
    } else if (!isValid) {
        errorMsg =
        "All fields are required to be filled in before proceeding to next step.";
    } 
    // ===== Created by Xiaorui Wang ===== 


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

                <div className="relative flex items-center">
                    <span className="px-3 py-2 border-2 border-r-0 rounded-l-lg bg-gray-100 text-lg font-mono select-none">
                        U
                    </span>
                    <input
                        id="buid"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={8}
                        placeholder="please input your BUID"
                        value={buid}
                        className="border-2 border-l-0 w-full p-2 rounded-r-lg"
                        onChange={(e) => {
                        // ===== Created by Xiaorui Wang ===== 
                        // only allow numbers 
                        const value = e.target.value.replace(/\D/g, "");
                        // ===== Created by Xiaorui Wang ===== 
                        setBuid(value);
                        }}
                    />
                </div> 

                {/* Collect Email Address */} 
                <label htmlFor="emailAddress" className="font-semibold">
                    BU Email Address
                </label>
                <div className="relative flex items-center">
                    <input
                        id="emailAddress"
                        type="text"
                        placeholder="Please input your BU email"
                        value={emailAddress}
                        className="border-2 w-full p-2 rounded-l-lg"
                        onChange={(e) => setEmailAddress(e.target.value)}
                    />
                    <span className="px-3 py-2 border-2 border-l-0 rounded-r-lg bg-gray-100 text-lg font-mono select-none">
                        @bu.edu
                    </span>
                </div>
              </div>
            
              <div className="text-center"> 
                {/* Allow student to proceed to next only when all fields are filled in; otherwise show prompt message */}
                {firstName !== "" && lastName !== "" && buid !== "" && emailAddress !== ""? (

                    <button
                        onClick={storeInfo}
                        className="inline-block text-white bg-blue-700 hover:bg-sky-600 active:bg-sky-900 active:translate-y-[0.3vh] transform font-medium rounded-lg text-sm px-50 py-2.5 my-5"
                    >
                        Next Step
                    </button>

                    
                    ) : <p><b>All fields are required to be filled in before proceeding to next step</b></p>
                } 

                <Link
                    href={`/`}
                    className="inline-block text-white bg-blue-700 hover:bg-sky-600 active:bg-sky-900 active:translate-y-[0.3vh] transform font-medium rounded-lg text-sm px-50 py-2.5 my-5"
                >
                    Go Back
                </Link>
              </div>
              <br/>
            </div>
          </div>
        </main>


    );
}