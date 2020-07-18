import React from 'react'
import { useHistory } from 'react-router-dom'

export default () => {
  const history = useHistory()

  const handleClick = (url) => {
    history.push(`/${url}`)
  }

  const logout = () => {
    window.localStorage.removeItem("token")
    history.push('/login')
  }

  return (
    <header className="w-full bg-gray-500 p-6 z-50 ">
      <div className="container flex justify-center mx-auto ">
        <div className="w-full flex items-center justify-between ">
          <div className="flex items-center">
            <img className="h-16" src="/images/Home.svg" />
            <h1 className="text-4xl text-secondary-800 ml-2 ">GeekBlog</h1>
          </div>
          <nav className="flex items-center">
            <ul className="items-center inline-flex space-x-6 cursor-pointer mr-6">
              <li><p onClick={() => handleClick('')} className="text-gray-800 hover:text-gray-600" >Home</p></li>
              <li><p onClick={() => handleClick('most_viewed')} className="text-gray-800 hover:text-gray-600">Mais Acessos</p></li>
              <li><p onClick={() => handleClick('profile')} className="text-gray-800 hover:text-gray-600">Profile</p></li>
              <li><p onClick={() => handleClick('new_post')} className="text-gray-800 hover:text-gray-600">New Post</p></li>
              <li><p onClick={logout} className="text-gray-800 hover:text-gray-600"><i className="fa fa-sign-out-alt text-2xl"></i></p></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}