import {IService} from "./IService";

export interface IDoctor {
    id: number
    fio: string
    photo: string
    code: string
    services: IService
}