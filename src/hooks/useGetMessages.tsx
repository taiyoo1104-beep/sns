import { useCallback, useState } from "react";
import { supabase } from "../lib/supabase";

export type MessagesType = {
  id: number;
  room_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

export const useGetMessages = () => {
  const [messages, setMessages] = useState<MessagesType[]>([]);
  //投稿一覧表示
  const getMessages = useCallback(async (roomId: string) => {
    const { data } = await supabase
      .from("messages")
      .select(`*`)
      .eq("room_id", roomId)
      .order("created_at", { ascending: true });

    if (data) {
      setMessages(data as MessagesType[]);
    }
  }, []);

  return { getMessages, messages };
};
