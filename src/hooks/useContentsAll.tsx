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
  user_icon: string;   // アイコンURL
  good_count: number;  // いいね数
  users: {
    user_name:string;
    avatar_url:string;
    user_id:string;
  } | null
  is_liked : boolean;
  like_count : number;
};

export const useContentsAll = () => {
    const showMessage = useShowMessage();
    const [contents,setContents] = useState<ContentType[]>([]);
    const { loginUser } = useContext(UserContext);
    //投稿一覧表示
    const getContents = useCallback(async () => {
        if(!loginUser) return;
        const { data, error } = await supabase
      .from("contents")
      .select(`
        *,
        users (*),
        likes (user_id) 
      `)
      .order("created_at", { ascending: false });

        if(error){
            showMessage({title:"取得に失敗しました。",type:"error"})
        }else if(data){
            const formattedData: ContentType[] = data.map((content: any) => ({
                ...content,
                // likes 配列の中に自分の ID があるかチェック
                is_liked: content.likes.some((l: any) => l.user_id === loginUser.user_id),
                like_count : content.likes.length
            }));
            setContents(formattedData);
        }
    },[loginUser,showMessage])

    //いいねボタン押下
    const toggleGood = useCallback(async (message_id:string,is_liked:boolean) => {
      if(!loginUser) return;

        //いいね外す
        if(is_liked){
            await supabase
            .from("likes")
            .delete()
            .eq("message_id",message_id)
            .eq("user_id",loginUser?.user_id)
        }else{
        //いいね登録
        await supabase
            .from("likes")
            .insert({
              user_id : loginUser?.user_id,
              message_id : message_id,
            });
        }
      getContents();
    },[getContents,showMessage])

 

    return {getContents,contents,toggleGood}
}