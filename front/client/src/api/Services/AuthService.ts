import {AxiosTypes} from "../axios/types";
import {Service} from "./Service";
import {LoginDto, RegisterDto} from "../Dto/AuthDto";
import {IResponse} from "../Dto/response/IResponse";
import {IAuthResponse} from "../Dto/response/IAuthResponse";

export class AuthService extends Service{

    constructor() {
        super(AxiosTypes.users);
    }

    public async login(data: LoginDto) {
        // todo: сделать валидирющий метод или какую нибудь хуйню с формами намутить
        if (!data.password || !data.email) {
            return "пусто"
        }
        const resp = await this.$publicApi.post<IResponse<IAuthResponse>>("login/user", data)

        if (resp.data.success) {
            const token = resp.data.data.token.access_token
            localStorage.setItem(`${AxiosTypes.users}_token`, token)
            localStorage.setItem(`userId`, resp.data.data.user.id)
            return resp.data.data.user
        } else {
            return resp.data.data
        }
    }

    public async register(data: RegisterDto) {
        if (!data.password || !data.email || !data.name) {
            return "пусто"
        }
        const resp = await this.$publicApi.post("register/user", data)
        if (resp.data.data) {
            const token = resp.data.data.token.access_token
            localStorage.setItem(`${AxiosTypes.users}_token`, token)
            localStorage.setItem(`userId`, resp.data.data.user.id)
            return resp.data.data.user
        }
    }

    public async logout() {

    }
}