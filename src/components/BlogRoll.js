import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <ul className="blog-list">
        {posts &&
          posts.map(({ node: post }) => (
            <li className="blog-list__item" key={post.id}>
                <header>
                    <Link to={post.fields.slug}>
                      <h2 className="title">{post.frontmatter.title}</h2>
                    </Link>
                    <span className="subtitle">{post.frontmatter.date}</span>
                </header>
                <p>{post.excerpt}</p>
                <Link to={post.fields.slug}>
                  Keep Reading →
                </Link>
            </li>
          ))}
      </ul>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
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
                templateKey
                date(formatString: "MMMM DD, YYYY")
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
