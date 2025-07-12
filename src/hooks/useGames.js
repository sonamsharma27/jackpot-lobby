import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";

const useGames = (filter) => {
  const enabled = !!filter;
  const abortControllerRef = useRef();

  return useInfiniteQuery({
    queryKey: ["games", filter],
    enabled,
    queryFn: async ({ pageParam = 1 }) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const res = await fetch(
        `/api/games?limit=50&offset=${(pageParam - 1) * 50}&category=${filter}`,
        { signal: controller.signal }
      );

      if (!res.ok) throw new Error("Failed to fetch games");

      const json = await res.json();
      return json?.data?.data || [];
    },
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.total;
      const fetched = allPages.reduce((sum, page) => sum + page.count, 0);
      return fetched < total ? allPages.length + 1 : undefined;
    },
  });
};

export default useGames;
