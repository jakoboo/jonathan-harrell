import React from 'react'
import PropTypes from 'prop-types'

const style = `
  img {
    width: 100%;
    height: auto;
  }
`

const BlogPostPreview = ({ entry, widgetFor }) => {
  return (
    <div style={{
      fontFamily: `'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'`,
      lineHeight: 1.4
    }}>
      <style dangerouslySetInnerHTML={{ __html: style }}/>
      <h1>{entry.getIn(['data', 'title'])}</h1>
      {widgetFor('body')}
    </div>
  )
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
