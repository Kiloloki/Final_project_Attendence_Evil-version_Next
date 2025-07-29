// last updated by ZL(lzhx@bu.edu), called IPCheck component

'use client'

import IPCheck from "@/components/IPCheck";

export default function Home() {

    return (
        <main className="flex flex-col items-center min-h-screen w-[95vw] mx-8 pt-28 bg-blue-100">
          <IPCheck/>
        </main>


    );
}