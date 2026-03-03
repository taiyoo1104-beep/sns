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

    const channel = supabase
      .channel("rooms_realtime")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "rooms" },
        (payload) => {
          setRooms((prev) => {
            // 1. まず、更新されたルームが今のリストにあるか探す
            const targetRoom = prev.find((r) => r.id === payload.new.id);

            // 2. リストにない場合（新しいトークが始まった時など）は、
            // 本来は再取得が必要ですが、まずは今のリストをそのまま返す
            if (!targetRoom) return prev;

            // 3. 【重要】古いデータ(targetRoom)からユーザー情報を引き継ぎつつ、
            // payload.new (最新のメッセージや時間) で上書きする
            const updatedRoom: RoomType = {
              ...targetRoom, // ユーザー情報（user_one_info等）を保持
              ...payload.new, // last_message や updated_at を更新
            };

            // 4. 更新されたルームを一番上に持ってくる
            const otherRooms = prev.filter((r) => r.id !== payload.new.id);
            return [updatedRoom, ...otherRooms];
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loginUser, showMessage]);

  return { getRooms, rooms };
};
