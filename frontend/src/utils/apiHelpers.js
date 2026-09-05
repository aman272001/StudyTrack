export const getData = (response) => response.data?.data ?? response.data;

export const messageOf = (error) =>
  error.response?.data?.message ||
  (error.response ? "Request failed." : "Unable to reach the server.");