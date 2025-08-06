// Author: Emily Yang (eyang4@bu.edu), ZL(lzhx@bu.edu)
// Description: The home page. 
'use client'

import IPCheck from "@/components/IPCheck";

export default function Home() {

    return (
        <main className="flex flex-col items-center min-h-screen w-[95vw] mx-8 pt-28 bg-blue-100">
          {/* ===== Created by ZL ===== */}
          <IPCheck/>
          {/* ===== Created by ZL ===== */}
        </main>

    );
}