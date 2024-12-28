export const submitChoice = async (
  sess_id: string,
  q_id: string,
  selectedChoice: string
) => {
  const formData = {
    sess_id: sess_id,
    q_id: q_id,
    choice: selectedChoice,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/updatesessionanswer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to update the count:", response.statusText);
      throw new Error("Failed to update the count");
    }
  } catch (error) {
    console.error("Error during the request:", error);
    throw error;
  }
};
