import { memo, useEffect, type FC } from "react"
import { ContentCard } from "../organisms/ContentCard"
import { useContentsAll } from "../../hooks/useContentsAll"

export const TimeLine:FC = memo(() => {
  const { getContents,contents,toggleGood} = useContentsAll();

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