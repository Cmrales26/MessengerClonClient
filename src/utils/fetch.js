export const fetchDataPost = async (route, data) => {
  try {
    const response = await fetch(route, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (response.status !== 200) {
      return { error: result.message, status: response.status };
    } else {
      return { data: result, status: response.status };
    }
  } catch (error) {
    return { error: error.message };
  }
};

export const fetchDataGet = async (route) => {
  try {
    const response = await fetch(route, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (response.status !== 200) {
      return { error: result.message, status: response.status };
    }

    return result.data;
  } catch (err) {
    return { error: err.message };
  }
};
