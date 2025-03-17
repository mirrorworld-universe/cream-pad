import axios, { AxiosInstance } from "axios";

const stagingBaseURL = "https://strapi-staging.sonic.game/api/";
const productionBaseURL = "https://strapi.sonic.game/api/";

class Strapi {
  ins: AxiosInstance;

  constructor() {
    if (typeof window === "undefined") {
      return;
    }
    const params = new URLSearchParams(window.location.search);

    let baseURL = stagingBaseURL;

    const strapiEnv = params.get("strapi");

    if (strapiEnv === "prod") {
      baseURL = productionBaseURL;
    }

    if (location.href.startsWith("https://foundation.")) {
      baseURL = productionBaseURL;
    }

    this.ins = axios.create({
      baseURL
    });
  }

  get = async (url: string, params?: Record<string, any>) => {
    const res = await this.ins.get(url, { params });
    return res.data;
  };

  post = async (url: string, data?: any) => {
    const res = await this.ins.post(url, data);
    return res.data;
  };
}

export const strapi = new Strapi();
