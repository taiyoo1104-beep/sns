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

    const channel = supabase
    .channel(`room_${roomId}`)
    .on(
      "postgres_changes",
      {
        event:"INSERT",
        schema:"public",
        table:"messages",
        filter:`room_id=eq.${roomId}`
      },
      (payload) => {
        const newMessage = payload.new as MessagesType
        setMessages((prev) => [...prev,newMessage])
      }
    )
    .subscribe()

    return() => {
      supabase.removeChannel(channel)
    }
  }, []);

  return { getMessages, messages };
};
