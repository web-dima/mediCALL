import {AxiosInstance} from "axios";
import {Axios} from "../axios/Axios";
import {AxiosTypes} from "../axios/types";

export class UserService {
    private readonly $publicApi:AxiosInstance
    private readonly $privateApi:AxiosInstance;

    constructor() {
        const axios = new Axios(AxiosTypes.users)
        this.$publicApi = axios.getAxios
        axios.makeAxiosAuth()
        this.$privateApi = axios.getAxios
    }

    public getApies() {
        return {public: this.$privateApi,private: this.$publicApi}
    }
}