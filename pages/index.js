import { useEffect } from 'react'
import Head from 'next/head'
import Button from 'components/Button'
import { loginWithGithub } from 'FirebaseSR/client'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Spinner } from '@c/Spinner'
import { USER_STATES, useUser } from 'hooks/userUser'

export default function Home () {
  const router = useRouter()
  const user = useUser()

  const handleClick = () => {
    loginWithGithub()
      .catch(err => console.error(err))
  }
  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  return (
    <div>
      <Head>
        <title>NMKZ Twitter</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section>
        <Image src='/dev.png' alt='logo' width='120px' height='120px' />
        <h1> Developers talking with developers</h1>
        {
            user === USER_STATES.NOT_LOGGED &&
              <Button onClick={handleClick}>
                Login with Github
                <img style={{ marginLeft: '10px' }} src='/github.png' alt='login icon' width='24px' height='24px' />
              </Button>
          }
        {
            user === USER_STATES.NOT_KNOW && <Spinner />
          }
      </section>

      <style jsx>{`
          section {
            display: grid;
            margin-top: 10px;
            place-content: center;
            place-items: center;
            height: 100%;
          }
        `}
      </style>
    </div>
  )
}
