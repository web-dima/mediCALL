import { useContext } from 'react';
import {ReceptionArray} from "../pages/Doctor";

export function useReceptions() {
    return useContext(ReceptionArray);
}