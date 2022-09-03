import { Avatar } from '@c/Avatar'
import { useTimeAgo } from 'hooks/useTimeAgo'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Twit = ({ avatar, username, message, img, id, userId, createdAt }) => {
  const timeago = useTimeAgo(createdAt)
  const router = useRouter()
  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push('/status/[id]', `/status/${id}`)
  }
  return (
    <>
      <article onClick={handleArticleClick}>
        <div>
          <Avatar src={avatar} alt={username} />
        </div>
        <section>
          <header>
            <strong>{username}</strong>
            <span> - </span>
            <Link href={`/status/${id}`}>
              <a>
                <time>{timeago}</time>
              </a>
            </Link>
          </header>
          <p>{message}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>
        {`
        article{
                display: flex;
                border-bottom: 2px solid #eaf7ff;
                padding: 10px 15px;
            }
            article:hover{
              background: #f5f8fa;
              cursor: pointer;
            }
            div{
                padding-right: 10px;
            }
            p{
                line-height: 1.3125;
                margin: 0;
            }
            a {
              color: #555;
              font-size: 14px;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
            img {
              margin-top: 10px;
                  border-radius: 10px;
                  width: 100%;
                  height: auto;
                }
      `}
      </style>
    </>
  )
}
