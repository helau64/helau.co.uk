import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const PortfolioItemTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  date,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="portfolio-item">
      <div className="portfolio-item__image-wrapper">
      </div>
      <article className="portfolio-item__text-wrapper">
        <header>
          <h1 className="title">{title}</h1>
          {tags && tags.length ? (
              <ul className="tag-list--portfolio-item">
                {tags.map((tag, i, arr) => (
                  <li key={tag + `tag`}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    {(arr.length -1 !== i ? <span>/</span> : null)}
                  </li>
                ))}
              </ul>
          ) : null}
          <span className="date">{date}</span>
        </header>
        <PostContent content={content} />
      </article>
    </section>
  )
}

PortfolioItemTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  date: PropTypes.string,
}

const PortfolioItem = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <PortfolioItemTemplate
        content={post.html}
        contentComponent={HTMLContent}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
      />
    </Layout>
  )
}

PortfolioItem.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default PortfolioItem

export const pageQuery = graphql`
  query PortfolioItemByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "YYYY")
        title
        tags
      }
    }
  }
`