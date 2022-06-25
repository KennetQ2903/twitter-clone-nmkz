import { Twit } from '@c/Twit'
import { AppLayout } from 'components/AppLayout'
import { useEffect, useState } from 'react'

export default function HomePage () {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/statuses/home_timeline')
      .then(res => res.json())
      .then(setTimeline)
  }, [])
  return (
    <>
      <AppLayout>
        <header>
          header
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
        <nav>
          nav
        </nav>

      </AppLayout>
      <style jsx>
        {`
            section {
                padding-top: 49px;
            }
            
            header {
                height: 49px;
                border-bottom: 1px solid #ccc;
                top: 0;
                position: sticky;
                width: 100%;
                display: flex;
                align-items: center;
            }
            nav {
                height: 49px;
                bottom: 0px;
                border-top: 1px solid #ccc;
                position: absolute;
                width: 100%;
                display: flex;
                align-items: center;
            }
        `}
      </style>
    </>
  )
}
