import {AxiosTypes} from "../axios/types";
import {Service} from "./Service";
import {CreateReceptionsDto} from "../Dto/CreateReceptionsDto";

export class ReceptionsService extends Service{

    constructor(type:AxiosTypes = AxiosTypes.users) {
        super(type);
    }

    public async createReceptions(data: CreateReceptionsDto) {
        if (!data.doctorId || !data.date) {
            return "не все поля заполнены"
        }
        console.log(data)

        const respData = {doctor_id: data.doctorId, date: data.date}

        const resp = await this.$privateApi.post("/receptions", respData)
        return resp.data
    }

    public async getReceptionsForUser() {
        const resp = await this.$privateApi.get("/receptions/user")
        return resp.data
    }

    public async getAllReceptions() {
        const resp = await this.$privateApi.get("/doctors/get/receptions")
        return resp.data
    }

    public async getByStatus(status) {
        const resp = await this.$privateApi.post("/doctors/post/receptions", {status})
        return resp.data
    }

    public async updateStatus(status){
        return status
    }

    public async makeComplete(result:string, id:number) {
        const resp = await this.$privateApi.post("/receptions/complete", {id, result})
        return resp.data
    }
}