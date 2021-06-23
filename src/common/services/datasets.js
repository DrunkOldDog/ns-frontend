export const postRequest = async (url, data) => {
  const resp = await fetch(url, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await resp.json();
  return result;
}