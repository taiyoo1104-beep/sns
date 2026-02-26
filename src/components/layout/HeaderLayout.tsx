import { Outlet } from "react-router-dom"
import { Header } from "../organisms/layout/Header"
import { memo, type FC } from "react"
import { useContentsAll } from "../../hooks/useContentsAll"

export const HeaderLayout:FC = memo(() => {
  const {getContents,contents,toggleGood} = useContentsAll()
  return (
    <>
    <Header onRefresh={getContents}/>
    <Outlet context={{getContents,contents,toggleGood}}/>
    </>
  )
})