import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useHistory } from 'react-router-dom'

import Loader from '../Components/Loader/loader'
import NavBar from '../Components/NavBar/navbar'

export default () => {
  const [posts, setPosts] = useState(undefined);
  const history = useHistory()

  const fetchPosts = async () => {
    const response = await api.get("/api/post");
    setPosts(response.data);
  };

  const handleClicked = (url) =>{
    history.push({
      pathname:`/post/${url}`
    })
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!posts ) {
    return (
      <Loader />
    )
  }

  return (
    <>
    <NavBar/>
    <div className="container mx-auto ">
      <div className=" flex flex-col items-start justify-center w-full">
        <div className="flex justify-start items-start mb-10 ">
          <h1 className="text-3xl text-gray-800 font-semibold mt-10">
            Posts
          </h1>
        </div>
        <div className=" grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((e, index) => {
            return (
              <div key={index} className="">
                <div className="relative mb-6" style={{ height: "200px" }} onClick={()=>handleClicked(e.url)}>
                  <img src={e.title_image} className="img-card rounded-lg cursor-pointer" alt="imageCard" />
                  <div className="absolute z-30 top-0 left-0 mt-4 ml-6 text-white flex justify-center" >
                    {e.tagList.map((tag,index) => {
                      return (
                        <button className="p-1 bg-gray-800 m-1 rounded-lg hover:bg-gray-900" key={index}>{tag}</button>
                      )
                    })}
                  </div>
                </div>
                <div className="">
                  <h2 onClick={()=>handleClicked(e.url)} className="text-xl mb-4  font-semibold cursor-pointer hover:text-gray-700">
                    {e.post_title}
                  </h2>
                  <div className="flex items-center mb-10">
                    <h3 className="text-sm text-gray-600 ">
                      {e.author_name}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};
