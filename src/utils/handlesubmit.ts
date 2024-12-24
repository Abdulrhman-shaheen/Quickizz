import StatusCode from "../statuscodes.json";
const StatusCodes = Object.fromEntries(Object.entries(StatusCode).map(([key, value]) => [value, key]));

export const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, url: string) => {
    
    e.preventDefault(); // Prevent default form submission

    const formData = {
      username: (e.target as HTMLFormElement).username.value,
      password: (e.target as HTMLFormElement).password.value,
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
        const result = await response.json();
        console.log("Success:", result);
        console.log(StatusCodes[result.good]);
      } else {
        console.error("Failed to submit form:", response.status);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };