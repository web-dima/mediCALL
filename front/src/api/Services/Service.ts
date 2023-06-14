import {AxiosInstance} from "axios";
import {Axios} from "../axios/Axios";
import {AxiosTypes} from "../axios/types";

export class Service {
    protected readonly $publicApi:AxiosInstance
    protected readonly $privateApi:AxiosInstance;

    constructor(type: AxiosTypes) {
        const axios = new Axios(type)
        this.$publicApi = axios.getAxios
        // console.log(this.$publicApi)
        axios.makeAxiosAuth()
        this.$privateApi = axios.getAxios
        // console.log(this.$privateApi)
    }

    protected getApies() {
        return {public: this.$privateApi,private: this.$publicApi}
    }
}