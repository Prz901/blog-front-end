import React from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";

import * as Yup from "yup";
import { Formik } from "formik";

// Hex #02927F

export default (props) => {
  const history = useHistory();

  const fetchUser = async (values) => {
    try {
      const response = await api.post("/api/auth", {
        username: values.email,
        password: values.password,
      });
      const token = response.data.token;
      window.localStorage.setItem("token", token);
      history.push("/");
    } catch (e) { }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-200">
      <div className="flex justify-between container">
        <div>
          <img className="w-5/12" src="/images/loginImage.svg" alt="imageLoginPage" />
          <h4 className="mt-4 text-gray-800 text-2xl font-semibold uppercase">
            Blog dos dev's
          </h4>
          <ul>
            <li className="mt-2 text-gray-800 text-xl font-normal ">
              <i className="fa fa-check text-success-500 mr-2" />
              Criar conta
            </li>
            <li className="mt-2 text-gray-800 text-xl font-normal ">
              <i className="fa fa-check text-success-500 mr-2" />
              Post
            </li>
            <li className="mt-2 text-gray-800 text-xl font-normal ">
              <i className="fa fa-check text-success-500 mr-2" />
              Conhecimento
            </li>
            <li className="mt-2 text-gray-800 text-xl font-normal ">
              <i className="fa fa-check text-success-500 mr-2" />
              Comunidade unida
            </li>
            <li className="mt-2 text-gray-800 text-xl font-normal ">
              <i className="fa fa-check text-success-500 mr-2" />
              Mamanois
            </li>
            <li className="mt-2 text-gray-800 text-xl font-normal ">
              <i className="fa fa-check text-success-500 mr-2" />
              Interação com outros devs
            </li>
          </ul>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={fetchUser}
          validationSchema={
            Yup.object().shape({
              email: Yup.string().required().min(3, 'email precisa ter no minimo 6 caracteres').max(130, 'email excedeu o maximo de caracteres'),
              password: Yup.string().required('senha inválida'),
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
          }) => (
              <div className="bg-white shadow-lg rounded-lg w-4/12 box-border p-8 h-max-content">
                <p className="text-center mb-8 font-semibold text-2xl">Login</p>
                <div className="flex flex-col mb-8">
                  <label
                    htmlFor="email"
                    className="text-left font-thin text-gray-500 mb-2"
                  >
                    Email
                </label>
                  <input
                    type="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Endereço de email"
                    className="p-4 outline-none border-solid border-secondary-200 border rounded-lg focus:border-secondary-400"
                  />
                  {errors.email && touched.email && <h5>{errors.email}</h5>}
                </div>
                <div className="flex flex-col mb-8">
                  <label
                    htmlFor="password"
                    className="text-left font-thin text-gray-500 mb-2"
                  >
                    Senha
                </label>
                  <input
                    type="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Senha"
                    className="p-4 outline-none border-solid border-secondary-200 border rounded-lg focus:border-secondary-400"
                  />
                </div>
                <input type="submit" onClick={handleSubmit} disabled={isSubmitting} className="p-4 w-full text-center text-white bg-secondary-500 rounded-lg text-lg box-border hover:bg-secondary-600 font-bold" value="Logar" />
              </div>
            )}
        </Formik>
      </div>
    </div>
  );
};
