import { useCallback, useState } from "react";
import { useShowMessage } from "./useShowMessage"
import { supabase } from "../lib/supabase";

export type ContentType = {
  id: string;          // 投稿のID
  created_at: string;  // Supabaseのtimestampは文字列で来ることが多い
  contents: string;        // 投稿本文
  user_name: string;   // ユーザー名
  user_id: string;     // ユーザーID
  category: string;    // カテゴリ
  good_count: number;  // いいね数
  user_icon: string;   // アイコンURL
};

export const useContentsAll = () => {
    const showMessage = useShowMessage();
    const [contents,setContents] = useState<ContentType[]>([]);

    const getContents = useCallback(async () => {

        const { data , error } = await supabase
            .from("contents")
            .select("*")
            .order("created_at" , {ascending:false});

        if(error){
            showMessage({title:"取得に失敗しました。",type:"error"})
        }else if(data){
            setContents(data);
        }
    },[])

    return {getContents,contents}
}