
import {AxiosTypes} from "../axios/types";
import {Service} from "./Service";
import {CreateDoctorDto} from "../Dto/DoctorDto";
import {CreateService} from "../Dto/ServiceDto";

export class ServiceService extends Service{
    constructor() {
        super(AxiosTypes.users);
    }

    public async getServices() {
        const result = await this.$publicApi.get("/service")
        return result.data
    }

    public async createService(data: CreateService) {
        if (!data.name || !data.afterGP || data.img === undefined) {
            return "зачем пусто отправил а?"
        }
        console.log(data.img.current.files[0])
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("after_GP", data.afterGP)
        formData.append("img", data.img.current.files[0])

        const resp = await this.$privateApi.post("/service", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        // console.log(data)
        return resp.data.success ? "good" : "sos"
    }
}