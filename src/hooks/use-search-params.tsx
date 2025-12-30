"use client";

import { useSearchParams } from "next/navigation";

const useQuery = () => {
  const searchParams = useSearchParams();
  return searchParams;
};

export default useQuery;
