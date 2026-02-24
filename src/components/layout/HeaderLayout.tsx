import { Outlet } from "react-router-dom"
import { Header } from "../organisms/layout/Header"
import { memo, type FC } from "react"

export const HeaderLayout:FC = memo(() => {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
})