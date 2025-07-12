import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

const useSearch = (query) => {
  const enabled = !!query?.trim();
  const abortControllerRef = useRef();

  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      // Abort previous request if any
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const res = await fetch(`/api/search?query=${query}`, {
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error("Search request failed");
      }

      const json = await res.json();
      return json?.data.data?.data?.items || [];
    },
    enabled,
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });
};

export default useSearch;
