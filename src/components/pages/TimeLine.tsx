import { memo, useEffect, type FC } from "react"
import { ContentCard } from "../organisms/ContentCard"
import { useContentsAll } from "../../hooks/userContentsAll"

export const TimeLine:FC = memo(() => {
  const { getContents,contents} = useContentsAll();

  useEffect(() => {
    getContents();
  },[getContents])

  console.log(contents)

  return (
    <>
    {contents.map((content) => (
      <ContentCard key={content.user_id} userIcon={content.user_icon} userName={content.user_name} userId={content.user_id}
      time={content.created_at} category={content.category} goodCount={content.good_count} >{content.contents}</ContentCard>
    ))}
    </>
  )
})