const useQuery = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams;
};

export default useQuery;
