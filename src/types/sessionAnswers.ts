export type sessionAnswers = {
  _id: string;
  sess_id: string;
  answers: { [key: string]: { a: number; b: number; c: number; d: number } };
};

const exampleSessionAnswer: sessionAnswers = {
  _id: "exampleId",
  sess_id: "exampleSessionId",
  answers: {
    question1: { a: 1, b: 2, c: 3, d: 4 },
    question2: { a: 5, b: 6, c: 7, d: 8 },
    question3: { a: 9, b: 10, c: 11, d: 12 },
  },
};

console.log(Object.entries(exampleSessionAnswer.answers))
