/* eslint-disable jsx-a11y/no-onchange */
import {useState, useRef} from 'react'

import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {GetServerSideProps, InferGetServerSidePropsType} from 'next'

import {useAuthDispatch} from '../app/contexts/auth'
import axios from 'axios'
import {useCookies} from 'react-cookie'

const SignUp = ({
    technologies,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        githubURL: '',
        gitlabURL: '',
        bitbucketURL: '',
        linkedinURL: '',
        languages: [],
        technologies: [],
        bio: '',
    })
    const inputEl = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const dispatch = useAuthDispatch()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookie, setCookie] = useCookies(['session'])
    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | any
        >
    ): void => {
        setState((previousState: typeof state) => {
            if (
                event.target.name === 'languages' ||
                event.target.name === 'technologies'
            ) {
                //* languages and technologies field must respect the Array format
                const value = Array.from(
                    // TODO fix type definition
                    event.target.selectedOptions,
                    (option: Record<string, unknown>) => option.value
                )
                return {
                    ...previousState,
                    [event.target.name]: value,
                }
            } else {
                return {
                    ...previousState,
                    [event.target.name]: event.target.value,
                }
            }
        })
    }
    const handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault()
        axios
            .post('/user/register', {user: state})
            .then(res => {
                if (res.status === 201) {
                    dispatch({type: 'login', payload: res.data.user})
                    setCookie('session', res.data.token, {
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
                <title>SignUp</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <br />
                <input
                    type='text'
                    id='username'
                    name='username'
                    required={true}
                    size={30}
                    minLength={3}
                    maxLength={20}
                    placeholder='please enter your username'
                    value={state.username}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor='email'>Email:</label>
                <br />
                <input
                    type='email'
                    id='email'
                    name='email'
                    required={true}
                    size={30}
                    placeholder='address@email.domain'
                    title=''
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
                    required={true}
                    size={30}
                    pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'
                    ref={inputEl}
                    placeholder='min. 8 char, mix letters and numbers'
                    title='minimum 8 characters, mix of letters and numbers'
                    value={state.password}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor='confirmPassword'>Confirm Password:</label>
                <br />
                <input
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    required={true}
                    size={30}
                    placeholder='please confirm your password'
                    title='passwords must match'
                    value={state.confirmPassword}
                    //* watch password value changes
                    pattern={`^${inputEl?.current?.value}$`}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor='githubURL'>GitHub:</label>
                <br />
                <input
                    type='text'
                    id='githubURL'
                    name='githubURL'
                    size={30}
                    placeholder='your GitHub username here'
                    value={state.githubURL}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor='gitlabURL'>GitLab:</label>
                <br />
                <input
                    type='text'
                    id='gitlabURL'
                    name='gitlabURL'
                    size={30}
                    placeholder='your GitLab username here'
                    value={state.gitlabURL}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor='bitbucketURL'>BitBucket:</label>
                <br />
                <input
                    type='text'
                    id='bitbucketURL'
                    name='bitbucketURL'
                    size={30}
                    placeholder='your BitBucket username here'
                    value={state.bitbucketURL}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor='linkedinURL'>LinkedIn:</label>
                <br />
                <input
                    type='text'
                    id='linkedinURL'
                    name='linkedinURL'
                    size={30}
                    placeholder='your LinkedIn username here'
                    value={state.linkedinURL}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor='languages'>Languages (use ctrl key):</label>
                <br />
                <select
                    id='languages'
                    name='languages'
                    required={true}
                    multiple={true}
                    size={4}
                    value={state.languages}
                    onChange={handleChange}
                >
                    <option value='english'>English</option>
                    <option value='spanish'>Spanish</option>
                    <option value='french'>French</option>
                    <option value='italian'>Italian</option>
                    <option value='mandarin'>Mandarin</option>
                    <option value='hindi'>Hindi</option>
                    <option value='arabic'>Arabic</option>
                    <option value='bengali'>Bengali</option>
                    <option value='russian'>Russian</option>
                    <option value='portuguese'>Portuguese</option>
                    <option value='indonesian'>Indonesian</option>
                </select>
                <br />
                <label htmlFor='technologies'>
                    Technologies (use ctrl key):
                </label>
                <br />
                <select
                    id='technologies'
                    name='technologies'
                    required={true}
                    multiple={true}
                    size={4}
                    value={state.technologies}
                    onChange={handleChange}
                >
                    {technologies.map(
                        (technology: {
                            _id: string
                            name: string
                        }): JSX.Element => (
                            <option
                                key={technology._id}
                                value={technology.name}
                            >
                                {technology.name}
                            </option>
                        )
                    )}
                </select>
                <br />
                <label htmlFor='bio'>Biography:</label>
                <br />
                <textarea
                    id='bio'
                    name='bio'
                    cols={30}
                    rows={10}
                    maxLength={200}
                    placeholder='Tell us your story'
                    spellCheck={true}
                    wrap='hard'
                    value={state.bio}
                    onChange={handleChange}
                />
                <br />
                <input type='submit' value='SignUp' />
            </form>
            <Link href='/signin'>
                <a>Already have an account? SignIn</a>
            </Link>
        </div>
    )
}

export default SignUp

export const getServerSideProps: GetServerSideProps = async () => {
    const {
        data: {technologies},
    } = await axios.get('/technology')

    return {
        props: {
            technologies,
        },
    }
}
