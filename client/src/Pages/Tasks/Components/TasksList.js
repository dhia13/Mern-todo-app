import { useEffect, useState } from "react"
import { baseUrl } from "../../../utils/axios/Axios"
import Delete from '../../../assets/delete.png'
import Edit from '../../../assets/edit.png'
import Done from '../../../assets/done.png'
import notDone from '../../../assets/notdone.png'
import upArrow from '../../../assets/upArrow.png'
import downArrow from '../../../assets/downArrow.png'
import axios from "axios"
import { useSelector } from 'react-redux'


function TasksList({ load, setLoad }) {
    const [tasks, setTasks] = useState([])
    const [unfinished, setUnfinished] = useState(false)
    const accessToken = useSelector((state) => state.UserReducer.accessToken)
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
    useEffect(() => {
        const getTasks = async () => {
            await axios.get(`${baseUrl}/tasks`, config).then((response) => {
                setTasks(response.data.tasks)
            })
        }
        getTasks()
        const modifyTasksData = () => {
            for (let i = 0; i < tasks.length; i++) {
                tasks[i].expande = false
                tasks[i].modify = false
            }

        }
        modifyTasksData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [load, unfinished])
    const deleteTask = async (id) => {
        await axios.delete(`${baseUrl}/tasks/${id}`, config).then((response) => {
            setLoad(!load)
        })
    }
    const toggleFinish = async (id) => {
        await axios.put(`${baseUrl}/tasks/finished/${id}`, {}, config).then((response) => {
            setLoad(!load)
        })
    }
    const updateExpande = (id, array) => {
        const newState = tasks.map(obj => {
            if (obj._id === id) {
                return { ...obj, expande: !obj.expande };
            }
            return obj;
        }
        )
        setTasks(newState);

    };
    const [modifiedTitle, setModifiedTitle] = useState('')
    const [modifiedDescription, setModifiedDescription] = useState('')
    const updateModify = (id, title, description) => {
        const newState = tasks.map(obj => {
            if (obj._id === id) {
                return { ...obj, modify: !obj.modify };
            }
            return obj;
        }
        );
        setTasks(newState);
        setModifiedTitle(title)
        setModifiedDescription(description)
    };
    const updateTask = async (id, title, description) => {
        await axios.put(`${baseUrl}/tasks/${id}`, { title, description }, config)
        setLoad(!load)
    }
    const reverseTasks = () => {
        const reversed = [...tasks].reverse()
        setTasks(reversed)
    }
    return (
        <div className="w-full flex justify-center items-center rounded-md">
            <div className="w-full my-2 mx-4 bg-blue-300 h-full rounded-md  flex flex-col relative min-h-[500px]">
                <div className="w-full h-[60px] bg-black absolute rounded-t-md top-0 right-0 flex justify-around items-center">
                    <h1 className={`font-bold cursor-pointer ${unfinished ? 'text-blue-300' : 'text-white'}`} onClick={() => setUnfinished(true)}>Unfinished</h1>
                    <h1 className={`font-bold cursor-pointer ${unfinished ? 'text-white' : 'text-blue-300'}`} onClick={() => setUnfinished(false)}>All</h1>
                    <h1 className="font-bold cursor-pointer text-white" onClick={() => reverseTasks()}>Reverce</h1>
                </div>
                <div className="overflow-y-scroll overflow-x-hidden mt-[60px]">
                    {tasks.map((task) =>
                        <div key={task._id}>
                            {
                                (unfinished && task.finished) ?
                                    <div>

                                    </div>
                                    :
                                    <div className="m-2 rounded-sm flex flex-wrap w-full" key={task._id} >
                                        {
                                            task.modify ?
                                                <div className='w-full h-full bg-gray-200 my-2 py-2 rounded-md mx-8 flex flex-col justify-center items-center'>
                                                    <input
                                                        autoComplete='off'
                                                        value={modifiedTitle}
                                                        onChange={(e) => setModifiedTitle(e.target.value)}
                                                        type="text"
                                                        className="peer block border border-gray-200 text-xs
                                                     outline-none rounded-md 
                                                    w-[440px] h-[40px] pl-4 pt-1"
                                                        name="task-title"
                                                        placeholder="task-title" />
                                                    <textarea type='text' className='w-[420px] h-[150px] pl-4 pt-1 break-words border border-gray-200 rounded-sm'
                                                        cols="40" rows="10" placeholder='Description' value={modifiedDescription}
                                                        onChange={(e) => setModifiedDescription(e.target.value)} />
                                                    <button onClick={() => updateTask(task._id, modifiedTitle, modifiedDescription)} className='text-bold'>save</button>
                                                </div> :
                                                <div className='w-full h-full bg-gray-200 my-2 rounded-md mx-8 flex flex-col justify-center items-center'>
                                                    <div className="flex justify-between items-center w-full h-full">
                                                        <p className="text-lg font-semibold ml-1 px-2">{task.title}</p>
                                                        <div className="flex h-[42px] justify-center items-center">
                                                            <div className='h-[42px] w-[42px] flex justify-center items-center'>
                                                                <img onClick={() => updateModify(task._id, task.title, task.description)}
                                                                    className='cursor-pointer w-[24px] h-[24px] mx-2 hover:w-[32px] hover:h-[32px]'
                                                                    src={Edit} alt='Edit' />
                                                            </div>
                                                            <div className='h-[42px] w-[42px] flex justify-center items-center'>
                                                                <img onClick={() => deleteTask(task._id)}
                                                                    className='cursor-pointer w-[24px] h-[24px] mx-2 hover:w-[32px] hover:h-[32px]'
                                                                    src={Delete} alt='delete' />
                                                            </div>
                                                            <div className='h-[42px] w-[42px] flex justify-center items-center'>
                                                                <img onClick={() => toggleFinish(task._id)}
                                                                    className='cursor-pointer w-[24px] h-[24px] mx-2 hover:w-[32px] hover:h-[32px]'
                                                                    src={task.finished ? Done : notDone} alt='status' />
                                                            </div>
                                                            <div className='h-[42px] w-[42px] flex justify-center items-center'>
                                                                <img onClick={() => updateExpande(task._id)}
                                                                    className='cursor-pointer w-[24px] h-[24px] mx-2 hover:w-[32px] hover:h-[32px]'
                                                                    src={task.expande ? upArrow : downArrow} alt='status' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {task.expande &&
                                                        <div className="w-full">
                                                            <p className='m-2'>{task.description}</p>
                                                        </div>
                                                    }
                                                </div>
                                        }
                                    </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TasksList



