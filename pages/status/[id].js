import { Twit } from '@c/Twit'

export default function DevitPage (props) {
  console.log(props)
  const { createdAt, avatar, content, userId, img, userName, likesCount, sharedCount, id } = props
  return (
    <>
      <Twit
        avatar={avatar}
        createdAt={createdAt}
        userId={userId}
        message={content}
        id={id}
        img={img}
        username={userName}
      />
    </>
  )
}

export async function getServerSideProps (context) {
  const { params, res } = context
  const { id } = params
  return fetch(`http://localhost:3000/api/devits/${id}`)
    .then(response => {
      if (response.ok) {
        const props = response.json()
        return { props }
      }
      if (res) {
        res.writeHead(404).end()
      }
    })
}
