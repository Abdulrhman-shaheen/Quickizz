import StatusCode from "../statuscodes.json";
const StatusCodes = Object.fromEntries(
  Object.entries(StatusCode).map(([key, value]) => [value, key])
);

export const answersUpdate = async (sess_id : Number, q_id: string, choice: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/updateanswer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({sess_id: sess_id, q_id: q_id, choice: choice}),
        credentials: "include",
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log(StatusCodes[result.good]);    } else {
      console.error("Failed to update the answer:", response.statusText);
      throw new Error("Failed to update the answer");
    }
  } catch (error) {
    console.error("Error during the request:", error);
    throw error;
  }
};
