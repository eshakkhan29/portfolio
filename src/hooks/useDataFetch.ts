"use client";
import api from "@/lib/axiosInstance";
import { useState, useEffect } from "react";

// Custom hook
const useDataFetch = (url: string | null, reFetch?: any) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        setData(null);
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const response = await api.get(url as string);
        setData(response.data);
        setIsSuccess(true);
        setError(null);
      } catch (err: any) {
        setError(err?.data?.message || "An error occurred");
        setData(null);
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, reFetch]);

  return { data, error, isLoading, isSuccess };
};

export default useDataFetch;
