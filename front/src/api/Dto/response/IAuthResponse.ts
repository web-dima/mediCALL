import {IUser} from "../../Types/IUser";
import {IAuthToken} from "../../Types/IAuthToken";

export interface IAuthResponse {
    user: IUser
    token: IAuthToken
}