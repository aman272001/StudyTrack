import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { getData, messageOf } from "../utils/apiHelpers";

export default function useFetch(url, initial = [], select = getData) {
  const token = localStorage.getItem("student_token") || "anonymous";
  const query = useQuery({
    queryKey: [token, url],
    queryFn: async () => select(await api.get(url)) || initial,
  });

  return {
    data: query.data ?? initial,
    loading: query.isLoading,
    error: query.isError ? messageOf(query.error) : "",
    reload: query.refetch,
  };
}