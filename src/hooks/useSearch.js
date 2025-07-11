import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import config from "../config/config";
import { useRef } from "react";

const useSearch = (query) => {
  const enabled = !!query?.trim();
  const abortControllerRef = useRef();

  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      // Abort previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      // Create new controller for this request
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const res = await axios.get(config.SEARCH_BASE_URL, {
        params: { query: query },
        signal: controller.signal,
      });
      return res?.data?.data?.items || [];
    },
    enabled,
    staleTime: 5 * 60 * 1000, // cache for 5 min
  });
};

export default useSearch;
