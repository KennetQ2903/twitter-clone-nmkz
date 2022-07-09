import { Twit } from '@c/Twit'
import { AppLayout } from 'components/AppLayout'
import { fetchLatestDevits } from 'FirebaseSR/client'
import { useUser } from 'hooks/userUser'
import { useEffect, useState } from 'react'

export default function HomePage () {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  /* Fetching the data from the API and setting the state of the timeline. */
  useEffect(() => {
    user && fetchLatestDevits()
      .then(setTimeline)
  }, [user])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {
            timeline.map(twit => (
              <Twit
                avatar={twit.avatar}
                createdAt={twit.createdAt}
                id={twit.id}
                key={twit.id}
                message={twit.content}
                userId={twit.userId}
                username={twit.userName}
              />
            ))
          }
        </section>
        <nav />

      </AppLayout>
      <style jsx>
        {`
            header {
                height: 49px;
                background-color: #ffffff;
                top: 0;
                position: sticky;
                width: 100%;
                display: flex;
                align-items: center;
            }
            h2 {
              font-size: 21px;
              font-weight: 800;
              padding-left: 15px;
            }
            nav {
              background-color: #fff;
                height: 49px;
                bottom: 0px;
                border-top: 1px solid #ccc;
                position: sticky;
                width: 100%;
            }
        `}
      </style>
    </>
  )
}
