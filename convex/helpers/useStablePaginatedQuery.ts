import { useRef } from "react";
import { usePaginatedQuery } from "convex/react";

export function useStablePaginatedQuery(name: any, args: any, options: any) {
  const result = usePaginatedQuery(name, args, options);
  const stored = useRef(result);

  if (result.status !== "LoadingMore") {
    stored.current = result;
  }

  return stored.current;
}
