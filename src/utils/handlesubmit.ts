import StatusCode from "../statuscodes.json";
const StatusCodes = Object.fromEntries(
  Object.entries(StatusCode).map(([key, value]) => [value, key])
);

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  url: string,
  pathname: string,
  navigator : (s : string) => void
) => {
  e.preventDefault(); // Prevent default form submission
  // object to specify where to redirect after successful login

  const redirectURLs: { [key: string]: string } = {
    "/signup": "/",
    "/loginlecturer": "/user/lectureinter",
    "/loginstudent": "/user/userinter",
  };

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
      console.log(StatusCodes[result.good]);
      console.log(redirectURLs[pathname]);
      navigator(redirectURLs[pathname]);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
