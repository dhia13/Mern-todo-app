import checkIcon from '../../../assets/Check.png'
import errIcon from '../../../assets/Error.png'
import { isEmpty, isEmail } from './InputValidation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../../utils/axios/Axios'

function EmailInput(props) {
    const [emptyEmail, setEmptyEmail] = useState(true)
    const [emailFocused, setEmailFocused] = useState(false)
    const emailOnFocus = () => setEmailFocused(true)
    const emailOnBlur = () => setEmailFocused(false)
    useEffect(() => {
        if (isEmpty(props.value)) {
            setEmptyEmail(true)
        } else {
            setEmptyEmail(false)
            if (!emailFocused) {
                if (isEmail(props.value)) {
                    axios.post(`${baseUrl}/auth/checkEmailAvailability`, { email: props.value }
                    )
                        .then(function (response) {
                            props.setValid(true)
                        })
                        .catch(function (error) {
                            props.setValid(false)
                        });
                }
            }
            else { props.setValid(false) }
        }
    }, [emailFocused, props]
    )
    return (
        <div className='flex justify-center items-start flex-col relative w-[300px] h-[45px] my-6'>
            <input
                autoComplete='off'
                onFocus={emailOnFocus} onBlur={emailOnBlur}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                type="text"
                className="peer block border bg-input-color border-gray-300 text-xs
                 outline-none rounded-md placeholder-transparent
                w-full h-full pl-4 pt-1"
                name="email"
                placeholder="Email" />
            <label className={` transition-all absolute text-gray-400 
            ${(!emptyEmail) ? 'text-xs top-0 pl-4' : 'text-sm pl-4 pt-1'}`}>
                Email
            </label>
            <div className='absolute right-3 w-5'>
                {(!emptyEmail && !emailFocused) ?
                    (props.valid) ? <img src={checkIcon} alt='success' /> : <img src={errIcon} alt='success' /> : <></>}
            </div>
        </div>
    )
}

export default EmailInput