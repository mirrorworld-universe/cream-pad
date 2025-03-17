import axios, { AxiosInstance } from "axios";

class Http {
  ins: AxiosInstance;

  constructor() {
    this.ins = axios.create({
      baseURL: ""
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

export const http = new Http();
