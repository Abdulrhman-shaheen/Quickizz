import { fetchingData } from "../utils/fetchingData";

function StudentHome() {
    let login_data = fetchingData(`${import.meta.env.VITE_BACKEND_URL}/login`);
    return (
        <div>
            <header className="border-b-2 text-black text-2xl p-6">
        <div className="flex flex-row justify-between items-center">
          {login_data.map((user) => (
          <h1
            className="text-white before:content-attr-letters before:inline-block before:w-10 before:h-10 before:text-center before:bg-white before:text-black before:leading-10 before:rounded-full before:align-middle before:text-base before:mr-4"
            data-letters={user.firstname.charAt(0) + user.lastname.charAt(0)}
          >
            {user.firstname} {" "} {user.lastname}
          </h1>
          ))}
          <button className="bg-white text-xl flex justify-center font-semibold shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 text-black py-1 px-2 rounded-lg">
            Sign out
          </button>
        </div>
      </header>
      <div className="flex flex-wrap m-12 gap-10">
          <div className="border min-w-96 h-96"></div>
          <div className="border min-w-96 h-96"></div>
          <div className="border min-w-96 h-96"></div>
      </div>
        </div>
    );
}

export default StudentHome;
