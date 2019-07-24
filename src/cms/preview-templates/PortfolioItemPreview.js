import React from 'react'
import PropTypes from 'prop-types'
import { PortfolioItemTemplate } from '../../templates/portfolio-item'

const PortfolioItemPreview = ({ entry, widgetFor }) => (
  <PortfolioItemTemplate
    content={widgetFor('body')}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

PortfolioItemPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default PortfolioItemPreview

