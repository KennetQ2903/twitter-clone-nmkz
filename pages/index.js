import { useState, useEffect } from 'react'
import Head from 'next/head'
import { AppLayout } from 'components/AppLayout'
import Button from 'components/Button'
import { loginWithGithub, onAuth } from 'FirebaseSR/client'
import Image from 'next/image'
import { Avatar } from 'components/Avatar'
export default function Home () {
  const [user, setUser] = useState(undefined)
  useEffect(() => {
    onAuth(setUser)
  }, [user])
  const handleClick = () => {
    loginWithGithub()
      .then(setUser)
      .catch(err => console.log(err))
  }
  return (
    <div>
      <Head>
        <title>NMKZ Twitter</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <AppLayout>
        <section>
          <Image src='/dev.png' alt='logo' width='120px' height='120px' />
          <h1> Developers talking with developers</h1>
          {
            user === null &&
              <Button onClick={handleClick}>
                Login with Github
                <img style={{ marginLeft: '10px' }} src='/github.png' alt='login icon' width='24px' height='24px' />
              </Button>
          }
          {
            user?.avatar &&
              <div>
                <Avatar src={user.avatar} alt={user.username} text={user.username} withText />
              </div>
          }
        </section>
      </AppLayout>

      <style jsx>{`
          section {
            display: grid;
            place-content: center;
            place-items: center;
            height: 100%;
          }
        `}
      </style>
    </div>
  )
}
