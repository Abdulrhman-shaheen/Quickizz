import { useState, useEffect, Dispatch, SetStateAction } from "react";

export const fetchingData = <T>(
  url: string,
  kwargs?: { [key: string]: any }
) => {
  let [data, setData] = useState<T | null>(null);

  useEffect(
    () => {
      fetchInfo();
    },
    kwargs ? (kwargs["watch"] ? kwargs["watch"] : []) : []
  );

  let fetchOptions: RequestInit = kwargs
    ? {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kwargs),
        credentials: kwargs["credentials"] ? "include" : "omit",
      }
    : {};

  const fetchInfo = async () => {
    const response = await fetch(url, fetchOptions);
    const result = (await response.json()) as T;
    setData(result);
  };
  
  // console.log(data);
  return [data, setData] as [T | null, Dispatch<SetStateAction<T | null>>];
};
