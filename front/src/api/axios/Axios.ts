import axios, {AxiosInstance} from "axios";
import {AxiosTypes} from "./types";

export class Axios {
    private readonly  BASE_URL = "http://cz55344.tw1.ru/server/api/"
    private readonly ax: AxiosInstance
    private readonly axiosType: AxiosTypes

    constructor(axiosType: AxiosTypes) {
        this.ax = axios.create({
            baseURL: this.BASE_URL,
            headers: {
                "Content-type": "application/json"
            }
        });
        this.axiosType = axiosType
    }

    public makeAxiosAuth() {
        const token = localStorage.getItem(`${this.axiosType}_token`)

        if (token) {
            this.ax.interceptors.request.use((config)=> {
                config.headers.Authorization = `Bearer ${token}`
                // config.headers.Authorization = `Bearer 525`
                return config
            })
        }return this.ax
    }

    get getAxios() {
        return this.ax
    }
}