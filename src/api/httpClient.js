import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://g1api.finlogix.com/v1",
});

httpClient.callback = {
  logout: () => null,
  clearSession: () => null,
  navigate: () => null,
};

httpClient.interceptors.request.use(
  (config) => {
    const requestData = {
      method: config.method,
      url: config.url,
      data: config.data,
    };
    console.debug("requestData", requestData);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    console.debug(response);
    return response;
  },
  (error) => {
    console.debug("**** call api error ****", error.response);
    if (error.response.status === 401) {
          httpClient.callback.clearSession();
          httpClient.callback.navigate('/login');

    }
    return Promise.reject(error);
  }
);

export const toFormData = (jsonData) => {
  var form = new FormData();
  for (var key in jsonData) {
    if (jsonData[key] === null || typeof jsonData[key] === undefined) {
      form.append(key, "");
    } else {
      form.append(key, jsonData[key]);
    }
  }
  return form;
};

export const registerCallback = (cbName, cb) => {
  httpClient.callback[cbName] = cb;
};

export default httpClient;
