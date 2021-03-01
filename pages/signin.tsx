import Head from 'next/head'
import Link from 'next/link'
import {useContext, useState} from 'react'
import {AuthContext} from '../app/contexts/auth'
import {useRouter} from 'next/router'
import axios from 'axios'
import {useCookies} from 'react-cookie'

const SignIn = (): JSX.Element => {
    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const router = useRouter()
    const userContext = useContext(AuthContext)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookie, setCookie] = useCookies(['session'])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setState((previousState: typeof state) => {
            return {...previousState, [event.target.name]: event.target.value}
        })
    }
    const handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault()
        axios
            .post('/user/login', {user: state})
            .then(res => {
                if (res.status === 200) {
                    userContext?.login(res.data.user)
                    setCookie('session', JSON.stringify(res.data.token), {
                        path: '/',
                        // ? expiration date
                        //maxAge: 3600, // Expires after 1hr
                        sameSite: true,
                        //httpOnly: true,
                        //secure: true,
                    })
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
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email:</label>
                <br />
                <input
                    type='email'
                    id='email'
                    name='email'
                    size={30}
                    placeholder='please enter your email'
                    value={state.email}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor='password'>Password:</label>
                <br />
                <input
                    type='password'
                    id='password'
                    name='password'
                    size={30}
                    placeholder='please enter your password'
                    value={state.password}
                    onChange={handleChange}
                />
                <br />
                <input type='submit' value='SignIn' />
            </form>
            <Link href='/signup'>
                <a>Do not have an account? SignUp</a>
            </Link>
        </div>
    )
}

export default SignIn
