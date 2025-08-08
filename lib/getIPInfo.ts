// created by ZL(lzhx@bu.edu), returns current IPInfo
// this is not used in the current version
// as the current IPCheck require only ip string but no other info
// yet this is kept in case of further need

'use client'

import { useEffect, useState } from "react";
import { IPInfo } from "@/interfaces/IPInfo";

export default function getIPInfo() {
    const [currentIPInfo, setCurrentIPInfo] = useState<IPInfo>();

    useEffect(() => {
        async function fetchIP(): Promise<void> {
            // fetch User's current IP from IPify
            // fetch User's current IP from IPify
            const responseIP = await fetch("https://api.ipify.org/?format=json");
            const { ip } = await responseIP.json();
            // fetch the IP's information from IPInfo
            const ipInfoUrl = `https://ipinfo.io/${ip}/geo`
            const responseInfo = await fetch(ipInfoUrl);
            const ipInfo = await responseInfo.json();
            setCurrentIPInfo(ipInfo)
        }

        fetchIP()
            .then(() => console.log("Fetched IP info Successfully."))
            .catch(err => console.log(err));
    }, []);

    return currentIPInfo;
}