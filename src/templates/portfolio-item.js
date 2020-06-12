import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Img from "gatsby-image"

export class PortfolioItemTemplate extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      activeItem: 0
    }

    this.setActiveItem = this.setActiveItem.bind(this)
  }

  setActiveItem(activeItemIndex) {
    this.setState({
      activeItem: activeItemIndex
    })
  }

  render() {
    const data = this.props
    const PostContent = data.contentComponent || Content

    return (
      <section className="portfolio-item">
        <div className="portfolio-item__image-wrapper">

          {data.images && data.images.length ? (
            <PreviewCompatibleImage imageInfo={data.images[this.state.activeItem]} />
            ) : null}
            
          {data.thumbnails && data.thumbnails.length ? (
                <ul className="portfolio-item__thumbnail-list">
                  {data.thumbnails.map((thumbnail, i) => (
                    <li key={i}>
                      <button onClick={(e) => this.setActiveItem(i)} aria-label="Change main image">
                        <Img fixed={thumbnail.image.childImageSharp.fixed} />
                      </button>
                    </li>
                  ))}
                </ul>
            ) : null}

        </div>

        <article className="portfolio-item__text-wrapper">
          <div className="portfolio-item__content">
            <header>
              <h1 className="header">{data.title}</h1>
              {data.tags && data.tags.length ? (
                  <ul className="tag-list--portfolio-item">
                    {data.tags.map((tag, i, arr) => (
                      <li key={tag + `tag`}>
                        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                        {(arr.length -1 !== i ? <span>/</span> : null)}
                      </li>
                    ))}
                  </ul>
              ) : null}
              <span className="date">{data.date}</span>
            </header>
            <PostContent content={data.content} />
          </div>
        </article>
      </section>
    )
  }
}

PortfolioItemTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  tags: PropTypes.array,
  title: PropTypes.string,
  date: PropTypes.string,
  images: PropTypes.array,
  thumbnails: PropTypes.array
}

const PortfolioItem = ({ data }) => {
  const { page: post } = data 
  return (
    <Layout>
      <PortfolioItemTemplate
        content={post.html}
        contentComponent={HTMLContent}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        images={post.frontmatter.images}
        thumbnails={data.thumbnails.frontmatter.images}
      />
    </Layout>
  )
}

PortfolioItem.propTypes = {
  data: PropTypes.object.isRequired
}

export default PortfolioItem

export const pageQuery = graphql`
  query PortfolioItemTemplate($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
        id
        html
        frontmatter {
          date(formatString: "YYYY")
          title
          tags
          images {
            image {
              childImageSharp {
                fluid(maxWidth: 580, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            alt
          }
        }
    }
    thumbnails: markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        images {
          image {
            childImageSharp {
              fixed(width: 75, height: 75) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          alt
        }
      }
    }
  }
`