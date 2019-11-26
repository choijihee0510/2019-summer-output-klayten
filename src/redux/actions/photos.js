import Contract from 'klaytn/Contract'
import { getWallet } from 'utils/crypto'
import ui from 'utils/ui'
import { feedParser } from 'utils/misc'
import { SET_FEED } from './actionTypes'


// Action creators

const setFeed = (feed) => ({
  type: SET_FEED,
  payload: { feed },
})

const updateFeed = (tokenId) => (dispatch, getState) => {
  Contract.methods.getMedi(tokenId).call()
      .then((newMedi) => {
        const { photos : { feed } } = getState()
        const newFeed = [feedParser(newMedi), ...feed]
        dispatch(setFeed(newFeed))
      })
}

const updateOwnerAddress = (tokenId, to) => (dispatch, getState) => {
  const { Medi : { feed } } = getState()
  const newFeed = feed.map((Medi) => {
    if (Medi[ID] !== tokenId) return Medi
    Medi[OWNER_HISTORY].push(to)
    return Medi
  })
  dispatch(setFeed(newFeed))
}


// API functions

export const getFeed = () => (dispatch) => {
  Contract.methods.getTotalMediCount().call()
      .then((totalMediCount) => {
        if (!totalMediCount) return []
        const feed = []
        for (let i = totalMediCount; i > 0; i--) {
          const Medi = Contract.methods.getMedi(i).call()
          feed.push(Medi)
        }
        return Promise.all(feed)
      })
      .then((feed) => dispatch(setFeed(feedParser(feed))))
}

export const uploadMedi = (
    MediName,
    Quantity,
    Date,
    Provider,
    Memo
) => (dispatch) =>  {

    Contract.methods.uploadMedi(MediName, Quantity, Date, Provider, Memo).send({
      from: getWallet().address,
      gas: '20000000',
    })
    // 3. After sending the transaction,
    // show progress along the transaction lifecycle using `Toast` component.
        .once('transactionHash', (txHash) => {
          ui.showToast({
            status: 'pending',
            message: `Sending a transaction... (uploadMedi)`,
            txHash,
          })
        })
        .once('receipt', (receipt) => {
          ui.showToast({
            status: receipt.status ? 'success' : 'fail',
            message: `Received receipt! It means your transaction is
          in klaytn block (#${receipt.blockNumber}) (uploadMedi)`,
            link: receipt.transactionHash,
          })

          // 4. If the transaction successfully gets into a block,
          // call `updateFeed` function to add the new photo into the feed page.
          if(receipt.status) {
            const tokenId = receipt.events.MediUploaded.returnValues[0]
            dispatch(updateFeed(tokenId))
          }
        })
        .once('error', (error) => {
          ui.showToast({
            status: 'error',
            message: error.toString(),
          })
        })

}

export const transferOwnership = (tokenId, to) => (dispatch) => {
  Contract.methods.transferOwnership(tokenId, to).send({
    from: getWallet().address,
    gas: '20000000',
  })
      .once('transactionHash', (txHash) => {
        ui.showToast({
          status: 'pending',
          message: `Sending a transaction... (transferOwnership)`,
          txHash,
        })
      })
      .once('receipt', (receipt) => {
        ui.showToast({
          status: receipt.status ? 'success' : 'fail',
          message: `Received receipt! It means your transaction is
          in klaytn block (#${receipt.blockNumber}) (transferOwnership)`,
          link: receipt.transactionHash,
        })
        dispatch(updateOwnerAddress(tokenId, to))
      })
      .once('error', (error) => {
        ui.showToast({
          status: 'error',
          message: error.toString(),
        })
      })
}