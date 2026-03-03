import { useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useShowMessage } from "./useShowMessage"

type Props = {
  roomId : string;
  senderId : string;
  content : string;
}
 
export const useSendMessage = () => {
    const showMessage = useShowMessage();    

    const sendMessage = useCallback(async (props : Props) => {
      const {roomId,senderId,content} = props;
        if(!content.trim()) return
       try{
        const { error: msgError } = await supabase
        .from("messages")
        .insert([
          {
            room_id : roomId,
            sender_id : senderId,
            content : content.trim()
          }
        ])

        if(msgError) console.log("msg");

        const {error : roomError} = await supabase
        .from("rooms")
        .update(
          {
            last_message : content.trim(),
            updated_at : new Date().toISOString()
          }
        )
        .eq("id",roomId)

        if(roomError) console.log("room")
       }catch(error){
        showMessage({ title: "送信・更新エラー", type: "error" });
       }

    },[])

    return {sendMessage}
}