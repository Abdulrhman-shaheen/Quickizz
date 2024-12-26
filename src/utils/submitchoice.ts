export const submitChoice = async (
    e: React.FormEvent<HTMLFormElement>,
    url: string,
    objectID: string
  ) => {
    e.preventDefault();

    const selectedChoice = (e.target as HTMLFormElement).Choices.value;
  
    const formData = {
      objectID,
      incrementField: selectedChoice,
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
        console.error("Failed to update the count:", response.statusText);
        throw new Error("Failed to update the count");
      }
    } catch (error) {
      console.error("Error during the request:", error);
      throw error;
    }
  };
  