import React from 'react'

import DOMPurify from 'dompurify'

export default ({ html }) => {
  return (
    <div className="container-all">
      <div  className="post-container">
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html, { ADD_TAGS: ['iframe'], ADD_ATTR: ['allowfullscreen', 'frameborder', 'allow'] }) }} />
      </div>
    </div>
  )
}