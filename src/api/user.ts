import { $authHost } from "@/api/index";

export const userUrlEndpoint = "/user";

export const getUser = async () => {
  const { data } = await $authHost.get(userUrlEndpoint);
  return data;
};
