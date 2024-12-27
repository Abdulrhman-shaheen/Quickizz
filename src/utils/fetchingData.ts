import { useState, useEffect } from "react";

export const fetchingData = <T>(url: string, kwargs?: {}) => {
  let [data, setData] = useState<T | null>(null);
  useEffect(() => {
    fetchInfo();
  }, []);

  let fetchOptions = kwargs
    ? {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kwargs),
      }
    : {};

  const fetchInfo = async () => {
    const response = await fetch(url, fetchOptions);
    const result = (await response.json()) as T;
    setData(result);
  };

  return data;
};
