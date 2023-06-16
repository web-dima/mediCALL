import {AxiosTypes} from "../axios/types";
import {Service} from "./Service";
import {CreateReceptionsDto} from "../Dto/CreateReceptionsDto";
import {ReceptionStatus} from "../../enums/ReceptionStatus";

export class ReceptionsService extends Service{

    constructor(type:AxiosTypes = AxiosTypes.users) {
        super(type);
    }

    public async checkCanUserMakeReception(service: string, afterGP:boolean) {
        console.log(service)
        if (!afterGP) return {status: true}
        if (service !== "Терапевт") {
            const resp = await this.$privateApi.post("/user/d/d")
            return resp.data
        }
        return {status: true}
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

    public async getByStatus(status:string) {
        const resp = await this.$privateApi.post("/doctors/post/receptions", {status})
        return resp.data
    }

    public async updateStatus(status:string, id:number){
        let action = "";
        if (status === ReceptionStatus.accept) {
            action = "accept"
        } else if(status === ReceptionStatus.cancel){
            action = "cancel"
        }

        const resp = await this.$privateApi.patch(`/receptions/${action}/${id}`)
        console.log(resp.data)
        return resp.data
    }

    public async makeComplete(result:string, id:number) {
        const resp = await this.$privateApi.post("/receptions/complete", {id, result})
        return resp.data
    }

    public async deleteOrComeback(isDelete:boolean, id:number){
        let action = "return";
        if (isDelete) {
            action = "delete"
        }

        const resp = await this.$privateApi.post(`/receptions/${action}/${id}`)
        return resp.data
    }
}