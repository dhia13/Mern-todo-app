import { useState } from 'react'
import Navbar from '../Components/Navbar'
import AddTask from './Components/AddTask'
import TasksList from './Components/TasksList'
function Tasks() {
    const [loadTasks, setLoadTasks] = useState(false)
    return (
        <div>
            <Navbar />
            <div className='w-screen flex justify-center items-center flex-col xl:flex-row my-2 overflow-x-hidden '>
                <AddTask setLoad={setLoadTasks} load={loadTasks} />
                <TasksList load={loadTasks} setLoad={setLoadTasks} />
            </div>
        </div>
    )
}

export default Tasks