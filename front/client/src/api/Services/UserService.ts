import {AxiosTypes} from "../axios/types";
import {Service} from "./Service";

export class UserService extends Service{

    constructor() {
        super(AxiosTypes.users);
    }

    public async me() {

        const resp = await this.$privateApi.post("/me")

        return resp.data
    }

    public async logout() {

        const resp = await this.$privateApi.post("/logout")
        localStorage.removeItem("userId")
    }

    // public isAdmin() {
    //     return this.me().then((data)=> {
    //         return data.role === "admin"
    //     }).catch(e=> {
    //         return alert(e)
    //     })
    // }

}