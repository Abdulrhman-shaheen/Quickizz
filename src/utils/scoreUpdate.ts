export const scoreUpdate = async (
    url: string,
    score: number,
    objectID: string
  ) => {
    const formData = {
        objectID,
      incrementField: score,
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        return await response.json();
      } else {
        console.error("Failed to update the score:", response.statusText);
        throw new Error("Failed to update the score");
      }
    } catch (error) {
      console.error("Error during the request:", error);
      throw error;
    }
  };
  