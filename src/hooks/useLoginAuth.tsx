import { useCallback, useContext } from "react";
import { useShowMessage } from "./useShowMessage"
import { supabase } from "../lib/supabase";
import {  useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

type Props = {
    id:string;
    password:string;
}

export const useLoginAuth = () => {
    const showMessage = useShowMessage();
    const navigate = useNavigate();
    const { setLoginUser } = useContext(UserContext);

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
            setLoginUser(data);
            localStorage.setItem("loginUser",JSON.stringify(data))
            navigate("/timeline")
        }
    },[])

    return {login}
}