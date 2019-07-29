import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

export const IndexPageTemplate = ({
  title,
  subtitle,
}) => (
  <div className="home-page">
    <header className="header--home">
        <h1 className="header--home__title">{title}</h1>
        <h2 className="header--home__subtitle color-blue">{subtitle}</h2>
    </header>
  </div>
)

IndexPageTemplate.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
        subtitle={frontmatter.subtitle}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        subtitle
      }
    }
  }
`
