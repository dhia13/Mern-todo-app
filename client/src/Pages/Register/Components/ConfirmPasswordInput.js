import checkIcon from '../../../assets/Check.png'
import errIcon from '../../../assets/Error.png'
import { isEmpty } from './InputValidation'
import { useEffect, useState } from 'react'

function PasswordInput(props) {
    const [empty, setEmpty] = useState(true)
    const [Focused, setFocused] = useState(false)
    const OnFocus = () => setFocused(true)
    const OnBlur = () => setFocused(false)
    useEffect(() => {
        if (isEmpty(props.value)) {
            setEmpty(true)
        } else {
            setEmpty(false)
            if (!Focused) {
                if (props.value.length > 6) {
                    props.setValid(true)
                }
                else {
                    props.setValid(false)
                }
            }
        }
    }, [Focused, props])
    return (
        <div className='flex justify-center items-start flex-col relative w-[300px] h-[45px] my-6'>
            <input
                autoComplete='off'
                onFocus={OnFocus} onBlur={OnBlur}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                type='password'
                className="peer block border bg-input-color border-gray-300 text-xs
                 outline-none rounded-md placeholder-transparent
                w-full h-full pl-4 pt-1"
                name="Password"
                placeholder="Confirm Password" />
            <label className={` transition-all absolute text-gray-400 
            ${(!empty) ? 'text-xs top-0 pl-4' : 'text-sm pl-4 pt-1'}`}>
                Confirm Password
            </label>
            <div className='absolute right-3'>

                <div className='w-16 h-4 flex justify-end items-center'>
                    <div className='absolute w-5 h-5'>
                        {(!empty && !Focused) ?
                            (props.valid) ? <img src={checkIcon} alt='success' />
                                : <img src={errIcon} alt='success' /> : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordInput