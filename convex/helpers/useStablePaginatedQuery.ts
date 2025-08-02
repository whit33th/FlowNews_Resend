import { usePaginatedQuery } from "convex/react";
import { useRef } from "react";

export function useStablePaginatedQuery(name: any, args: any, options: any) {
  const news = usePaginatedQuery(name, args, options);
  const stored = useRef(news);

  if (news.status !== "LoadingMore") {
    stored.current = news;
  }

  return stored.current;
}
