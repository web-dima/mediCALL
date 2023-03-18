import {AxiosTypes} from "../axios/types";
import {Service} from "./Service";
import {CreateDoctorDto} from "../Dto/DoctorDto";
import {CreateReceptionsDto} from "../Dto/CreateReceptionsDto";

export class ReceptionsService extends Service{

    constructor() {
        super(AxiosTypes.users);
    }

    public async createReceptions(data: CreateReceptionsDto) {
        if (!data.doctorId || !data.date) {
            return "зачем пусто отправил а?"
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
}