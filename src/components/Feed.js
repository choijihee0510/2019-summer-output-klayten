import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Loading from 'components/Loading'
import PhotoHeader from 'components/PhotoHeader'
import PhotoInfo from 'components/PhotoInfo'
import CopyrightInfo from 'components/CopyrightInfo'
import TransferOwnershipButton from 'components/TransferOwnershipButton'
import { last } from 'utils/misc'

import * as MediActions from 'redux/actions/photos'

import '../styles/sb-admin-2.css'
import './Feed.scss'

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: !props.feed,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const isUpdatedFeed = (nextProps.feed !== prevState.feed) && (nextProps.feed !== null)
    if (isUpdatedFeed) {
      return { isLoading: false }
    }
    return null
  }

  componentDidMount() {
    const { feed, getFeed } = this.props
    if (!feed) getFeed()
  }

  handleRemove = (e) => {
    const tokenId = e.target.id;
    this.Klaystagram.methods.burn.cacheSend(tokenId);
  }

  render() {
    const { feed, userAddress } = this.props

    if (this.state.isLoading) return <Loading />
    return (
      <div className="Feed">
        {feed.length !== 0
            ? feed.map(({
                          id,
                          ownerHistory,
                          MediName,
                          Quantity,
                          Date,
                          Provider,
                          Memo
                        }) => {
              const originalOwner = ownerHistory[0]
              const currentOwner = last(ownerHistory)
              return (
                  <div className="FeedData" key={id}>
                    <PhotoHeader className="Header"
                        currentOwner={currentOwner}
                        Date={Date}
                    />
                    <div className="FeedMedi__info">
                      <PhotoInfo
                          MediName={MediName}
                          Quantity={Quantity}
                          Provider={Provider}
                          Memo={Memo}
                      />
                      <CopyrightInfo
                          className="FeedMedi__info"
                          id={id}
                          originalOwner={originalOwner}
                          currentOwner={currentOwner}
                      />
                      {
                        userAddress === currentOwner && (
                            <TransferOwnershipButton   // 7-4. TransferOwnership
                                className="FeedMedi__info"
                                id={id}
                                currentOwner={currentOwner}
                            />
                        )
                      }
                    </div>
                  </div>
              )
            })
            : <span className="Feed__empty">No Data :D</span>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  feed: state.photos.feed,
  userAddress: state.auth.address,
})

const mapDispatchToProps = (dispatch) => ({
  getFeed: () => dispatch(MediActions.getFeed()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
