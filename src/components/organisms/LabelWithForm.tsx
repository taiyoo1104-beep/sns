import { Input} from "@chakra-ui/react"
import type { ChangeEvent, FC } from "react";

type Porops = {
    children:string;
    placeHolder? : string;
    type? : string;
    onChange : (e : ChangeEvent<HTMLInputElement>) => void;
    value:string;
}
export const LabelWithForm:FC<Porops> = (props) => {
    const { children , placeHolder,type,onChange,value} = props;
    return (
        <>
        <label>{children}
        <Input type = {type} placeholder={placeHolder} marginTop="10px" onChange={onChange} value={value}/>
        </label>
        </>
    )
}