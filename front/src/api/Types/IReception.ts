import {IService} from "./IService";
import {IUser} from "./IUser";
import {IDoctor} from "./IDoctor";

export interface IReception {
    id: number
    date: string
    result: null | string
    status: string
    user: IUser
    doctor: IDoctor
}

export type DoctorReceptionType = Omit<IReception, "doctor">