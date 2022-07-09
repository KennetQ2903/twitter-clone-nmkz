import { onAuth } from 'FirebaseSR/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

/* A constant that is used to check the state of the user. */
export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOW: undefined
}
/**
 * "It returns a user state, and when the user state changes, it calls the onAuth function, which sets
 * the user state."
 *
 * The onAuth function is defined in the same file, and it looks like this:
 * @returns The user state.
 */

export const useUser = () => {
  const router = useRouter()
  const [user, setUser] = useState(USER_STATES.NOT_KNOW)

  useEffect(() => {
    onAuth(setUser)
  }, [])

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push('/')
  }, [user])

  return user
}
