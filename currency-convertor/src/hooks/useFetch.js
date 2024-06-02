import { useState, useEffect } from "react";

const useFetch = (currency) => {
   const [data, setData] = useState({});

   useEffect(() => {
      fetch(
         `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
      )
         .then((res) => res.json())
         .then((data) => setData(data[currency]));
   }, [currency, data]);
   return data;
};

export default useFetch;
