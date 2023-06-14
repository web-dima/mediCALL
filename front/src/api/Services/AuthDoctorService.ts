import {AxiosTypes} from "../axios/types";
import {Service} from "./Service";
import {DoctorLogin} from "../Dto/AuthDto";
import {IResponse} from "../Dto/response/IResponse";
import {IAuthResponse} from "../Dto/response/IAuthResponse";

export class AuthDoctorService extends Service{

    constructor() {
        super(AxiosTypes.doctors);
    }

    public async login(data: DoctorLogin) {
        console.log(data)

        if (!data.password || !data.code) {
            return "пусто"
        }
        const resp = await this.$publicApi.post<IResponse<IAuthResponse>>("login/doctors", data)

        if (resp.data.success) {
            const token = resp.data.data.token.access_token
            localStorage.setItem(`${AxiosTypes.doctors}_token`, token)
            localStorage.setItem(`userId`, resp.data.data.user.id)
            return resp.data.data.user
        } else {
            return resp.data.data
        }
    }

    public async logout() {
        localStorage.removeItem(`${AxiosTypes.doctors}_token`)
        localStorage.removeItem("userId")
    }

    public async me(){
        const resp = await this.$privateApi.post("doctors/me")
        return resp.data
    }
}