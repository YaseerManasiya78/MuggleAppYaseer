import { useEffect, useState } from "react";
const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useFetchPaymentFormData = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const queryParam = params.get("pid");
      setLoading(true);
      const response = await fetch(`${baseUrl}/products/${queryParam}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
};

export default useFetchPaymentFormData;
