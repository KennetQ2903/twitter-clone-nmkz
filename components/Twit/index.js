import { Avatar } from '@c/Avatar'
import { useTimeAgo } from 'hooks/useTimeAgo'

export const Twit = ({ avatar, username, message, img, id, userId, createdAt }) => {
  const timeago = useTimeAgo(createdAt)
  return (
    <>
      <article>
        <div>
          <Avatar src={avatar} alt={username} />
        </div>
        <section>
          <header>
            <strong>{username}</strong>
            <span> - </span>
            <time>{timeago}</time>
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
            div{
                padding-right: 10px;
            }
            p{
                line-height: 1.3125;
                margin: 0;
            }
            time {
              color: #555;
              font-size: 14px;
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
