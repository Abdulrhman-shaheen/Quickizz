import StatusCode from "../statuscodes.json";
const StatusCodes = Object.fromEntries(
  Object.entries(StatusCode).map(([key, value]) => [value, key])
);

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  url: string,
  pathname: string,
  navigator: (s: string) => void
) => {
  e.preventDefault(); // Prevent default form submission
  
  if(pathname.at(-1) == "/"){
    pathname = pathname.slice(0, -1);  
  }
  
  const redirectURLs: { [key: string]: string } = {
    "/signup": "/",
    "/lecturer": "/lecturer/home",
    "/student": "/student/home",
  };

  let formData: { [key: string]: string | undefined } = {};
  switch (pathname) {
    case "/signup":
      formData = {
        username: (e.target as HTMLFormElement).username.value,
        password: (e.target as HTMLFormElement).password.value,
        firstname: (e.target as HTMLFormElement).firstname.value,
        lastname: (e.target as HTMLFormElement).lastname.value,
      };
      break;
    case "/lecturer":
    case "/student":
      formData = {
        username: (e.target as HTMLFormElement).username.value,
        password: (e.target as HTMLFormElement).password.value,
      };
      break;
    default:
      break;
  }

  // console.log(formData);
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
      // console.log(redirectURLs[pathname]);
      if (StatusCodes[result.good] === "USER_CREATED" || StatusCodes[result.good] === "SUCCESS_LOGIN") {
        navigator(redirectURLs[pathname]);
      }
      return StatusCodes[result.good];

    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
