import type {FC } from "react";
import {memo} from "react"
import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { TimeLine } from "../pages/TimeLine";
import { Profile } from "../pages/Profile";
import { Message } from "../pages/Message";
import { Setting } from "../pages/Setting";
import { HeaderLayout } from "../layout/HeaderLayout";
import { Page404 } from "../pages/Page404";

export const Router:FC = memo(() => {
  return (
    <>
    <Routes>
    {/*ログインページ*/}
    <Route path="/login" element={<Login/>}/>

    <Route element={<HeaderLayout/>}>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/timeline" element={<TimeLine />}/>
    <Route path="/newpost" element={<Login/>}/>
    <Route path="/message" element={<Message/>}/>
    <Route path="/setting" element={<Setting/>}/>
    </Route>
    <Route path="*" element={<Page404/>}/>

    </Routes>

    </>
  )
})