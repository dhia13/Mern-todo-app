import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import EmailInput from "./Components/EmailInput"
import NameInput from './Components/NameInput'
import PasswordInput from './Components/PasswordInput'
import ConfirmPasswordInput from './Components/ConfirmPasswordInput'
import axios from "axios"
import { LoginAction } from "../../utils/Redux/Actions/UserActions"
import { useDispatch, useSelector } from "react-redux"
import { baseUrl } from '../../utils/axios/Axios'
function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const Logged = useSelector((state) => state.UserReducer.Logged)
    useEffect(() => {
        if (Logged) {
            navigate('/tasks')
        }
    }, [Logged, navigate])
    //email input
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    //name input
    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)
    //password input
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    // Confirm Password Input
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validconfirmPassword, setValidconfirmPassword] = useState(false)
    const [submitButton, setSubmitButton] = useState(false)
    useEffect(() => {
        if (validName && validEmail && validPassword && validconfirmPassword && password === confirmPassword) {
            setSubmitButton(true)
        }
    }, [confirmPassword, password, validEmail, validName, validPassword, validconfirmPassword])
    const Register = async () => {
        if (submitButton) {
            await axios.post(`${baseUrl}/auth/register`, { name, password, email }, { withCredentials: true }).then((response) => {
                localStorage.setItem('refreshToken', JSON.stringify(response.data.tokens.refreshToken))
                localStorage.setItem('accessToken', JSON.stringify(response.data.tokens.accessToken))
                const tokens = {
                    accessToken: response.data.tokens.accessToken,
                    refreshToken: response.data.tokens.refreshToken
                }
                dispatch(LoginAction(tokens))
            })
        }
    }
    return (
        <section className="h-screen overflow-hidden flex flex-col">
            <main className='w-screen h-full flex flex-col justify-center items-center bg-gray-100'>
                <div className='w-[500px] h-[700px] flex items-center justify-start flex-col bg-white border border-gray-200 rounded-lg'>
                    <h1 className="font-semibold text-3xl my-4">Create New Account</h1>
                    {/* inputs */}
                    <div className="flex flex-col w-full h-full bg-rd-600 justify-start items-center">
                        <EmailInput onChange={setEmail} value={email} valid={validEmail} setValid={setValidEmail} />
                        <NameInput onChange={setName} value={name} valid={validName} setValid={setValidName} />
                        <PasswordInput onChange={setPassword} value={password} valid={validPassword} setValid={setValidPassword} />
                        <ConfirmPasswordInput onChange={setConfirmPassword} value={confirmPassword} valid={validconfirmPassword} setValid={setValidconfirmPassword} />
                        <div>
                            {/* Submit Button */}
                            <button onClick={Register}
                                className={`${submitButton ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300'} w-full h-[40px] 
                        rounded-md m-1 `}
                                disabled={submitButton ? false : true}>
                                <p className={`${submitButton ? 'text-white' : 'text-black'} font-medium`}>Register</p>
                            </button>
                            {/* login instead */}
                            <div className='h-12 w-register-w flex justify-center items-center my-1 bg-white'>
                                <p className='text-sm'>Already registered ? </p>
                                <Link to='/login'><p className='px-1 text-xs text-button-color'>Log in</p></Link>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </section >

    )
}

export default Register