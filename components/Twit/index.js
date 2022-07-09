import { Avatar } from '@c/Avatar'

export const Twit = ({ avatar, username, message, id, userId, createdAt }) => {
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
            <date>{createdAt}</date>
          </header>
          <p>{message}</p>
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
            date{
              color: #555;
              font-size: 14px;
            }
      `}
      </style>
    </>
  )
}
