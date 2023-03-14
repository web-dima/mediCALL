import {AxiosTypes} from "../axios/types";
import {Service} from "./Service";
import {CreateDoctorDto} from "../Dto/DoctorDto";

export class DoctorsService extends Service{

    constructor() {
        super(AxiosTypes.users);
    }

    public async createDoctor(data: CreateDoctorDto) {
        if (!data.service_id || !data.fio || data.img === undefined || !data.code || !data.password) {
            return "зачем пусто отправил а?"
        }
        console.log(data.img.current.files[0])
        const formData = new FormData()
        formData.append("service_id", data.service_id)
        formData.append("fio", data.fio)
        formData.append("img", data.img.current.files[0])
        formData.append("code", data.code)
        formData.append("password", data.password)

        const resp = await this.$privateApi.post("/doctors", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        return resp.data.data.success
    }

    public async getDoctors() {
        const docs = await this.$publicApi.get("/doctors")
        return docs.data
    }

}