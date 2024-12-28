import StatusCode from "../statuscodes.json";
const StatusCodes = Object.fromEntries(
  Object.entries(StatusCode).map(([key, value]) => [value, key])
);

export async function updateUserQuizzes(sess_id : number){
  
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/updateuserquizzes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({sess_id: sess_id}),
        credentials: "include",
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log(StatusCodes[result.good]);
    } else {
      console.error("Failed to update the quizzes:", response.statusText);
      throw new Error("Failed to update the quizzes");
    }
  } catch (error) {
    console.error("Error during the request:", error);
    throw error;
  }

}