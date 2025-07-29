//last updated by ZL(lzhx@bu.edu), added 'use client'

'use client'

import Link from "next/link";

export default function Camera() {

    return (
        <main className="flex flex-col items-center min-h-screen w-[95vw] mx-8 pt-28 bg-blue-100">
          <div className="w-full max-w-lg shadow-xl bg-white rounded-3xl ">
            <div className="text-center">
                    <h2 className="text-3xl font-bold p-2">Camera</h2>
                    <p className="text-neutral-500">
                        {/* DON'T FORGET TO ADD SOME DESCRIPTIONS HERE */}
                    </p>
            </div>

            <div>

                
              <div className="text-center">
                <Link
                    href={`/attendance-recorded-confirmation`}
                    className="inline-block text-white bg-blue-700 hover:bg-sky-600 active:bg-sky-900 active:translate-y-[0.3vh] transform font-medium rounded-lg text-sm px-50 py-2.5 my-5"
                >
                    Next Step
                </Link> 
                <Link
                    href={`/camera-usage-consent-form`}
                    className="inline-block text-white bg-blue-700 hover:bg-sky-600 active:bg-sky-900 active:translate-y-[0.3vh] transform font-medium rounded-lg text-sm px-50 py-2.5 my-5"
                >
                    Go Back
                </Link>
              </div>
            </div>
          </div>
        </main>


    );
}