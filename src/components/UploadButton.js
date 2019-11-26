import React from 'react'
import ui from 'utils/ui'
import UploadInputData from 'components/UploadInput'

import './UploadButton.scss'

const UploadButton = () => (
  <button
    className="UploadButton"
    onClick={() => ui.showModal({
      header: 'Upload Input Data',
      content: <UploadInputData />,
    })}
  >
    Upload
  </button>
)

export default UploadButton
