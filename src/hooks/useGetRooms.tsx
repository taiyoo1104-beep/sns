import { useCallback, useContext, useState } from "react";
import { useShowMessage } from "./useShowMessage";
import { supabase } from "../lib/supabase";
import { UserContext } from "../providers/UserProvider";

export type RoomType = {
  id: string;
  user_one: string;
  user_two: string;
  last_message: string;
  updated_at: string;
  user_one_info: { user_name: string; avatar_url: string };
  user_two_info: { user_name: string; avatar_url: string };
};

export const useGetRooms = () => {
  const showMessage = useShowMessage();
  const { loginUser } = useContext(UserContext);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  //投稿一覧表示
  const getRooms = useCallback(async () => {
    if (!loginUser) return;
    const { data, error } = await supabase
      .from("rooms")
      .select(
        `
        *,
        user_one_info : users ! user_one(user_name,avatar_url),
        user_two_info : users ! user_two(user_name,avatar_url) 
      `,
      )
      .or(`user_one.eq.${loginUser.user_id},user_two.eq.${loginUser.user_id}`)
      .order("updated_at", { ascending: false });

    if (error) {
      showMessage({ title: "取得に失敗しました。", type: "error" });
    } else if (data) {
      setRooms(data as RoomType[]);
    }
  }, [loginUser, showMessage]);

  return { getRooms, rooms };
};
