import React, { Component } from 'react'
import { connect } from 'react-redux'
import ui from 'utils/ui'
import Input from 'components/Input'
import Textarea from 'components/Textarea'
import Button from 'components/Button'

import * as InputList from 'redux/actions/photos'

import './UploadPhoto.scss'

class UploadInput extends Component {
    state = {
        MediName: '',
        Quantity: '',
        Date: '',
        Provider:'',
        Memo:''
    }

    handleIncrease = () => {
        this.setState({
            Quantity: this.state.Quantity + 1
        })
    }
    handleDecrease = () => {
        this.setState({
            Quantity: this.state.Quantity - 1
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
        console.log(e.target.value);
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { MediName, Quantity, Date, Provider, Memo} = this.state
        this.props.uploadMedi(MediName, Quantity, Date, Provider, Memo)
        ui.hideModal()
    }


    render() {
        const { MediName, Quantity, Date, Provider, Memo} = this.state
        return (
            <form className="UploadInput" onSubmit={this.handleSubmit}>
                <label htmlFor="Provider" className="select">MediName</label><br/>
                <select name="MediName" className="select" value={MediName} onChange={this.handleInputChange}>
                    <option value="A약">A약</option>
                    <option value="B약">B약</option>
                    <option value="C약">C약</option>
                    <option value="D약">D약</option>
                    <option value="E약">E약</option>
                </select><br/><br/>
                <Input
                    className="UploadInput__Quantity"
                    name="Quantity"
                    type="number"
                    label="Quantity"
                    value={Quantity}
                    onChange={this.handleInputChange}
                    placeholder="Writing Quantity"
                />
                <Input
                    className="UploadInput__Date"
                    name="Date"
                    label="Date"
                    type="date"
                    value={Date}
                    onChange={this.handleInputChange}
                    placeholder="Date"
                />
                <label htmlFor="Provider" className="select">작성자</label><br/>
                <select name="Provider" className="select" value={Provider} onChange={this.handleInputChange}>
                    <option value="고객환자">고객/환자</option>
                    <option value="업체">업체</option>
                </select>
                <br/><br/>
                <Textarea
                    className="UploadInput__Memo"
                    name="Memo"
                    value={Memo}
                    label="상세내용"
                    onChange={this.handleInputChange}
                    placeholder="Upload memo"
                    required
                />
                <Button
                    className="UploadInput__upload"
                    type="submit"
                    title="Upload"
                />
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    uploadMedi: (MediName, Quantity, Date, Provider, Memo) =>
        dispatch(InputList.uploadMedi(MediName, Quantity, Date, Provider, Memo)),
})

export default connect(null, mapDispatchToProps)(UploadInput)