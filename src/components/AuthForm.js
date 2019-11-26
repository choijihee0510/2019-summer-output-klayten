import React, { Component } from 'react'
import LoginForm from 'components/LoginForm'
import SignupForm from 'components/SignupForm'

import '../styles/sb-admin-2.css'
import './AuthForm.scss'

class AuthForm extends Component {
    state = {
        loginForm: true,
    }

    toggleForm = () => this.setState({
        loginForm: !this.state.loginForm,
    })

    render() {
        const { loginForm } = this.state
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-8 col-md-8 col-sm-8">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <br/>
                                                <h1 className="h4 text-gray-900 mb-4"><img src="images/pills.png" width="100" height="100"/></h1>
                                                <form className="user">
                                                    {loginForm ? <LoginForm /> : <SignupForm />}
                                                    <br/>
                                                    <p className="AuthForm__message">
                                                        {loginForm ? 'Don\'t have an account? ' : 'Have an account? '}
                                                        <span className="AuthForm__link" onClick={this.toggleForm}>
                                                                {loginForm ? 'Sign up' : 'Login'}
                                                            </span>
                                                    </p>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthForm
