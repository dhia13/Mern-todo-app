import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { LoginAction, LogoutAction } from '../../utils/Redux/Actions/UserActions'
import axios from 'axios';
import { baseUrl } from '../../utils/axios/Axios';

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const refreshToken = useSelector((state) => state.UserReducer.refreshToken)
    const Logged = useSelector((state) => state.UserReducer.Logged)
    useEffect(() => {
        if (!Logged) {
            navigate('/login')
        }
    }, [Logged, navigate])
    useEffect(() => {
        const checkLogging = async () => {
            await axios.post(`${baseUrl}/auth/refresh`, { "refreshToken": refreshToken }).then((response) => {
                dispatch(LoginAction({ refreshToken, accessToken: response.data.accessToken }))
            }).catch((e) => {
                localStorage.clear();
                dispatch(LogoutAction())
            })
        }
        checkLogging()
    }, [dispatch, refreshToken])
    const logout = () => {
        localStorage.clear();
        dispatch(LogoutAction())
    }
    const [activeTasks, setActiveTasks] = useState(false)
    const link = window.location.href
    useEffect(() => {
        if (link.includes('/tasks')) {
            setActiveTasks(true)
        }
    }, [link])
    return (
        <div>
            <div className='w-screen h-[60px] bg-blue-300 flex justify-between items-center text-xl font-semibold'>
                <h1 className='ml-2 cursor-pointer text-white'>To-Do</h1>
                <div className='flex '>
                    <Link to='/tasks' className={`mx-4 cursor-pointer ${activeTasks && 'text-white'}`}>Tasks</Link>
                </div>
                <h1 onClick={logout} className='mr-4 cursor-pointer text-white'>Logout</h1>
            </div>
        </div >
    )
}

export default Navbar