import { Twit } from '@c/Twit'
import { AppLayout } from 'components/AppLayout'
import { useEffect, useState } from 'react'

export default function HomePage () {
  const [timeline, setTimeline] = useState([])
  /* Fetching the data from the API and setting the state of the timeline. */

  useEffect(() => {
    fetch('http://localhost:3000/api/statuses/home_timeline')
      .then(res => res.json())
      .then(setTimeline)
  }, [])
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
                id={twit.id}
                key={twit.id}
                message={twit.message}
                username={twit.username}
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
