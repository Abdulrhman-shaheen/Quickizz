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
        
        switch(url){
          case "http://localhost:5000/signup":
            window.location.href = '/';
            break;
          case "http://localhost:5000/loginlecturer":
            window.location.href = '/user/lectureinter';
            break;
          case "http://localhost:5000/loginstudent":
            window.location.href = '/user/userinter';
            break;
          default:
            window.location.href = '/';
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };