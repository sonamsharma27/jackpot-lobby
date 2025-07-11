import { useInfiniteQuery } from "@tanstack/react-query";
import config from "../config/config";
import axios from "axios";
import { useRef } from "react";

const useGames = (filter) => {
  const enabled = !!filter;
  const abortControllerRef = useRef();

  return useInfiniteQuery({
    queryKey: ["games", filter],
    enabled,
    queryFn: async ({ pageParam = 1 }) => {
      // Abort previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      // Create new controller for this request
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const res = await axios.get(config.GAMES_BASE_URL, {
        params: { limit: 50, offset: (pageParam - 1) * 50, category: filter },
        signal: controller.signal,
      });
      return res?.data || [];
    },
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.data.total;
      let count = 0;
      allPages.forEach((page) => (count += page.data.count));
      const hasMore = count < total;
      return hasMore ? allPages.length + 1 : undefined;
    },
  });
};

export default useGames;
