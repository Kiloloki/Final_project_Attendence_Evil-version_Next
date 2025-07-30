// created by ZL(lzhx@bu.edu), returns current IP

'use client'

import { useEffect, useState } from "react";

export default function getIP() {
    const [currentIP, setCurrentIP] = useState("");

    useEffect(() => {
        async function fetchIP(): Promise<void> {
            // fetch User's current IP from IPify
            const responseIP = await fetch("https://api.ipify.org/?format=json");
            const { ip } = await responseIP.json();
            setCurrentIP(ip)
        }

        fetchIP()
            .then(() => console.log("Fetched IP Successfully."))
            .catch(err => console.log(err));
    }, []);
    return currentIP;
}