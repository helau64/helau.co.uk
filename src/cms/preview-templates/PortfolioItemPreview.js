import React from 'react'
import PropTypes from 'prop-types'
import { PortfolioItemTemplate } from '../../templates/portfolio-item'

const PortfolioItemPreview = ({ entry, widgetFor }) => {
  return (
    <PortfolioItemTemplate
      content={widgetFor('body')}
      tags={entry.getIn(['data', 'tags'])}
      title={entry.getIn(['data', 'title'])}
      date={entry.getIn(['data', 'date'])}
      images={entry.getIn(['data', 'images'])}
    />
  )
}

PortfolioItemPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func

}

export default PortfolioItemPreview

