import Head from 'next/head'
import {useContext, useState} from 'react'
import {AuthContext} from '../app/contexts/auth'
import {useRouter} from 'next/router'
import axios from 'axios'

const SignIn = (): JSX.Element => {
    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const router = useRouter()
    const userContext = useContext(AuthContext)
    const hanldeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setState((previousState: typeof state) => {
            return {...previousState, [event.target.name]: event.target.value}
        })
    }
    const handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault()
        axios
            .post('http://localhost:8080/user/login', {user: state})
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    userContext?.login(res.data.user)
                    router.push('/')
                } else {
                    console.log(res.data.error)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <Head>
                <title>SignIn</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <form>
                <label htmlFor='email'>Email:</label>
                <br />
                <input
                    type='text'
                    id='email'
                    name='email'
                    placeholder='please enter your email'
                    value={state.email}
                    onChange={hanldeChange}
                />
                <br />
                <label htmlFor='password'>Password:</label>
                <br />
                <input
                    type='password'
                    id='password'
                    name='password'
                    placeholder='please enter your password'
                    value={state.password}
                    onChange={hanldeChange}
                />
                <br />
                <input type='submit' value='SignIn' onClick={handleSubmit} />
            </form>
        </div>
    )
}

export default SignIn
