"use client"

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Page() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return <>

        <div className="userCard px-2">
            <div className="w-100 h-100">
                <div className="d-flex justify-content-center">
                    <div className="userCard--searchinput">
                        <img src="/assets/images/search.svg" alt="" />
                        <input type="text" className="form-control" placeholder="ძიება შეტყობინებებში" />
                    </div>
                </div>
                <ul className="message--container">
                    <li className="message--item" onClick={handleShow}>
                        <h4>სავალდებულო შეტყობინება</h4>
                        <div className="message--from">
                            <img src="/assets/images/error.svg" alt="" />
                            <span>RS-ის შეტყობინება</span></div>
                        <p className="message--date">26-03-2023</p>
                    </li>
                    <li className="message--item" onClick={handleShow}>
                        <h4>სავალდებულო შეტყობინება</h4>
                        <div className="message--from"  style={{opacity: "0"}}>
                            <img src="/assets/images/error.svg" alt="" />
                            <span>RS-ის შეტყობინება</span></div>
                        <p className="message--date">26-03-2023</p>
                    </li>
                    <li className="message--item" onClick={handleShow}>
                        <h4>სავალდებულო შეტყობინება</h4>
                        <div className="message--from">
                            <img src="/assets/images/error.svg" alt="" />
                            <span>RS-ის შეტყობინება</span></div>
                        <p className="message--date">26-03-2023</p>
                    </li>
                    <li className="message--item" onClick={handleShow}>
                        <h4>სავალდებულო შეტყობინება</h4>
                        <div className="message--from" style={{opacity: "0"}}>
                            <img src="/assets/images/error.svg" alt="" />
                            <span>RS-ის შეტყობინება</span></div>
                        <p className="message--date">26-03-2023</p>
                    </li>
                    <li className="message--item" onClick={handleShow}>
                        <h4>სავალდებულო შეტყობინება</h4>
                        <div className="message--from">
                            <img src="/assets/images/error.svg" alt="" />
                            <span>RS-ის შეტყობინება</span></div>
                        <p className="message--date">26-03-2023</p>
                    </li>
                    <li className="message--item" onClick={handleShow}>
                        <h4>სავალდებულო შეტყობინება</h4>
                        <div className="message--from" >
                            <img src="/assets/images/error.svg" alt="" />
                            <span>RS-ის შეტყობინება</span></div>
                        <p className="message--date">26-03-2023</p>
                    </li>
                    <li className="message--item" onClick={handleShow}>
                        <h4>სავალდებულო შეტყობინება</h4>
                        <div className="message--from">
                            <img src="/assets/images/error.svg" alt="" />
                            <span>RS-ის შეტყობინება</span></div>
                        <p className="message--date">26-03-2023</p>
                    </li>
                    <li className="message--item" onClick={handleShow}>
                        <h4>სავალდებულო შეტყობინება</h4>
                        <div className="message--from">
                            <img src="/assets/images/error.svg" alt="" />
                            <span>RS-ის შეტყობინება</span></div>
                        <p className="message--date">26-03-2023</p>
                    </li>
                    <li className="message--item" onClick={handleShow}>
                        <h4>სავალდებულო შეტყობინება</h4>
                        <div className="message--from">
                            <img src="/assets/images/error.svg" alt="" />
                            <span>RS-ის შეტყობინება</span></div>
                        <p className="message--date">26-03-2023</p>
                    </li>
                    <li className="message--item" onClick={handleShow}>
                        <h4>სავალდებულო შეტყობინება</h4>
                        <div className="message--from">
                            <img src="/assets/images/error.svg" alt="" />
                            <span>RS-ის შეტყობინება</span></div>
                        <p className="message--date">26-03-2023</p>
                    </li>
                    <li className="message--item" onClick={handleShow}>
                        <h4>სავალდებულო შეტყობინება</h4>
                        <div className="message--from">
                            <img src="/assets/images/error.svg" alt="" />
                            <span>RS-ის შეტყობინება</span></div>
                        <p className="message--date">26-03-2023</p>
                    </li> <li className="message--item" onClick={handleShow}>
                        <h4>სავალდებულო შეტყობინება</h4>
                        <div className="message--from">
                            <img src="/assets/images/error.svg" alt="" />
                            <span>RS-ის შეტყობინება</span></div>
                        <p className="message--date">26-03-2023</p>
                    </li>
                </ul>
            </div>
        </div>

        <Modal show={show} onHide={handleClose} className='message--modal'>
            <Modal.Header>
                <Modal.Title>RS-ის სავადლდებულო შეტყობინება</Modal.Title>
                <img src="/assets/images/close.svg" alt="" onClick={handleClose} className='message--closeBtn' />
            </Modal.Header>
            <Modal.Body>
                <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercita
                </p>
            </Modal.Body>

        </Modal>
    </>
}