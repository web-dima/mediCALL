import { useContext } from 'react';
import {DoctorsArray} from "../pages/Admin";

export function useDoctors() {
    return useContext(DoctorsArray);
}