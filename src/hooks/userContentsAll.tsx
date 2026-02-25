import { useCallback, useContext, useState } from "react";
import { useShowMessage } from "./useShowMessage"
import { supabase } from "../lib/supabase";
import { UserContext } from "../providers/UserProvider";

export type ContentType = {
  message_id: string;          // 投稿のID
  created_at: string;  // Supabaseのtimestampは文字列で来ることが多い
  contents: string;        // 投稿本文
  user_id: string;     // ユーザーID
  category: string;    // カテゴリ
  good_count: number;  // いいね数
  user_icon: string;   // アイコンURL
  users: {
    user_name:string;
    avatar_url:string;
    user_id:string;
  } | null
};

export const useContentsAll = () => {
    const showMessage = useShowMessage();
    const [contents,setContents] = useState<ContentType[]>([]);
    const { loginUser } = useContext(UserContext);
    console.log("ログインユーザー:"+loginUser?.user_id+loginUser?.id+loginUser?.user_name)
    const getContents = useCallback(async () => {
        if(!loginUser) return;
        const { data , error } = await supabase
            .from("contents")
            .select('message_id,created_at,contents,category,good_count,user_id,users(user_name,avatar_url,user_id)')
            .order("created_at" , {ascending:false});

        if(error){
            showMessage({title:"取得に失敗しました。",type:"error"})
        }else if(data){
            setContents(data as unknown as ContentType[]);
        }
    },[])

    // const getGoodUp = useCallback(async (id:number,currentCount:number) => {

    //     const {  } = await supabase
    //         .from("contents")
    //         .update({good_count:currentCount+1})
    //         .eq("message_id" , id);
    // },[getContents,showMessage])

 

    return {getContents,contents}
}