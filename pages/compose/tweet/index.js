import { AppLayout } from '@c/AppLayout'
import Button from '@c/Button'
import { addDevit } from 'FirebaseSR/client'
import { useUser } from 'hooks/userUser'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
/**
 * It's a function that returns a component that renders a form with a textarea and a button.
 * @returns The return statement is returning the JSX code.
 */

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: 3
}

export default function ComposeTweet () {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const user = useUser()

  const handleMessage = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = async (e) => {
    setStatus(COMPOSE_STATES.LOADING)
    e.preventDefault()
    const res = await addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username
    })
    if (res) router.push('/home')
    else setStatus(COMPOSE_STATES.ERROR)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <Head>
          <title>Crear Devit | NMKZ</title>
        </Head>

        <form onSubmit={handleSubmit}>
          <textarea placeholder='Que hay de nuevo?' value={message} onChange={handleMessage} />
          <div>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>
        {`
        div {
            padding: 15px;
        }
                textarea {
                    border: 0;
                    padding: 15px;
                    min-height:150px;
                    resize: none;
                    font-size: 21px;
                    outline: 0;
                    width: 100%;
                }
        `}
      </style>
    </>
  )
}
