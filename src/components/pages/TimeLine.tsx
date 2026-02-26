import { memo, useEffect, type FC } from "react"
import { ContentCard } from "../organisms/ContentCard"
import { useOutletContext } from "react-router-dom"

type ContextType = {
  contents : any[];
  getContents : () => void;
  toggleGood : (message_id:number,is_liked:boolean) => void;
}

export const TimeLine:FC = memo(() => {
  const {contents,getContents,toggleGood} = useOutletContext<ContextType>(); 
  useEffect(() => {
    getContents();
  },[getContents])

  return (
    <>
    <div style={{paddingBottom:"40px"}}>
    {contents.map((content) => (
      <ContentCard key={content.message_id} users={content.users}
      time={content.created_at} category={content.category} goodCount={content.like_count} isLiked={content.is_liked} onClickGood={() => toggleGood(content.message_id,content.is_liked)}>{content.contents}</ContentCard>
    ))}
    </div>
    </>
  )
})