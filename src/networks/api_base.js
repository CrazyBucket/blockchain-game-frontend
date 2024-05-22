import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";

axios.defaults.baseURL = BASE_URL;

export class ApiBase {
  constructor() {
    this.CancelToken = axios.CancelToken;

    this.http = axios.create({
      timeout: TIMEOUT,
    });

    this.service = axios.create({
      baseURL: BASE_URL,
      timeout: TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default ApiBase;

