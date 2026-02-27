import { useCallback } from "react";
import { useShowMessage } from "./useShowMessage"
import { supabase } from "../lib/supabase";

type Props = {
    // userIcon:string;
    userName:string;
    userId:string;
    password:string;
}

export const userAddUser = () => {
    const showMessage = useShowMessage();    
    
    const Add = useCallback(async (props : Props) => {
        const {userName,userId,password} = props;

        //入力チェック        
        if((userName.length < 6 && userName.length <= 12)|| (userId.length < 6 && userId.length <= 12)){
          showMessage({ title: "ユーザー名またはユーザーIDは６文字以上１２字以下にしてください", type: "error" });
          return false;
        }

        if(password.length < 8){
          showMessage({ title: "パスワードは８文字以上にしてください", type: "error" });
          return false;
        }

        const {error} = await supabase
            .from("users")
            .insert({
              user_name : userName,
              user_id : userId,
              password : password
            })
        if(error){
          if(error.code === "23505"){
            showMessage({ title: "そのユーザーIDは既に使用されています", type: "error" });
          }else{
            showMessage({ title: "登録に失敗しました。再度試してください", type: "error" });
          }
          return false
        }
        showMessage({title:"登録完了しました！",type:"success"})
        return true
    },[showMessage])

    return {Add}
}