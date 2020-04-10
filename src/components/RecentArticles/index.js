import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { shouldAnimate } from '../../helpers'
import { BlogExcerpt, BlogExcerptWrap, RecentArticlesWrap } from './styles'

const variants = {
  mounted: {
    transition: { staggerChildren: 0.05, delayChildren: 0.3 }
  }
}

const childVariants = {
  mounted: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      mass: 0.1
    }
  }
}

const RecentArticles = ({
  data: {
    allMdx: { edges: posts }
  },
  currentPostId
}) => {
  if (currentPostId)
    posts = posts.filter(post => post.node.id !== currentPostId)
  posts = posts.slice(0, 4)

  return (
    <RecentArticlesWrap animate="mounted" variants={variants}>
      {posts &&
        posts.map(({ node: post }) => (
          <BlogExcerptWrap
            key={post.id}
            variants={childVariants}
            initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
          >
            <BlogExcerpt
              link={post.fields.slug}
              date={new Date(post.frontmatter.date)}
              title={post.frontmatter.title}
              excerpt={post.frontmatter.description}
            />
          </BlogExcerptWrap>
        ))}
    </RecentArticlesWrap>
  )
}

RecentArticles.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired
            }).isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired
            }).isRequired
          }).isRequired
        })
      ).isRequired
    }).isRequired
  }).isRequired
}

export default ({ currentPostId }) => (
  <StaticQuery
    query={graphql`
      query RecentArticlesQuery {
        allMdx(
          limit: 5
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 150)
              id
              fields {
                slug
              }
              frontmatter {
                title
                description
                templateKey
                date
                tags
              }
            }
          }
        }
      }
    `}
    render={data => (
      <RecentArticles data={data} currentPostId={currentPostId} />
    )}
  />
)
