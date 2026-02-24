import { FileQuestion } from "lucide-react"
import { memo, type FC } from "react"
import { Link } from "react-router-dom";

export const Page404:FC = memo(() => {
  return (
    <>
<div style={{ textAlign: 'center', marginTop: '50px' }}>
      <FileQuestion size={100} color="#ccc" />
      <h2>ページが見つかりません</h2>
      <p>お探しのページは削除されたか、URLが間違っている可能性があります。</p>
      <Link to="/login" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
        ログインに戻る
      </Link>
    </div>  </>
  )
})