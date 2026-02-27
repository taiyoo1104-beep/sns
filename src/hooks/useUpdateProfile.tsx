import { useCallback } from "react";
import { useShowMessage } from "./useShowMessage"
import { supabase } from "../lib/supabase";

type Props = {
    userName:string;
    currentUserId : string;
    newUserId:string;
    currentPassword:string;
    newPassword:string;
}

export const useUpdateProfile = () => {
    const showMessage = useShowMessage();    
    
    const update = useCallback(async (props : Props) => {
        const {userName,currentUserId,newUserId,currentPassword,newPassword} = props;


        //入力チェック        
        if((userName.length < 6 && userName.length <= 12)|| (newUserId.length < 6 && newUserId.length <= 12)){
          showMessage({ title: "ユーザー名またはユーザーIDは６文字以上１２字以下にしてください", type: "error" });
          return false;
        }

        if(newPassword.length > 0 && newPassword.length < 8){
          showMessage({ title: "パスワードは８文字以上にしてください", type: "error" });
          return false;
        }

        const updatePassword = newPassword.length === 0 ? currentPassword : newPassword

        const {data:user,error:authError} = await supabase
        .from("users")
        .select("*")
        .eq("password",currentPassword)
        .eq("user_id",currentUserId)
        .maybeSingle()

        if(!user || authError){
          showMessage({ title: "現在のパスワードが正しくありません", type: "error" });
          return false;
        }
        



        //更新処理
        const {error} = await supabase
            .from("users")
            .update({
              user_name : userName,
              user_id : newUserId,
              password : updatePassword
            })
            .eq("user_id",currentUserId)


        if(error){
          if(error.code === "23505"){
            showMessage({ title: "そのユーザーIDは既に使用されています", type: "error" });
            return false
          }else{
            showMessage({ title: "登録に失敗しました。再度試してください", type: "error" });
            return false
          }
        }
        showMessage({title:"更新完了しました！",type:"success"})
        return true
    },[showMessage])

    return {update}
}