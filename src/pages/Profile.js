import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { useHistory } from 'react-router-dom'


import Loader from '../Components/Loader/loader'
import Navbar from '../Components/NavBar/navbar'


export default () => {
    const history = useHistory()
    const [post, setPost] = useState(undefined)

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        const response = await api.get("/api/post/my_posts", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        });
        setPost(response.data)
    }

    const myPost = (url) => {
        history.push({
            pathname: `/post/${url}`
        })
    }

    const handleEdit = (title) => {
        history.push({
            pathname: `/${title}/edit`
        })
    }

    const handleDelete = async (id) => {
        const response = await api.delete(`/api/post/${id}`, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        })
        setPost((post)=> post.filter(e => e._id !== id))
    }

    if (!post) {
        return (
            <Loader />
        )
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <h1 className="text-center text-2xl mb-10 text-gray-800">Todos os seus posts feitos.</h1>
                {post.map((element, index) => {
                    return (
                        <div key={index} className="flex mb-10 w-full">
                            <img className="w-1/3 h-48 min-w-1/3 object-contain bg-black rounded-md " src={element.title_image} alt="post-profile" />
                            <div className="ml-8 text-justify w-full">
                                <div className="flex justify-between items-center mb-4 w-full">
                                    <h2 className="text-xl text-gray-900 hover:text-gray-700 cursor-pointer" onClick={() => myPost(element.url)}>{element.post_title}</h2>
                                    <div>
                                        <button onClick={() => handleEdit(element.url)} className="mr-2 p-2 bg-success-600 text-white m-1 rounded-sm hover:bg-success-500">Editar</button>
                                        <button onClick={() => handleDelete(element._id)} className="mr-2 p-2 bg-danger-600 text-white m-1 rounded-sm hover:bg-danger-700" >Deletar Post</button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">{element.about}</p>
                                <h3 className="flex justify-end items-center mt-2 text-base mr-2 text-gray-700 w-full self-end"><i className=" mr-2 fa fa-eye"></i>{element.views}</h3>
                            </div>
                        </div>

                    )
                })}
            </div>
        </div>
    )
}