// Author: Emily Yang (eyang4@bu.edu)
// Description: The footer.  

import Link from "next/link"; 

export default function Footer(){
    return(
        <>
            <footer className="bg-gray-100 p-2" >
                <p>All Rights Reserved by Emily Yang, Xiaorui Wang, Zhixin Li <Link href="../credits/credits.html"> Credits</Link> &copy;</p>
            </footer>
        </>
    )
}