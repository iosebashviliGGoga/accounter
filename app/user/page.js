"use client"

import React, { useState } from 'react';
export default function Page() {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        setCurrentStep(prevStep => prevStep + 1);
        console.log(currentStep)
        if (currentStep + 1 == 3) {
            setTimeout(() => {
                setCurrentStep(prevStep => prevStep + 1);
            }, 2000);
        }

    };


    return <>

        <div className="userCard--wrapper">
            <div className="userCard">
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <div>


                        {currentStep === 1 && (
                            <>
                                <h2 className="userCard--header">შეიყვანეთ მონაცემები:</h2>
                                <div className="d-flex flex-column align-items-center step1">
                                    <div className="input--container ">
                                        <input type="text" name="email" className="form-control" placeholder="ელ-ფოსტა" />
                                        <input type="text" name="password" className="form-control" placeholder="პაროლი" />
                                        <input type="text" name="mobile" className="form-control" placeholder="ტელეფონის ნომერი" />
                                    </div>
                                    <button className="usercard--submitBtn" onClick={handleNextStep}>გაგრძელება</button>
                                </div>
                            </>
                        )}

                        {currentStep === 2 && (
                            <>
                                <h2 className="userCard--header">შეიყვანეთ მონაცემები:</h2>
                                <div className="d-flex flex-column align-items-center step2">
                                    <div className="input--container ">
                                        <input type="text" name="RSuser" className="form-control" placeholder="RS-ის მომხმარებელი" />
                                        <div className='position-relative'>
                                            <input type="text" name="RSpassword" className="form-control" placeholder="პაროლი" />
                                            {/* <p className="steps--error">
                                              მომხმარებელი ან პაროლი არასწორია
                                        </p> */}
                                        </div>
                                        <div className="checkbox-wrapper">
                                            <input type="checkbox" id="html" />
                                            <label htmlFor="html"><span>ვეთანხმები წესებსა და პირობებს</span></label>
                                        </div>
                                    </div>
                                    <button className="usercard--submitBtn" onClick={handleNextStep}>გაგრძელება</button>
                                </div>
                            </>
                        )}

                        {currentStep === 3 && (
                            <div className="d-flex flex-column align-items-center step3">
                                <h2>დაგველოდე, მიმდინარეობს <br></br>
                                    რს-ზე ვალიდაცია</h2>
                                <div className='loader--container'>
                                    <svg width="155" height="154" viewBox="0 0 155 154" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="70.7695" width="12.5415" height="40.2474" fill="#FF6D1B" />
                                        <rect x="71.666" y="113.588" width="12.5415" height="40.2474" fill="#FF9052" />
                                        <rect width="12.5309" height="40.2813" transform="matrix(0.688531 -0.725207 0.726305 0.687372 16.125 29.6582)" fill="#FD7224" />
                                        <rect width="12.5326" height="40.2759" transform="matrix(0.74737 0.664409 -0.665594 0.746314 49.2031 101.961)" fill="#FF833D" />
                                        <rect width="12.5214" height="40.3118" transform="matrix(-0.00357863 -0.999994 0.999994 -0.00356721 0.0449219 84.2168)" fill="#FF7F37" />
                                        <rect width="12.5214" height="40.3118" transform="matrix(0.00187608 0.999998 -0.999998 0.00187009 154.977 71.5508)" fill="#FDB58D" />
                                        <rect width="12.5311" height="40.2806" transform="matrix(-0.696529 0.717528 -0.71864 -0.695382 135.32 128.182)" fill="#FC9D68" />
                                        <rect width="12.5316" height="40.2792" transform="matrix(0.712852 0.701314 -0.702453 0.71173 128.625 17.8887)" fill="#FFCDB0" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="d-flex flex-column align-items-center step3">
                                <h2 className='step--success'>თქვენ წარმატებით გაიარეთ RS-<br></br>ზე  ვალიდაცია და შეგიძლიათ <br></br> შეავსოთ დეკლარაცია</h2>
                                <button className="usercard--submitBtn" onClick={handleNextStep}>გაგრძელება</button>
                            </div>
                        )}


                        {currentStep === 5 && (
                            <h2 className='step--success'>დეკლარაციები</h2>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
}