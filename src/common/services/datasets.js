import axios from "axios";

export const postRequest = async (url, data) => {
  const result = await axios.post(url, data);
  // const resp = await fetch(url, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  return result.data;
};

export const getRequest = async (url) => {
  const result = await axios.get(url);
  return result.data || {};
};
