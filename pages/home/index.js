import { Twit } from '@c/Twit'
import { AppLayout } from 'components/AppLayout'
import { fetchLatestDevits } from 'FirebaseSR/client'
import { useUser } from 'hooks/userUser'
import CreateIcon from 'Icons/createIcon'
import HomeIcon from 'Icons/Home'
import SearchIcon from 'Icons/SearchIcon'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { colors } from 'styles/theme'

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
        <Head>
          <title>Home | NMKZ</title>
        </Head>
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
        <nav>
          <Link href='/home'>
            <a>
              <HomeIcon stroke='#09f' height={32} width={32} />
            </a>
          </Link>
          <Link href='/'>
            <a>
              <SearchIcon stroke='#09f' height={32} width={32} />
            </a>
          </Link>
          <Link href='/compose/tweet'>
            <a>
              <CreateIcon stroke='#09f' height={32} width={32} />
            </a>
          </Link>
        </nav>

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
              display: flex;
              background-color: #fff;
              padding: 5px;
                height: 49px;
                bottom: 0px;
                border-top: 1px solid #ccc;
                position: sticky;
                width: 100%;
            }
            nav a{
              align-items: center;
              display: flex;
              flex: 1 1 auto;
              height: 100%;
              justify-content: center;
            }
            nav a:hover{
              background: radial-gradient(#0099ff22 15%, transparent 16%);
              background-size: 180px 180px;
              background-position: center;
            }
            nav a:hover > :global(svg){
              stroke: ${colors.primary}
            }
            section {
              flex: 1
            }
        `}
      </style>
    </>
  )
}
