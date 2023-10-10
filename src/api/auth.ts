import { $authHost, $host } from "@/api/index";

export const authUrlEndpoint = "/auth";

export const register = async (formData) => {
  const { data } = await $host.post(authUrlEndpoint + "/register", formData);
  return data;
};

export const login = async (formData) => {
  const { data } = await $host.post(authUrlEndpoint + "/login", formData);
  return data;
};

export const googleAuth = async () => {
  const { data } = await $host.get(authUrlEndpoint + "/google/callback");
  return data;
};

export const facebookAuth = async () => {
  const { data } = await $host.get(authUrlEndpoint + "/facebook/callback");
  return data;
};

export const logout = async () => {
  const { data } = await $authHost.post("auth/logout");
  return data;
};
