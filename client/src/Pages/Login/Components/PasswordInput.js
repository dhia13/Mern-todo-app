import { useState } from 'react'

function PasswordInput(props) {
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

    return (
        <div className='flex justify-center items-start flex-col relative w-[300px] h-[45px] my-6'>
            <input
                autoComplete='off'
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                type={visibility}
                className="peer block border bg-input-color border-gray-300 text-xs
                 outline-none rounded-md placeholder-transparent
                w-full h-full pl-4 pt-1"
                name="Password"
                placeholder="Password" />
            <label className={` transition-all absolute text-gray-400 
            ${(!props.empty) ? 'text-xs top-0 pl-4' : 'text-sm pl-4 pt-1'}`}>
                Password
            </label>
            <div className='absolute right-3'>
                <div className=' bg-green-500 flex justify-end items-center relative'>
                    {(!props.empty) ? <button onClick={handleClick} className='absolute'>{(visibility === 'password' ? <p className='text-sm'>Show</p> : <p className='text-sm'>Hide</p>)}</button>
                        : <></>}
                </div>
            </div>
        </div>
    )
}

export default PasswordInput