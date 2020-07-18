import React, { useState, useEffect } from 'react'
import api from '../services/api'

import RichTextView from '../Components/RichTextView'
import Loader from '../Components/Loader/loader'
import Navbar from '../Components/NavBar/navbar'


export default ({ location }) => {
    const [post, setPost] = useState(undefined)
    const [users, setUser] = useState(undefined);

    const fetchPost = async () => {
        const response = await api.get(`/api${location.pathname}`);
        setPost(response.data)
        fetchAuthor(response.data)
    };

    const fetchAuthor = async (post) => {
        try {
            const response = await api.get(`/api/user/${post.author_id}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            });
            setUser(response.data);
        } catch (e) {
        }
    };

    useEffect(() => {
        fetchPost()
    }, [])

    if (!post || !users) {
        return (
            <Loader />
        )
    }

    return (
        <>
        <Navbar />
        <div className="bg-gray-100">
            <div className="mt-4 container mx-auto ">
                <div className="flex justify-center">
                    <img className="" src={post.title_image} alt="imageTitle" />
                </div>
                <h1 className="text-4xl text-gray-900 text-center my-8">{post.post_title}</h1>
                <RichTextView html={post.content} >

                </RichTextView>
                <div className="flex bg-gray-200 rounded-md shadow-xs w-1/4 mb-6 p-4">
                    <img className=" w-16 rounded-full" src={users.photo} alt="imageProfileAuthor" />
                    <div className="flex flex-col ml-4 w-full">
                        <p className="mb-2 text-xs text-gray-600 uppercase">written by:</p>
                        <p className=" font-bold text-2xl text-gray-800" >{post.author_name}</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}