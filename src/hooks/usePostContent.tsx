import { useCallback, useContext } from "react";
import { useShowMessage } from "./useShowMessage"
import { supabase } from "../lib/supabase";
import { UserContext } from "../providers/UserProvider";

type Props = {
    content:string;
    category:string;
}

export const usePostContent = () => {
    const showMessage = useShowMessage();
    const { loginUser } = useContext(UserContext);

    
    
    const post = useCallback(async (props : Props) => {
        const {content,category} = props;
        if (!loginUser) {
            showMessage({ title: "ログインが必要です", type: "error" });
            return;
        }
        const { error } = await supabase
            .from("contents")
            .insert({
              contents : content,
              category : category,
              user_id : loginUser.id
            })
            
        if(error){
            showMessage({title:"投稿に失敗しました",type:"error"})
        }else{
            showMessage({title:"投稿しました！",type:"success"})
        }
    },[showMessage,loginUser])

    return {post}
}