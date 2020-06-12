import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges

    const postLinks = posts.map(post => (
      <li key={post.node.fields.slug} className="tag-list--tag-page__tag">
        <Link to={post.node.fields.slug}>
          <h2>{post.node.frontmatter.title}</h2>
          {post.node.frontmatter.templateKey === 'portfolio-item' && <span class="tag__page-type">Portfolio Item</span>}
          {post.node.frontmatter.templateKey === 'blog-post' && 
            <div>
              <span class="tag__page-type">Blog Post</span>
              <span class="tag__page-date">{post.node.frontmatter.date}</span>
            </div>
          }
        </Link>
      </li>
    ))
    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} page${
      totalCount === 1 ? '' : 's'
    } tagged with “${tag}”`

    return (
      <Layout>
        <article className="tag-page">
          <Helmet title={`${tag} | ${title}`} />
          <h1 className="header tag-page__title">{tagHeader}</h1>
          <ul className="tag-list--tag-page">
            {postLinks}
          </ul>
          <Link to="/tags/">Browse all tags</Link>
        </article>
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            templateKey
          }
        }
      }
    }
  }
`
