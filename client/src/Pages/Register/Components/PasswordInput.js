import checkIcon from '../../../assets/Check.png'
import errIcon from '../../../assets/Error.png'
import { isEmpty } from './InputValidation'
import { useEffect, useState } from 'react'

function PasswordInput(props) {
    const [empty, setEmpty] = useState(true)
    const [Focused, setFocused] = useState(false)
    const OnFocus = () => setFocused(true)
    const OnBlur = () => setFocused(false)
    const [visibility, setVisibility] = useState('password')
    function handleClick(e) {
        e.preventDefault();
        if (visibility === 'password') {
            setVisibility('text')
        }
        else {
            setVisibility('password')
        }
    }
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
                type={visibility}
                className="peer block border bg-input-color border-gray-300 text-xs
                 outline-none rounded-md placeholder-transparent
                w-full h-full pl-4 pt-1"
                name="Password"
                placeholder="Password" />
            <label className={` transition-all absolute text-gray-400 
            ${(!empty) ? 'text-xs top-0 pl-4' : 'text-sm pl-4 pt-1'}`}>
                Password
            </label>
            <div className='absolute right-3'>

                <div className='w-16 h-4 flex justify-end items-center'>
                    <div className='absolute right-9 w-5 h-5'>
                        {(!empty && !Focused) ?
                            (props.valid) ? <img src={checkIcon} alt='success' />
                                : <img src={errIcon} alt='success' /> : <></>}
                    </div>
                    <div className=' bg-green-500 flex justify-end items-center relative'>
                        {(!empty) ? <button onClick={handleClick} className='absolute'>{(visibility === 'password' ? <p className='text-sm'>Show</p> : <p className='text-sm'>Hide</p>)}</button>
                            : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordInput