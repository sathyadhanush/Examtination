import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql, useMutation } from '@apollo/client'
import { getErrorMessage } from '../lib/form'
import styles from "../styles/AddEmployee.module.css";

const SignUpMutation = gql`
  mutation SignUpMutation($fname: String!,$lname: String!,$email: String!, $password: String!) {
    signUp(input: { fname: $fname, lname: $lname, email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`

function SignUp() {
  const [signUp] = useMutation(SignUpMutation)
  const [errorMsg, setErrorMsg] = useState()
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault()
    const fnameElement=event.currentTarget.elements.fname
    const lnameElement=event.currentTarget.elements.lname
    const emailElement = event.currentTarget.elements.email
    const passwordElement = event.currentTarget.elements.password
    console.log(fnameElement.value);
    console.log(emailElement.value);
    try {
      await signUp({
        variables: {
          fname:fnameElement.value,
          lname:lnameElement.value,
          email: emailElement.value,
          password: passwordElement.value,
        },
      })

      router.push('/')
    } catch (error) {
      console.log(error);
      setErrorMsg(getErrorMessage(error))

    }
  }

  return (
    <div className={styles.addform}>
      <label className={styles.label}>Sign Up</label>
      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}
        <input
        className={styles.input}
          name="fname"
          type="text"
          placeholder='First Name'
          autoComplete="fname"
          required
          label="fname"
        />
         <input
        className={styles.input}
          name="lname"
          type="text"
          placeholder='Last Name'
          autoComplete="lname"
          required
          label="lname"
        />
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
        <button type="submit">Sign up</button> {' '}
        <button   className={styles}>
        <Link href="/">
          <a>Sign in</a>
        </Link>
        </button>
       
      </form>
    </div>
  )
}

export default SignUp
