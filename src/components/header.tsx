import { User } from "../types/user";
const Header = ({user, navigate} : {user :User | null, navigate : any} ) => {
  return (
    <header className="border-b-2 text-black text-2xl p-6">
      <div className="flex flex-row justify-between items-center">
        <h1
          className="text-white before:content-attr-letters before:inline-block before:w-10 before:h-10 before:text-center before:bg-white before:text-black before:leading-10 before:rounded-full before:align-middle before:text-base before:mr-4"
          data-letters={
            user ? user.firstname.charAt(0) + user.lastname.charAt(0) : ""
          }
        >
          {user ? `${user.firstname} ${user.lastname}` : ""}
        </h1>

        <button
          onClick={() => {
            document.cookie =
              "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              navigate("/");
          }}
          className="bg-white text-xl flex justify-center font-semibold shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 text-black py-1 px-2 rounded-lg"
        >
          Sign out
        </button>
      </div>
    </header>
  );
};

export default Header;
