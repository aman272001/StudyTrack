import { useEffect, useState } from "react";
import api from "../services/api";
import { getData, messageOf } from "../utils/apiHelpers";

export default function useFetch(url, initial = []) {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      setData(getData(await api.get(url)) || initial);
      setError("");
    } catch (requestError) {
      setError(messageOf(requestError));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [url]);
  return { data, setData, loading, error, reload: load };
}