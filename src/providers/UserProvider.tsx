import { createContext, type Dispatch, type SetStateAction, useState, type ReactNode } from "react";

// 保持したいユーザー情報の型
export type LoginUser = {
  id: number;
  user_id: string; // 'test' や 'sugar_sato'
  user_name: string;
  avatar_url: string;
};

export type UserContextType = {
  loginUser: LoginUser | null;
  setLoginUser: Dispatch<SetStateAction<LoginUser | null>>;
};

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState<LoginUser | null>(() => {
    const savedUser = localStorage.getItem("loginUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <UserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </UserContext.Provider>
  );
};