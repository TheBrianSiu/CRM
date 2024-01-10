export async function makeApiRequest(url, method, data) {
  const token = sessionStorage.getItem("token");
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: data !== null ? JSON.stringify(data) : null,
    });

    const responseData = await response.json();

    if (!response.ok) {
      if (responseData && responseData.message) {
        return { error: responseData.message };
      }
      return { error: 'API request failed' };
    }

    return responseData;
  } catch (error) {
    return { error: `API request error: ${error.message}` };
  }
}
