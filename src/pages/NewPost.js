import React from 'react'
import Select from 'react-select'

import NavBar from '../Components/NavBar/navbar'
import api from '../services/api'
import { useHistory } from 'react-router-dom'

import * as Yup from "yup";
import { Formik } from "formik";

const options = [
  { value: 'anime', label: 'anime' },
  { value: 'Kaguya', label: 'Kaguya' },
  { value: 'Hayasaka', label: 'Hayasaka' },
  { value: 'Geek', label: 'Geek' },
  { value: 'Nerd', label: 'Nerd' },
  { value: 'Dev', label: 'Dev' },
  { value: 'Teclead', label: 'Teclead' },

]

export default () => {

  const history = useHistory();

  const fetchPost = async (values) => {
    //list é o acumulador e o item é o elemento atual 
    const tagList = values.tagList.reduce((list, element)=> {
      return [...list, element.value]
    },[])
    
    try {
      const response = await api.post("/api/post", {
        title_image: values.title_image,
        tagList: tagList,
        post_title: values.post_title,
        about: values.about,
        category: 1,
        content: values.content
      }, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      history.push("/profile");
    } catch (e) { }
  };

  return (

    <div>
      <NavBar />
      <div>
        <div className="container mx-auto flex justify-center py-10">
          <Formik
            initialValues={{
              title_image: "",
              tagList: "",
              post_title: "",
              about: "",
              category: "",
              content: "",
            }}
            onSubmit={fetchPost}
            validationSchema={
              Yup.object().shape({
                title_image: Yup.string().required().min(6, 'Titulo do post precisa ter no minimo 6 caracteres'),
                post_title: Yup.string().required().min(6, 'Titulo do post precisa ter no minimo 6 caracteres').max(40, 'Titulo do post precisa ter no maximo 40 caracteres'),
                about: Yup.string().required().min(6, 'Introdução do post precisa ter pelo menos 6 caracteres').max(500, 'Calma ai a introdução excedeu o limite de caracteres'),
                content: Yup.string().required().min(10, 'Post precisa ter no minimo 10 caracteres'),
                tagList: Yup.array().required().min(1, ''),
              })}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting,
              setFieldValue,
            }) => (
                <div className="bg-white shadow-lg rounded-lg w-8/12 box-border p-8 h-max-content">
                  <p className="text-center mb-8 font-semibold text-2xl">New Post </p>
                  <div className="flex flex-col mb-8">
                    <label
                      htmlFor="title_image"
                      className="text-left font-thin text-gray-500 mb-2"
                    >
                      Imagem do Post
                    </label>
                    <input
                      type="text"
                      id="title_image"
                      value={values.title_image}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Imagem do post"
                      className="p-4 outline-none border-solid border-secondary-200 border rounded-lg focus:border-secondary-400"
                    />
                  </div>
                  <div className="flex flex-col mb-8">
                    <label
                      htmlFor="tagList"
                      className="text-left font-thin text-gray-500 mb-2"
                    >
                      Lista de categorias
                    </label>
                    <Select
                      options={options}
                      isMulti
                      name="tagList"
                      value={values.tagList}
                      onChange={(value) => setFieldValue("tagList", value)}
                    />
                  </div>
                  <div className="flex flex-col mb-8">
                    <label
                      htmlFor="post_title"
                      className="text-left font-thin text-gray-500 mb-2"
                    >
                      Titulo do Post
                    </label>
                    <input
                      type="text"
                      id="post_title"
                      value={values.post_title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Titulo do Post"
                      className="p-4 outline-none border-solid border-secondary-200 border rounded-lg focus:border-secondary-400"
                    />
                    {errors.post_title && touched.post_title && <h5>{errors.post_title}</h5>}
                  </div>
                  <div className="flex flex-col mb-8">
                    <label
                      htmlFor="about"
                      className="text-left font-thin text-gray-500 mb-2"
                    >
                      Sobre
                    </label>
                    <input
                      type="text"
                      id="about"
                      value={values.about}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Breve Introdução sobre o post"
                      className="p-4 outline-none border-solid border-secondary-200 border rounded-lg focus:border-secondary-400"
                    />
                    {errors.about && touched.about && <h5>{errors.about}</h5>}
                  </div>
                  <div className="flex flex-col mb-8">
                    <label
                      htmlFor="content"
                      className="text-left font-thin text-gray-500 mb-2"
                    >
                      Conteudo do Post
                    </label>
                    <textarea
                      type="text"
                      id="content"
                      value={values.content}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Conteudo do Post"
                      className="p-4 outline-none border-solid border-secondary-200 border rounded-lg focus:border-secondary-400"
                      rows="10"
                    />
                    {errors.content && touched.content && <h5>{errors.content}</h5>}
                  </div>
                  <input type="submit" onClick={handleSubmit} disabled={isSubmitting} className="p-4 w-full text-center text-white bg-success-500 rounded-lg text-lg box-border hover:bg-success-600 font-bold" value="Criar Post" />
                </div>
              )}
          </Formik>
        </div>
      </div>
    </div>
  )
}