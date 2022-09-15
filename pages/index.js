

import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql } from '@apollo/client'
import { useMutation, useApolloClient } from '@apollo/client'
import { getErrorMessage } from '../lib/form'
import styles from "../styles/UpdateEmployee.module.css";

const SignInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`
function SignIn() {
  const client = useApolloClient()
  const [signIn] = useMutation(SignInMutation)
  const [errorMsg, setErrorMsg] = useState()
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault()

    const emailElement = event.currentTarget.elements.email
    const passwordElement = event.currentTarget.elements.password

    try {
      await client.resetStore()
      const { data } = await signIn({
        variables: {
          email: emailElement.value,
          password: passwordElement.value,
        },
      })
      if (data.signIn.user) {
        await router.push('/Admin')
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
  }

  return (
    <div className={styles.addform}>
      <label className={styles.label}>Sign In</label>
      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}
        <input
         className={styles.input}
          name="email"
          type="email"
          placeholder='Email Name'
          autoComplete="email"
          required
          label="Email"
        /><br/>
        <input
         className={styles.input}
          name="password"
          placeholder='Password'
          type="password"
          autoComplete="password"
          required
          label="Password"
        /><br/>
        <button type="submit">Sign in</button> {' '}
        <button className={styles}>
        <Link href="/signup">
          <a>Sign up</a>
        </Link>
        </button>
      </form>
    </div>
  )
}

export default SignIn