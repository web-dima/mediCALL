import {AxiosTypes} from "../axios/types";
import {Service} from "./Service";

export class UserService extends Service{

    constructor() {
        super(AxiosTypes.users);
    }

    public async me() {
        // console.log(this.$privateApi)
        const resp = await this.$privateApi.post("/me")
        return resp.data
    }

    public async logout() {

        const resp = await this.$privateApi.post("/logout")
        localStorage.removeItem(`${AxiosTypes.users}_token`)
    }

    // public isAdmin() {
    //     return this.me().then((data)=> {
    //         return data.role === "admin"
    //     }).catch(e=> {
    //         return alert(e)
    //     })
    // }

}