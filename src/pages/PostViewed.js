import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useHistory } from 'react-router-dom'

import Loader from '../Components/Loader/loader'
import NavBar from '../Components/NavBar/navbar'

export default () => {
  const [posts, setPosts] = useState(undefined);
  const [mostPost, setMostPost] = useState(undefined);

  const history = useHistory()

  const fetchPosts = async () => {
    const response = await api.get("/api/post");
    setPosts(response.data);
    fetchMostViewPost(response.data);
  };

  const fetchMostViewPost = async () => {
    const response = await api.get(`/api/info/posts`)
    setMostPost(response.data)
  };

  const handleClicked = (url) => {
    history.push({
      pathname: `/post/${url}`
    })
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!posts || !mostPost) {
    return (
      <Loader />
    )
  }

  return (
    <div>
      <NavBar />
      <div className="container mx-auto ">
        <div className=" flex flex-col items-start justify-center w-full">
          <div className="flex justify-start items-start mb-10 ">
            <h1 className="text-3xl text-gray-800 font-semibold mt-10">
              Posts mais acessados
          </h1>
          </div>
          {mostPost.map((post, index) => (
            <div key={index} className="w-3/5">
              <div className="flex items-baseline justify-between">
                <h2 onClick={() => handleClicked(post.url)} className="text-xl mb-8  font-semibold cursor-pointer hover:text-gray-600">
                  {post.post_title}
                </h2>
                <h3 className="text-lg text-secondary-600"><i className=" mr-2 fa fa-eye"></i>
                  {post.views}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
