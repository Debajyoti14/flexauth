"use client";
import React, { useEffect, useState } from 'react'
import { Loader } from '../custom/Loader';
import { IUser } from '@/interfaces/IUser';
import { MdOutlineConstruction } from "react-icons/md";

const Overview = () => {
    const [users, setUsers] = useState([] as IUser[])
    const [loading, setLoading] = useState(true)

    const getAllUsers = async () => {
        try {
            setLoading(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/user/get-all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-cache',
            });
            const { data } = await res.json();
            setUsers(data);
        } catch (error) {
            console.error('Error during POST request:', error);
        }
        setLoading(false)
    }

    useEffect(() => {
        getAllUsers()
    }, [])
    return (
        <div>
            {
                loading ?
                    <div className='h-[calc(100vh-10rem)] flex justify-center items-center'>
                        <Loader />
                    </div>
                    :
                    <div className='flex justify-center items-center h-[calc(100vh-10rem)]'>
                        <div className='flex flex-col items-center gap-5'>
                            <MdOutlineConstruction className='text-primary' size={160} />
                            <h1 className='text-3xl'>Hold up! Work is in progress</h1>
                        </div>

                        {/* <div className='grid grid-cols-4 gap-5'>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Total Users</CardTitle>
                                </CardHeader>
                                <CardContent className='flex justify-between items-end'>
                                    <p className="text-6xl font-bold">
                                        {users.length}
                                    </p>
                                    <FaUsers size={80} className='text-primary' />
                                </CardContent>
                            </Card>
                        </div> */}
                    </div>
            }
        </div>
    )
}

export default Overview