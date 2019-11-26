import React from 'react'
import LinkNewTab from 'components/LinkNewTab'
import { KLAYTN_SCOPE } from 'constants/url'

import './PhotoHeader.scss'

const PhotoHeader = ({ currentOwner, Date}) => (
  <header className="PhotoHeader">
    <LinkNewTab
      className="PhotoHeader__owner"
      link={`${KLAYTN_SCOPE}account/${currentOwner}`}
      title={currentOwner}
    />
      <p className="PhotoInfo__Date">{Date}</p>
  </header>
)
export default PhotoHeader
