import StatusCode from "../statuscodes.json";
const StatusCodes = Object.fromEntries(
  Object.entries(StatusCode).map(([key, value]) => [value, key])
);
export const scoreUpdate = async (sess_id: string, score: number) => {

  if (sess_id === "") {
    return;
  }
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/updatescore`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({sess_id: sess_id, score: score}),
        credentials: "include",
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log(StatusCodes[result.good]);
    } else {
      console.error("Failed to update the score:", response.statusText);
      throw new Error("Failed to update the score");
    }
  } catch (error) {
    console.error("Error during the request:", error);
    throw error;
  }
};
