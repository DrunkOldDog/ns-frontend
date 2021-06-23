import axios from "axios";

export const postRequest = async (url, data) => {
  try {
    const result = await axios.post(url, data);
    return result.data || {};
  } catch (err) {
    const error = err.response?.data || {};
    console.error(error);
    return error;
  }
  // const resp = await fetch(url, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
};

export const getRequest = async (url) => {
  const result = await axios.get(url);
  return result.data || {};
};
