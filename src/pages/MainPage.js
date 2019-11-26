import React, {Component} from 'react';
import UploadButton from "components/UploadButton";
import Feed from "components/Feed";

import './MainPage.scss'
import '../styles/sb-admin-2.css';

class MainPage extends Component {

    render() {
        return (
            <main className="page-top">
                <div id="wrapper">
                    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                            <div className="sidebar-brand-icon rotate-n-15">
                                <i className="fas fa-laugh-wink"></i></div>
                            <h1><div className="sidebar-brand-text mx-3">BONGJI</div></h1>
                        </a>
                        <li className="nav-item active">
                            <a className="nav-link" href="index.html">
                                <h1 className="h3 mb-0 text-white-800">Medical Data Information</h1>
                            </a>
                            <br/>
                            <a className="nav-link" href="#">
                                <h1 className="h3 mb-0 text-white-800">lala</h1>
                            </a>
                        </li>
                    </ul>
                    <br/>
                    <br/>
                    <div className="container-fluid">
                        <br/>
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-white-600">Information</h1>
                        </div>

                        <div className="row">
                            <div className="col-xl-3 col-md-6 mb-12">
                            </div>

                            <div className="col-xl-3 col-md-6 mb-12">
                            </div>
                            <Feed />
                        </div>
                    </div>
                </div>
                <UploadButton />
            </main>
        );
    }
}

export default MainPage;