import { useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { useShowMessage } from "./useShowMessage"

type Props = {
  myId : string;
  targetUserId : string;
}

export const useCreateRoom = () => {
    const navigate = useNavigate();    
    const showMessage = useShowMessage();    

    const createRoom = useCallback(async (props : Props) => {
      const { myId,targetUserId } = props
        const roomId = [myId,targetUserId].sort().join("-");

       try{
        const { data: exitingRoom } = await supabase
        .from("rooms")
        .select("id")
        .eq("id",roomId)
        .single()

        if(exitingRoom){
          navigate(`/message/${roomId}`)
          return
        }

        const {error} = await supabase
        .from("rooms")
        .insert([
          {
            id : roomId,
            user_one : myId,
            user_two : targetUserId
          }
        ])

        if(error) throw error

        navigate(`/message/${roomId}`)
       }catch(error){
        showMessage({ title: "ルームの作成に失敗しました", type: "error" });
       }

    },[navigate])

    return {createRoom}
}