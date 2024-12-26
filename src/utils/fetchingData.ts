import { useState, useEffect } from "react";

export const fetchingData = (url: string) => {
  let [data, setData] = useState<{ [key: string]: string }[]>([]);

  useEffect(() => {
    fetchInfo();
  }, []);


  const fetchInfo = async () => {
    const response = await fetch(url);
    const result = (await response.json()) as { [key: string]: string }[];
    setData(result);
  };

  return data;
};
