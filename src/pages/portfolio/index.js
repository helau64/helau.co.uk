import React from 'react'

import Layout from '../../components/Layout'
import PortfolioRoll from '../../components/PortfolioRoll'

export default class PortfolioIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <header>
          <h1>Portfolio</h1>
        </header>
        <article>
          <PortfolioRoll />
        </article>
      </Layout>
    )
  }
}