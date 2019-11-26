import React, { Fragment } from 'react'

import './PhotoInfo.scss'

const PhotoInfo = ({   MediName,
                       Quantity,
                       Date,
                       Provider,
                       Memo }) => (
  <Fragment>
    <h2 className="PhotoInfo__Date">병명 : {MediName}</h2><br/>
    <p className="PhotoInfo__Date">진료병원 : {Quantity}</p><br/>
    <p className="PhotoInfo__Date">작성자 : {Provider}</p><br/>
    <p className="PhotoInfo__Date">상세내용 : {Memo}</p><br/>
  </Fragment>
)

export default PhotoInfo
