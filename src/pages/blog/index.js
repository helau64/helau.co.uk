import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <header>
          <h1 class="header">Blog</h1>
        </header>
        <article>
          <BlogRoll />
        </article>
      </Layout>
    )
  }
}
