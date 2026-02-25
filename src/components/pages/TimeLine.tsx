import { memo, useEffect, type FC } from "react"
import { ContentCard } from "../organisms/ContentCard"
import { useContentsAll } from "../../hooks/userContentsAll"

export const TimeLine:FC = memo(() => {
  const { getContents,contents} = useContentsAll();

  useEffect(() => {
    getContents();
  },[getContents])

  return (
    <>
    <div style={{paddingBottom:"40px"}}>
    {contents.map((content) => (
      <ContentCard key={content.message_id} users={content.users}
      time={content.created_at} category={content.category} goodCount={content.good_count} >{content.contents}</ContentCard>
    ))}
    </div>
    </>
  )
})