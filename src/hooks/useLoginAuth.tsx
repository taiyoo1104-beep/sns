import { useCallback } from "react";
import { useShowMessage } from "./useShowMessage"
import { supabase } from "../lib/supabase";

type Props = {
    id:string;
    password:string;
}

export const useLoginAuth = () => {
    const showMessage = useShowMessage();

    const login = useCallback(async (props : Props) => {
        const {id,password} = props;

        const { data , error } = await supabase
            .from("users")
            .select("*")
            .eq("user_id",id)
            .eq("password",password)
            .single();

        if(error){
            showMessage({title:"IDまたはパスワードが違います",type:"error"})
        }else if(data){
            showMessage({title:"ログインに成功しました",type:"success"})
        }
    },[])

    return {login}
}