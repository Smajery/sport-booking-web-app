import { $authHost } from "@/api";

export const facilityUrlEndpoint = "/facility";

export const getAllFacilities = async () => {
  const { data } = await $authHost.get(facilityUrlEndpoint);
  return data;
};
