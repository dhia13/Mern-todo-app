
function EmailInput(props) {

    return (
        <div className='flex justify-center items-start flex-col relative w-[300px] h-[45px] my-6'>
            <input
                autoComplete='off'
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                type="text"
                className="peer block border bg-input-color border-gray-300 text-xs
                 outline-none rounded-md placeholder-transparent
                w-full h-full pl-4 pt-1"
                name="email"
                placeholder="Email" />
            <label className={` transition-all absolute text-gray-400 
            ${(!props.empty) ? 'text-xs top-0 pl-4' : 'text-sm pl-4 pt-1'}`}>
                Email
            </label>
        </div>
    )
}

export default EmailInput