import {UserRole} from "./UserRole";

export interface IUser {
    id:string
    name: string
    role: UserRole
}