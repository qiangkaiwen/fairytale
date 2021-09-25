import fetch from "isomorphic-fetch";

const headers = {
  "Content-Type": "application/json ",
  Accept: "application/json "
};

const url = (base, path) => `${base}/${path}`;

export const post = async (base, body, path, token = null) => {
  try {
    let head = headers;
    if (token) head = { ...headers, Authorization: `Bearer ${token}` };
    const response = await fetch(url(base, path), {
      method: "POST",
      headers: head,
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(`POST Something went wrong with http-status: ${response.status}`);
    }
    return response.json();
  } catch (e) {
    console.log(e.message);
    return {};
  }
};

export const get = async (base, token, path) => {
  try {
    const response = await fetch(url(base, path), {
      method: "GET",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`GET Something went wrong with http-status: ${response.status}`);
    }
    return response.json();
  } catch (e) {
    console.log(e.message);
    return {};
  }
};

export const patch = async (base, body, path, token = null) => {
  try {
    let head = headers;
    if (token) head = { ...headers, Authorization: `Bearer ${token}` };
    const response = await fetch(url(base, path), {
      method: "PATCH",
      headers: head,
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(`PATCH Something went wrong with http-status: ${response.status}`);
    }
    return response.json();
  } catch (e) {
    console.log("Got exception in patch: " + e);
    return {};
  }
};

export const remove = async (base, path, token = null) => {
  try {
    let head = headers;
    if (token) head = { ...headers, Authorization: `Bearer ${token}` };
    const response = await fetch(url(base, path), {
      method: "DELETE",
      headers: head
    });
    if (!response.ok) {
      throw new Error(`DELETE Something went wrong with http-status: ${response.status}`);
    }
    return;
  } catch (e) {
    console.log(e.message);
    return {};
  }
};
