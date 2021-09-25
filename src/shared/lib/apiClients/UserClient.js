import { post, get, patch, remove } from "./Client";

export const postLogin = async body => post(process.env.USER_API_URL, body, "user");

export const postResetRequest = async body => post(process.env.USER_API_URL, body, "password");

export const patchReset = async body => patch(process.env.USER_API_URL, body, "password");

export const getUser = async token => get(process.env.USER_API_URL, token, "user");

export const patchUser = async (token, body) =>
  patch(process.env.USER_API_URL, body, "user", token);

export const getUsers = async token => get(process.env.USER_API_URL, token, "users");

export const getUserInfo = async (token, userId) => get(process.env.USER_API_URL, token, `users/${userId}`);

export const patchUserInfo = async (token, userId, body) =>
  patch(process.env.USER_API_URL, body, `users/${userId}`, token);

export const deleteUser = async (token, userId) =>
  remove(process.env.USER_API_URL, `users/${userId}`, token);

export const getRoles = async token => get(process.env.USER_API_URL, token, "roles");

export const getRole = async (token, roleId) => get(process.env.USER_API_URL, token, `roles/${roleId}`);

export const patchRole = async (token, roleId, body) =>
  patch(process.env.USER_API_URL, body, `roles/${roleId}`, token);

export const deleteRole = async (token, roleId) =>
  remove(process.env.USER_API_URL, `roles/${roleId}`, token);

export const createUser = async (token, body) =>
  post(process.env.USER_API_URL, body, "users", token);

export const createRole = async (token, body) =>
  post(process.env.USER_API_URL, body, "roles", token);

export const patchUserSocial = async (token, userId, body) =>
  patch(process.env.USER_API_URL, body, `user_social/${userId}`, token);