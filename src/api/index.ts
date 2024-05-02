// import axios from "axios";
//
// import ErrorHandler from "@/utils/handlers/ErrorHandler";
// import { getCookie, setCookie } from "@/utils/helpers/cookie.helpers";
//
// const baseURL = process.env.NEXT_PUBLIC_API_URL;
// const isSSR = typeof window === "undefined";
// let isRefreshedToken = false;
//
// const $host = axios.create({
//   baseURL: baseURL,
// });
//
// const $authHost = axios.create({
//   baseURL: baseURL,
// });
//
// const authInterceptor = async (config) => {
//   if (isSSR) {
//     const { cookies } = await import("next/headers");
//     const accessToken = cookies().get("accessToken")?.value;
//
//     if (accessToken) {
//       config.headers.authorization = accessToken;
//     }
//   } else {
//     const accessToken = getCookie("accessToken");
//
//     if (accessToken) {
//       config.headers.authorization = accessToken;
//     }
//   }
//
//   return config;
// };
//
// const authInterceptorResponse = (response) => {
//   return response;
// };
//
// $authHost.interceptors.request.use(authInterceptor);
//
// $authHost.interceptors.response.use(authInterceptorResponse, async (error) => {
//   const originalRequest = error.config;
//   if (
//     error.response.status === 401 &&
//     originalRequest &&
//     !originalRequest._isRetry
//   ) {
//     if (!isRefreshedToken) {
//       isRefreshedToken = true;
//       try {
//         const accessToken = getCookie("accessToken");
//         if (accessToken) {
//           const { data } = await axios.post(
//             process.env.NEXT_PUBLIC_API_URL + "/auth/refresh",
//             { withCredentials: true },
//           );
//           const newAccessToken = data.access_token;
//           const tokenType = data.token_type;
//           const tokenLifetime = data.expires_in;
//
//           setCookie(
//             "accessToken",
//             `${tokenType} ${newAccessToken}`,
//             tokenLifetime,
//           );
//           originalRequest._isRetry = true;
//           return $authHost.request(originalRequest);
//         }
//       } catch (e) {
//         ErrorHandler.handle(error, { componentName: "api__interceptor" });
//       } finally {
//         isRefreshedToken = false;
//       }
//     }
//   }
//   throw error;
// });
//
// async function getRefreshedToken() {
//   if (!isRefreshedToken) {
//     isRefreshedToken = true;
//     try {
//       const { data } = await $authHost.post(
//         process.env.NEXT_PUBLIC_API_URL + "/auth/refresh",
//         { withCredentials: true },
//       );
//       const accessToken = data.access_token;
//       const tokenType = data.token_type;
//       const tokenLifetime = data.expires_in;
//
//       setCookie("accessToken", `${tokenType} ${accessToken}`, tokenLifetime);
//     } catch (error) {
//       ErrorHandler.handle(error, { componentName: "api__getRefreshedToken" });
//     } finally {
//       isRefreshedToken = false;
//     }
//   }
//
//   return Promise.resolve();
// }
//
// setInterval(getRefreshedToken, 3500 * 1000);
//
// export { $host, $authHost };
