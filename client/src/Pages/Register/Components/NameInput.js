import checkIcon from '../../../assets/Check.png'
import errIcon from '../../../assets/Error.png'
import { isEmpty } from './InputValidation'
import { useEffect, useState } from 'react'

function Input(props) {
    const [emptyName, setEmptyName] = useState(true)
    const [nameFocused, setNameFocused] = useState(false)
    const nameOnFocus = () => setNameFocused(true)
    const nameOnBlur = () => setNameFocused(false)
    useEffect(() => {
        if (isEmpty(props.value)) {
            setEmptyName(true)
            props.setValid(false)
        } else {
            setEmptyName(false)
            if (!nameFocused) {
                props.setValid(true)
            }
        }
    }, [nameFocused, props]
    )
    return (
        <div className='flex justify-center items-start flex-col relative w-[300px] h-[45px] my-6'>
            <input
                autoComplete='off'
                onFocus={nameOnFocus} onBlur={nameOnBlur}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                type="text"
                className="peer block border bg-input-color border-gray-300 text-xs
                 outline-none rounded-md placeholder-transparent
                w-full h-full pl-4 pt-1"
                name="username"
                placeholder="Name" />
            <label className={` transition-all absolute text-gray-400 
            ${(!emptyName) ? 'text-xs top-0 pl-4' : 'text-sm pl-4 pt-1'}`}>
                Name
            </label>
            <div className='absolute right-3 w-5'>
                {(!emptyName && !nameFocused) ?
                    (props.valid) ? <img src={checkIcon} alt='success' /> : <img src={errIcon} alt='success' /> : <></>}
            </div>
        </div>
    )
}

export default Input