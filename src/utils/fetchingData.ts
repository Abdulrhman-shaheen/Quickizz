import {useState, useEffect} from "react";

export const fetchingData = (
  url:string) => {
  
let [data, setData] = useState<{[key: string]: string }[]>([]);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d));
  };

  return data;
}