function LecturerHome() {

    const addIcon = (<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>)

    return (
        <div className="text-lg flex flex-col items-center justify-center gap-6 h-screen w-screen">

            <button className="w-1/6 h-24 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Past Quizzes
            </button>

            <button className="gap-4 flex flex-row items-center justify-center w-1/6 h-24 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            {addIcon} Create New Quiz
            </button>
            
        </div>
    );
}
export default LecturerHome;