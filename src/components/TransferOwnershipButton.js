import React from 'react'
import cx from 'classnames'
import ui from 'utils/ui'
import IconButton from 'components/IconButton'
import TransferOwnership from 'components/TransferOwnership'

const TransferOwnershipButton = ({
  id,
  currentOwner,
  className,
}) => (
  <IconButton
    className={cx('TransferOwnershipButton', className)}
    icon="icon-transfer.png"
    alt="Transfer Ownership"
    onClick={() => ui.showModal({
      header: 'Transfer Ownership',
      content: (
        <TransferOwnership
          id={id}
          currentOwner={currentOwner}
        />
      ),
    })}
  />
)

export default TransferOwnershipButton
