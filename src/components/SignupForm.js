import React, { Component } from 'react'

import './SignupForm.scss'

class SignupForm extends Component {

    render() {
        return (
            <div className="SignupForm">
                <button  className="Button SignupForm__button" title="Generate Private key">
                    <a href='https://baobab.wallet.klaytn.com/' target="_blank">
                        Generate Private key
                    </a>
                </button>
            </div>
        )
    }
}

export default SignupForm
