import { useState } from "react";

function Question({ question }: { question: { [key: string]: string } }) {
  let [submited, setSubmited] = useState(false);
  let [selceted, setSelected] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSelected(e.target.value);
  const newClass = (option: string) => {
    if (submited) {
      if (option === question.correct) {
        return "bg-green-500";
      } else if (option === selceted && option !== question.correct) {
        return "bg-red-500";
      }
    }
    return "";
  };

  return (
    <form className="flex flex-col items-start p-1">
      <p>{question["question"]}</p>
      <div className="flex flex-col w-full items-start gap-3 pl-1">
        <label className={"min-w-full border rounded-lg p-2 " + newClass("a")}>
          <input
            onChange={handleChange}
            disabled={submited}
            type="radio"
            name="Choices"
            value="a"
            className={"align-middle " + newClass("a")}
          />
          {question["a"]}
        </label>
        <label className={"min-w-full border rounded-lg p-2 " + newClass("b")}>
          <input
            onChange={handleChange}
            disabled={submited}
            type="radio"
            name="Choices"
            value="b"
            className={"align-middle " + newClass("b")}
          />
          {question["b"]}
        </label>
        <label className={"min-w-full border rounded-lg p-2 " + newClass("c")}>
          <input
            onChange={handleChange}
            disabled={submited}
            type="radio"
            name="Choices"
            value="c"
            className={"align-middle " + newClass("c")}
          />
          {question["c"]}
        </label>
        <label className={"min-w-full border rounded-lg p-2 " + newClass("d")}>
          <input
            onChange={handleChange}
            disabled={submited}
            type="radio"
            name="Choices"
            value="d"
            
            className="align-middle"
          />
          {question["d"]}
        </label>
      </div>
      <button
        onClick={() => {
        if(selceted === "") {alert("Please select an answer"); return;}
        setSubmited(true);
        }}
        disabled={submited}
        type="submit"
        className="bg-white text-base flex justify-center font-semibold shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 text-black py-1 px-2 rounded-lg ml-1 mt-8 disabled:bg-gray-400"
      >
        submit
      </button>
    </form>
  );
}

export default Question;
