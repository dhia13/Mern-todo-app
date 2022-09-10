import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import EmailInput from "./Components/EmailInput"
import PasswordInput from './Components/PasswordInput'
import { isEmpty } from '../Register/Components/InputValidation'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { LoginAction } from '../../utils/Redux/Actions/UserActions'
import { baseUrl } from '../../utils/axios/Axios'
function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const Logged = useSelector((state) => state.UserReducer.Logged)
    useEffect(() => {
        if (Logged) {
            navigate('/tasks')
        }
    }, [Logged, navigate])
    //email input
    const [email, setEmail] = useState('')
    //password input
    const [password, setPassword] = useState('')
    // in case error
    const [error, setError] = useState('')
    const [errorVisibility, setErrorVisibility] = useState(false)
    const loginHandler = async () => {
        setErrorVisibility(false)
        await axios.post(`${baseUrl}/auth/login`, { password, email }, { withCredentials: true }).then((response) => {
            localStorage.setItem('refreshToken', JSON.stringify(response.data.tokens.refreshToken))
            localStorage.setItem('accessToken', JSON.stringify(response.data.tokens.accessToken))
            const tokens = {
                accessToken: response.data.tokens.accessToken,
                refreshToken: response.data.tokens.refreshToken
            }
            dispatch(LoginAction(tokens))
        }).catch((e) => {
            setError('wrong Credentials')
            setErrorVisibility(true)
        })
    }
    const [emptyEmail, setEmptyEmail] = useState(true)
    useEffect(() => {
        if (isEmpty(email)) {
            setEmptyEmail(true)
        } else {
            setEmptyEmail(false)
        }
    }, [email]
    )
    const [emptyPassword, setEmptyPassword] = useState(true)
    useEffect(() => {
        if (isEmpty(password)) {
            setEmptyPassword(true)
        } else {
            setEmptyPassword(false)

        }
    }, [password])
    return (
        <section className="h-screen overflow-hidden flex flex-col">
            <main className='w-screen h-full flex flex-col justify-center items-center bg-gray-100'>
                <div className='w-[500px] h-[700px] flex items-center justify-start flex-col bg-white border border-gray-200 rounded-lg'>
                    <h1 className="font-semibold text-3xl my-4">Create New Account</h1>
                    {/* inputs */}
                    <div className="flex flex-col w-full h-full bg-rd-600 justify-start items-center">
                        <EmailInput value={email} onChange={setEmail} empty={emptyEmail} />
                        <PasswordInput value={password} onChange={setPassword} empty={emptyPassword} />
                        <p>{errorVisibility && error}</p>
                        <div>
                            {/* Submit Button */}
                            <button onClick={loginHandler}
                                className='bg-blue-500 hover:bg-blue-700 w-full h-[40px] rounded-md m-1'>
                                <p className='text-white font-medium'>Login</p>
                            </button>
                            {/* Register instead */}
                            <div className='h-12 w-register-w flex justify-center items-center my-1 bg-white'>
                                <p className='text-sm'>Don't have an account ? </p>
                                <Link to='/register'><p className='px-1 text-xs text-button-color'>Register</p></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </section >

    )
}

export default Login