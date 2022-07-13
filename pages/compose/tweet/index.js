import { AppLayout } from '@c/AppLayout'
import { Avatar } from '@c/Avatar'
import Button from '@c/Button'
import { getDownloadURL } from 'firebase/storage'
import { addDevit, uploadImage } from 'FirebaseSR/client'
import { useUser } from 'hooks/userUser'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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

const DRAG_IMAGES_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

export default function ComposeTweet () {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const [drag, setDrag] = useState(DRAG_IMAGES_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgUrl, setImgUrl] = useState(null)

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (task) {
      task.on('state_changed', state => {
        console.log('COMO?', state)
      }, error => {
        console.log(`Oh no an error ocurred while uploading file, error: ${error}`)
        setDrag(DRAG_IMAGES_STATES.ERROR)
      }, success => {
        setDrag(DRAG_IMAGES_STATES.COMPLETE)
        console.log('YEY FILE UPLOADED SUCCESSFULLY')
        getDownloadURL(task.snapshot.ref).then(setImgUrl)
      })
    }
  }, [task])

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
      userName: user.username,
      img: imgUrl
    })
    if (res) router.push('/home')
    else setStatus(COMPOSE_STATES.ERROR)
  }

  const handleDragEnter = e => {
    e.preventDefault()
    setDrag(DRAG_IMAGES_STATES.DRAG_OVER)
  }

  const handleDragLeave = e => {
    e.preventDefault()
    setDrag(DRAG_IMAGES_STATES.NONE)
  }

  const handleDrop = e => {
    e.preventDefault()
    console.log(e.dataTransfer.files[0])
    setDrag(DRAG_IMAGES_STATES.NONE)
    const file = e.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING
  return (
    <>
      <AppLayout>
        <Head>
          <title>Crear Devit | NMKZ</title>
        </Head>
        <div className='form-container'>
          <section className='avatar-container'>
            {typeof user !== 'undefined' && <Avatar src={user.avatar} alt={user.username} />}
          </section>
          <form onSubmit={handleSubmit}>
            <textarea placeholder='Que hay de nuevo?' value={message} onChange={handleMessage} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop} />
            {imgUrl &&
              <section>
                <button onClick={() => setImgUrl(null)}>X</button>
                <img src={imgUrl} />
              </section>}
            <div>
              <Button disabled={isButtonDisabled}>Devitear</Button>
            </div>
          </form>
        </div>
      </AppLayout>
      <style jsx>
        {`
          div {
              padding: 15px;
          }
          form {
            padding: 2px;
          }
          .form-container {
            display: flex;
            align-items: flex-start;
            width: 100%;
          }
          textarea {
              border: ${drag === DRAG_IMAGES_STATES.DRAG_OVER ? '2px dashed #09f' : '2px dashed transparent'};
              border-radius: 10px;
              padding: 15px;
              min-height:150px;
              resize: none;
              font-size: 21px;
              outline: 0;
              width: 100%;
          }
          img {
            border-radius: 10px;
            width: 100%;
            height: auto;
          }
          section {
            position: relative;
          }
          button {
            position: absolute;
            top: 10px;
            right: 10px;
            border-radius: 999px;
            color: #fff;
            background-color: rgba(0,0,0,0.6);
            width: 32px;
            height: 32px;
            border: 0;
          }
          .avatar-container{
            padding-top: 10px;
          }
        `}
      </style>
    </>
  )
}
