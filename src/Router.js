import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import {Login, Home, Page404, BlogPost, PostViewed, Profile , NewPost ,UpdatePost} from './pages'

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path='/post/:url' component={BlogPost} />
        <Route exact path='/most_viewed' component={PostViewed} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/new_post' component={NewPost} />
        <Route exact path='/:title/edit' component={UpdatePost} />
        <Route exact path="*" component={Page404} />
      </Switch>
    </BrowserRouter>
  )
}