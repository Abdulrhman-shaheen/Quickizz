import { useState, useEffect } from "react";

export const  fetchingData = <T>(url: string) => {
  let [data, setData] = useState<T | null>(null);

  useEffect(() => {
    fetchInfo();
  }, []);


  const fetchInfo = async () => {
    const response = await fetch(url);
    const result = (await response.json()) as T;
    setData(result);
  };

  return data;
};
