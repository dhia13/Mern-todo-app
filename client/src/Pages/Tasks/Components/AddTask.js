import React, { useState } from 'react'
import { baseUrl } from '../../../utils/axios/Axios'
import axios from 'axios'
import { useSelector } from 'react-redux'
function AddTask({ setLoad, load }) {
    const accessToken = useSelector((state) => state.UserReducer.accessToken)
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const Submit = async () => {
        await axios.post(`${baseUrl}/tasks`, {
            taskTitle, taskDescription
        }, config).then((response) => {
            setLoad(!load)
            setTaskTitle('')
            setTaskDescription('')
        }).catch((e) => {

        })
    }
    return (
        <div className='flex justify-center items-center w-full h-[500px] rounded-md lg:w-1/3'>
            <div className='flex justify-center items-center h-full flex-col px-2 bg-blue-300 rounded-md'>
                <h1 className='text-2xl font-bold'>Add a task</h1>
                <div className='min-w-[420px]'>
                    <label>Task Title</label>
                    <input
                        autoComplete='off'
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        type="text"
                        className="peer block border my-1 border-gray-200 text-xs
                 outline-none rounded-md 
                 h-[40px] pl-4 pt-1 w-full"
                        name="task title"
                        placeholder="Task title" />
                </div>
                <div className='min-w-[420px]'>
                    <label>Description</label>
                    <textarea type='text' className='block w-full h-[200px] break-words border pl-4
                 pt-1 outline-none border-gray-200 rounded-sm'
                        cols="40" rows="10" placeholder='Description' value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)} />
                </div>
                <button className='w-[200px] h-[40px] text-bold border border-gray-400 rounded-md bg-white mt-2'
                    onClick={Submit}>Add</button>
            </div>
        </div>
    )
}

export default AddTask