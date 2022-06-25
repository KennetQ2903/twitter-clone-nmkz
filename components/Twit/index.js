import { Avatar } from '@c/Avatar'

export const Twit = ({ avatar, username, message, id }) => {
  return (
    <>
      <article>
        <div>
          <Avatar src={avatar} alt={username} />
        </div>
        <section>
          <strong>{username}</strong>
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
      `}
      </style>
    </>
  )
}
