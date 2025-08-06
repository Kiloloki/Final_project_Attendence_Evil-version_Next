// Author: Emily Yang (eyang4@bu.edu)
// Description: The page that informs student that their attendance has been recordeed. 

export default function AttendanceRecordedConfirmation() {

    return (
        <main className="flex flex-col items-center min-h-screen w-[95vw] mx-8 pt-28 bg-blue-100">
            <main className="flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-6xl shadow-xl bg-white p-4 rounded-2xl">
                    <header className="text-center">
                        <h2 className="text-3xl font-bold">Your Attendance Has Been Recorded!!!</h2>                         
                    </header>
                </div>
            </main>
        </main>


    );
}