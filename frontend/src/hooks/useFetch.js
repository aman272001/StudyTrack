import { useEffect, useState } from "react";
import api from "../services/api";
import { getData, messageOf } from "../utils/apiHelpers";

const cache = new Map();

const cacheKeyFor = (url) => `${localStorage.getItem("student_token") || "anonymous"}:${url}`;

export default function useFetch(url, initial = [], select = getData) {
  const cacheKey = cacheKeyFor(url);
  const cached = cache.get(cacheKey);
  const [data, setData] = useState(cached?.data ?? initial);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState("");

  const load = async () => {
    if (!cache.has(cacheKey)) setLoading(true);
    try {
      const nextData = select(await api.get(url)) || initial;
      cache.set(cacheKey, { data: nextData });
      setData(nextData);
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