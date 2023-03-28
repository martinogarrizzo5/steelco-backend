import { AxiosError, AxiosInstance } from "axios";

export function setupAuthRefreshInterceptor(
  axios: AxiosInstance,
  onRefreshError: () => void
) {
  const interceptor = axios.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      console.log(error.config);
      // Reject promise if usual error
      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }

      // Logout user and reject promise if refresh token is expired
      // "Token Expired" is an error returned by the server when the access token expired
      if ((error.response?.data as any).message !== "Token Expired") {
        localStorage.removeItem("accessToken");
        onRefreshError();
        return Promise.reject(error);
      }

      // Detach the interceptor so it doesn't loop
      axios.interceptors.response.eject(interceptor);

      const accessToken = localStorage.getItem("accessToken");

      return axios
        .post("/auth/refresh", { accessToken: accessToken })
        .then(response => {
          if (!error.response) return Promise.reject(error);

          localStorage.setItem("accessToken", response.data.accessToken);

          error.response.config.headers["Authorization"] =
            "Bearer " + response.data.accessToken;

          // Retry the initial call, but with the updated token in the headers.
          // Resolves the promise if successful
          return axios(error.response.config);
        })
        .catch(refreshError => {
          // Retry failed, clean up and reject the promise
          localStorage.removeItem("accessToken");
          onRefreshError();

          return Promise.reject(refreshError);
        })
        .finally(() => {
          // Re-attach the interceptor by running the method
          setupAuthRefreshInterceptor(axios, onRefreshError);
        });
    }
  );
}
