import { useState } from "react";


function Dialogue({ toggle, navigate }: { toggle: () => void, navigate: any }) {

  const handleEnterLogic = (): void => {
    navigate(`/student/interface/${sess_id}`);
  };

  let [sess_id, setSess_id] = useState(0);  

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={toggle}
    >
      <div
        className="relative bg-black box-border border border-white p-6 rounded-3xl shadow-md w-1/3 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={toggle}
          className="absolute top-4 right-4 bg-white text-black font-bold w-8 h-8 flex items-center justify-center text-lg rounded-full shadow hover:bg-red-500"
        >
          ×
        </button>

        <div className="flex flex-col items-center mt-6">
          <label
            htmlFor="session-id"
            className="text-white text-lg font-medium mb-4"
          >
            Enter Session ID
          </label>
          <input
            id="session-id"
            className="rounded-xl border-[#302f2f] border text-white w-full font-medium bg-black p-4 text-base focus:outline-none focus:ring-2 focus:ring-white mb-4"
            type="text"
            placeholder="Session ID"
            onChange={(e) => setSess_id(Number(e.target.value))}
          />

          <button
            onClick={() => handleEnterLogic()} // Replace this with your custom logic
            className="bg-white text-black font-bold py-2 px-6 rounded-xl shadow hover:bg-gray-300 mt-4"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dialogue;
