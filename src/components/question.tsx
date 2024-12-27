import { useState } from "react";
import { submitChoice } from "../utils/submitchoice";
import { fetchingData } from "../utils/fetchingData";

function Question({
  question,
  setScore,
}: {
  question: { [key: string]: string };
  setScore: (flag:boolean) => void;
}) {
  let [submited, setSubmited] = useState(false);
  let [selected, setSelected] = useState<string>("");
  let [showMessage, setShowMessage] = useState(false);

  let answers = fetchingData<answers>(`${import.meta.env.VITE_BACKEND_URL}/quizzes`);

  if (answers["answers"][question["_id"]] !== undefined) {
    setSubmited(true);
    setSelected(answers["answers"][question["_id"]]);
    setShowMessage(true);
  }

  const counterVisualizer = () => {
    setShowMessage(true);
  };

  const Label = () => {
    return !submited
      ? "hover:bg-white/15 hover:duration-300 cursor-pointer"
      : "";
  };

  let data = fetchingData(`${import.meta.env.VITE_BACKEND_URL}/counters`);
  console.log(data);
  let precentage = 0;
  let total = 0;
  const counter = (value: string) => {
    data.forEach((item) => {
      total =
        parseInt(item.a, 10) +
        parseInt(item.b, 10) +
        parseInt(item.b, 10) +
        parseInt(item.b, 10);
      precentage = (parseInt(item[value], 10) / total) * 100;
    });
    const match = data.find((item) => item._id === question._id);
    if (match) {
      return (
        showMessage && (
          <div className="flex flex-row items-center gap-3 ">
            <span className="text-white text-base">{match[value]}</span>
            <span className="text-white text-base ">
              {precentage.toFixed(2)}%
            </span>
          </div>
        )
      );
    }
    return;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSelected(e.target.value);
  const newClass = (option: string) => {
    if (submited) {
      if (option === question.correct) {
        setScore(true);
        return "border-4 rounded-xl border-green-500/90 duration-200";
      } else if (option === selected && option !== question.correct) {
        setScore(false);
        return "border-4 rounded-xl border-red-500 duration-200";
      }
    }
    return "";
  };

  return (
    <form
      className="flex flex-col items-start p-1"
      onSubmit={(e) => {
        e.preventDefault();
        if (selected === "") {
          alert("Please select an answer");
          return;
        }
        submitChoice(
          e,
          `${import.meta.env.VITE_BACKEND_URL}/counters`,
          question._id
        );
        setSubmited(true);
        counterVisualizer();
      }}
    >
      <div className="flex flex-col w-full items-start gap-4 pl-1 ">
        <p>{question["question"]}</p>

        {["a", "b", "c", "d"].map((choice) => (
          <label
            className={
              Label() +
              " flex flex-row items-center gap-2 min-w-full border rounded-lg p-2 " +
              newClass(choice)
            }
            key={choice}
          >
            <div className="w-4 h-4 duration-300 border-2 border-gray-300 rounded-full flex items-center justify-center">
              <input
                onChange={handleChange}
                disabled={submited}
                type="radio"
                name="Choices"
                value={choice}
                className="peer hidden"
              />

              <div className="w-2.5 h-2.5 duration-300 border-gray-300 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-white"></div>
            </div>
            <span className="mr-auto">{question[choice]}</span>
            {counter(choice)}
          </label>
        ))}
      </div>
      <button
        disabled={submited}
        type="submit"
        className="bg-white text-base flex justify-center font-semibold shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 text-black py-1 px-2 rounded-lg ml-1 mt-6 disabled:bg-gray-400"
      >
        submit
      </button>
    </form>
  );
}

export default Question;
