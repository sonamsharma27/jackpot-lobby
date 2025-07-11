"use client";

import { useEffect, useRef } from "react";
import useGames from "@/hooks/useGames";
import Shimmer from "./Shimmer";
import CardsGrid from "./CardsGrid";
import Loader from "./Loader";

export default function InfiniteScroll({ filter }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isFetching,
    isLoading,
  } = useGames(filter);

  const loaderRef = useRef();

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasNextPage, fetchNextPage]);

  let allGames = data?.pages.flatMap((page) => page.data.items) || [];
  let gamesCount =
    data?.pages.reduce((acc, page) => acc + page.data.count, 0) || 0;
  let totalGames = data?.pages[0]?.data?.total || 0;
  allGames = allGames.filter((game) => !!game); //handling null cases

  if (isLoading) {
    return <Shimmer />;
  }

  if (isError) {
    return <p>Failed to load games.</p>;
  }

  if (allGames.length === 0) {
    return <p>No games found.</p>;
  }

  return (
    <div>
      <CardsGrid games={allGames} isFetchingNextPage={isFetchingNextPage} />
      {gamesCount < totalGames && (
        <div ref={loaderRef}>
          <Loader />
        </div>
      )}
    </div>
  );
}
