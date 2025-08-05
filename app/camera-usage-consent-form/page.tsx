import Link from "next/link";

export default function CameraUsageConsentForm() {

    return (
        <main className="flex flex-col items-center min-h-screen w-[95vw] mx-8 pt-28 bg-blue-100">
            <main className="flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-6xl shadow-xl bg-white p-4 rounded-2xl">
                    <header className="text-center">
                        <h2 className="text-3xl font-bold">Camera Usage Consent Form</h2>
                        <p className="text-neutral-500">
                            This page explains how and why we use your camera and collect your information.
                        </p>
                        <div className="w-9"/>
                        {/* Spacer for alignment */}
                        
                    </header>

                <div>
                <div className="py-3 px-7 space-y-5"> 

                    <h3 className="mb-4 text-xl font-semibold">Purpose of Camera Usage</h3>
                    <p> 
                        We ask to access your camera <b>only</b> to capture your image for the purpose of <b>recording class attendance</b>. 
                        Your image will be processed using facial recognition techniques to match against previously submitted information. 
                    </p>

                    <h3 className="mb-4 text-xl font-semibold">Where and How We Store Your Data</h3>
                    <ul>
                        <li>
                            <p> 
                                Your photo data will be <b>converted into a non-reversible vector (face embedding)</b> for matching, but the photo itself will <b>not</b> be stored anywhere
                            </p>
                        </li>

                        <li>
                            <p> 
                                All data is transmitted over <b>encrypted HTTPS</b>
                            </p>
                        </li>

                        <li>
                            <p> 
                                Access is strictly limited to authorized staffs only
                            </p>
                        </li> 
                    </ul>

                    <h3 className="mb-4 text-xl font-semibold">Your Rights</h3>
                    <ul>
                        <li>
                            <p> 
                                View the data we've collected about you 
                            </p>
                        </li>

                        <li>
                            <p> 
                                Request corrections
                            </p>
                        </li> 

                        <li>
                            <p> 
                                <b>Withdraw your consent and request deletion</b> at any time
                            </p>
                        </li> 
                    </ul>

                    <h3 className="mb-4 text-xl font-semibold">Consent Required</h3> 
                    <p>Before proceeding, you must provide <b>explicit consen</b> by clicking the "I agree to the use of my camera and the storage of my face data for attendance purposes." button below. This confirms that:</p>
                    <ul>
                        <li>
                            <p> 
                                You understand how your data will be used
                            </p>
                        </li>

                        <li>
                            <p> 
                                You agree to the collection and use of your camera data as described
                            </p>
                        </li> 

                        <li>
                            <p> 
                                You may contact us with questions or to withdraw consent
                            </p>
                        </li> 
                    </ul>

                    <h3 className="mb-4 text-xl font-semibold">Camera access is optional</h3> 
                    <b>
                        If you do not wish to grant access, please contact the course instructor to discuss alternative attendance arrangements 
                    </b>
                    
                </div>

                <div className="text-center">
                    <Link
                        href={`/camera`}
                        className="inline-block text-white bg-blue-700 hover:bg-sky-600 active:bg-sky-900 active:translate-y-[0.3vh] transform font-medium rounded-lg text-sm px-50 py-2.5 my-5"
                    >
                        I agree to the use of my camera and the storage of my face data for attendance purposes.
                    </Link>

                    <Link
                    href={`/information-gathering`}
                    className="inline-block text-white bg-blue-700 hover:bg-sky-600 active:bg-sky-900 active:translate-y-[0.3vh] transform font-medium rounded-lg text-sm px-50 py-2.5 my-5"
                    >
                        Go Back
                    </Link>
                </div>
                </div>
            </div>
            </main>
        </main>


    );
}