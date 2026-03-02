import { useCallback, useState } from "react";
import { supabase } from "../lib/supabase";

export type UsersType = {
  user_id: string;
  user_name: string;
  avatar_url: string;
};

export const useusersAll = () => {
  const [users, setUsers] = useState<UsersType[]>([]);

  //投稿一覧表示
  const getUsers = useCallback(async (myId: string) => {
    const { data } = await supabase
      .from("users")
      .select(`*`)
      .neq("user_id", myId);

    if (data) {
      setUsers(data);
    }
  }, []);

  return { users, getUsers };
};
