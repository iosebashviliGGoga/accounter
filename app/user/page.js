"use client"

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CustomDropdownIcon from '@/components/atoms/CustomDropdownIcon';


const names = [
    'თბილისი',
    'სვანეთი',
    'სამეგრელო',
    'კახეთი',
    'ლეჩხუმი',
    'აფხაზეთი',
    'რაჭა',
    'გურია',
    'ქვემო ქართლი',
    'შიდა ქართლი',
    'მცხეთა-მთიანეთი',
    'აჭარა',
    'იმერეთი',
];


export default function Page() {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        setCurrentStep(prevStep => prevStep + 1);
        console.log(currentStep)
        if (currentStep + 1 == 3 || currentStep + 1 == 9) {
            setTimeout(() => {
                setCurrentStep(prevStep => prevStep + 1);
            }, 2000);
        }

    };
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return <>

        <div className="userCard--wrapper">
            <div className="userCard d-none">



                {currentStep === 1 && (
                    <>
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                            <div>
                                <h2 className="userCard--header">შეიყვანეთ მონაცემები:</h2>
                                <div className="d-flex flex-column align-items-center step1">
                                    <div className="input--container ">
                                        <input type="text" name="email" className="form-control" placeholder="ელ-ფოსტა" />
                                        <input type="text" name="password" className="form-control" placeholder="პაროლი" />
                                        <input type="text" name="mobile" className="form-control" placeholder="ტელეფონის ნომერი" />
                                    </div>
                                    <button className="usercard--submitBtn" onClick={handleNextStep}>გაგრძელება</button>
                                </div>
                            </div>
                        </div>

                    </>
                )}

                {currentStep === 2 && (

                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <div>
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
                        </div>
                    </div>


                )}

                {currentStep === 3 && (
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <div>
                            <div className="d-flex flex-column align-items-center step3">
                                <h2 className='step--success'>დაგველოდე, მიმდინარეობს <br></br>
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
                        </div>
                    </div>

                )}
                {currentStep === 4 && (
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <div>
                            <div className="d-flex flex-column align-items-center step3">
                                <h2 className='step--success'>შეიყვანეთ სმს კოდი:</h2>
                                <div className="d-flex flex-column align-items-center step2">
                                    <div className="input--container ">
                                        <div className='position-relative'>
                                            <input type="text" name="RSpassword" className="form-control" placeholder="" />
                                            <div className="d-flex justify-content-center">
                                                <button className='resend--code'>
                                                    კოდის ხელახლა გაგზავნა
                                                </button>
                                            </div>
                                            {/* <p className="steps--error code--error">
                                                კოდი არასწორია!
                                            </p> */}
                                        </div>

                                    </div>
                                    <button className="usercard--submitBtn" onClick={handleNextStep}>გაგრძელება</button>
                                </div>
                            </div>
                        </div>
                    </div>

                )}


                {currentStep === 5 && (
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <div>
                            <div className="d-flex flex-column align-items-center step3">
                                <h2 className='text-center mb-4'>შეავსეთ ინფორმაციული <br></br> ჩანართი:</h2>

                                <div className="customSelects--container">
                                    <Box className="userCard--customselect">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">რეგიონი</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={age}
                                                label="რეგიონი"
                                                IconComponent={CustomDropdownIcon}
                                                onChange={handleChange}
                                            >
                                                {names.map((name) => {
                                                    return <MenuItem value={name}>{name}</MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box className="userCard--customselect">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">რაიონი/ქალაქი</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={age}
                                                label="რაიონი/ქალაქი"
                                                IconComponent={CustomDropdownIcon}
                                                onChange={handleChange}
                                            >
                                                {names.map((name) => {
                                                    return <MenuItem value={name}>{name}</MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box className="userCard--customselect">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">ქუჩა/სოფელი</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={age}
                                                label="ქუჩა/სოფელი"
                                                IconComponent={CustomDropdownIcon}
                                                onChange={handleChange}
                                            >
                                                {names.map((name) => {
                                                    return <MenuItem value={name}>{name}</MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box className="userCard--customselect">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">შენობა/ობიექტის N</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={age}
                                                label="შენობა/ობიექტის N"
                                                IconComponent={CustomDropdownIcon}
                                                onChange={handleChange}
                                            >
                                                {names.map((name) => {
                                                    return <MenuItem value={name}>{name}</MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                                <button className="usercard--submitBtn" onClick={handleNextStep}>გაგრძელება</button>
                            </div>
                        </div>
                    </div>

                )}

                {currentStep === 6 && (
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <div>
                            <div className="d-flex flex-column align-items-center step3">

                                <div className="customSelects--container">
                                    <Box className="userCard--customselect">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">ძირითადი საქმიანობა</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={age}
                                                label="ძირითადი საქმიანობა"
                                                IconComponent={CustomDropdownIcon}
                                                onChange={handleChange}
                                            >
                                                {names.map((name) => {
                                                    return <MenuItem value={name}>{name}</MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box className="userCard--customselect">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">დამატებითი საქმიანობები</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={age}
                                                label="დამატებითი საქმიანობები"
                                                IconComponent={CustomDropdownIcon}
                                                onChange={handleChange}
                                            >
                                                {names.map((name) => {
                                                    return <MenuItem value={name}>{name}</MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Box>

                                </div>
                                <button className="usercard--submitBtn" onClick={handleNextStep}>გაგრძელება</button>
                            </div>
                        </div>
                    </div>

                )}

                {currentStep === 7 && (
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center step7">
                        <div>
                            <div className="d-flex flex-column align-items-center">
                                <h2 className='text-center mb-4'>შეავსეთ ინფორმაციული <br></br> ჩანართი:</h2>
                                <div className="checkboxes--container">
                                    <div className="checkbox-wrapper">
                                        <input type="checkbox" id="html" />
                                        <label htmlFor="html"><span>დღგ (თვის)</span></label>
                                    </div>
                                    <div className="checkbox-wrapper">
                                        <input type="checkbox" id="html1" />
                                        <label htmlFor="html1"><span>მოგება (თვის)</span></label>
                                    </div>
                                    <div className="checkbox-wrapper">
                                        <input type="checkbox" id="html2" />
                                        <label htmlFor="html2"><span>აქციზი (თვის)</span></label>
                                    </div>
                                    <div className="checkbox-wrapper">
                                        <input type="checkbox" id="html3" />
                                        <label htmlFor="html3"><span>მოგება (წლის)</span></label>
                                    </div>
                                    <div className="checkbox-wrapper">
                                        <input type="checkbox" id="html4" />
                                        <label htmlFor="html4"><span>გადახდის წყაროსთან დაკავებული გადასახადი (თვის)</span></label>
                                    </div>
                                    <div className="checkbox-wrapper">
                                        <input type="checkbox" id="html5" />
                                        <label htmlFor="html5"><span>საშემოსავლო (წლის)</span></label>
                                    </div>
                                    <div className="checkbox-wrapper">
                                        <input type="checkbox" id="html6" />
                                        <label htmlFor="html6"><span>მცირე ბიზნესის საშემოსავლო (თვის)</span></label>
                                    </div>



                                </div>
                                <button className="usercard--submitBtn" onClick={handleNextStep}>გაგრძელება</button>
                            </div>
                        </div>
                    </div>

                )}

                {currentStep === 8 && (
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center ">
                        <div>
                            <div className="d-flex flex-column align-items-center">
                                <h2 className='text-center mb-4'>ობიექტების ჩამონათვალი :</h2>
                                <div className="checkboxes--container">
                                    <div className="checkbox-wrapper">
                                        <input type="checkbox" id="html" />
                                        <label htmlFor="html"><span>არ ვფლობ  ობიექტს</span></label>
                                    </div>




                                </div>
                                <button className="usercard--submitBtn" onClick={handleNextStep}>გაგრძელება</button>
                            </div>
                        </div>
                    </div>

                )}
                {currentStep === 9 && (
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <div>
                            <div className="d-flex flex-column align-items-center ">
                                <h2 className='step--success'>დაგველოდე, მიმდინარეობს <br></br>
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
                        </div>
                    </div>

                )}
                {currentStep === 10 && (
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <div>
                            <div className="d-flex flex-column align-items-center ">
                                <h2 className='step--success'>თქვენ წარმატებით გაიარეთ RS-<br></br>ზე ვალიდაცია და შეგიძლიათ <br></br> შეავსოთ დეკლარაცია</h2>
                                <button className="usercard--submitBtn" onClick={handleNextStep}>გაგრძელება</button>

                            </div>
                        </div>
                    </div>

                )}



                {currentStep === 11 && (
                    <h2 className='step--success'>დეკლარაციები</h2>
                )}

            </div>

            <div className="userCard declarations">
                <div className="declarations--tablewrapper">
                    <table className='table'>
                        <thead>
                           <tr>
                           <th>
                                კომპანია
                            </th>
                            <th>თარიღი</th>
                            <th>თანხა</th>
                            <th>ვალუტა</th>
                            <th>თანხა ლარში</th>
                            <th>რედაქტირება </th>
                            <th> წაშლა</th>
                           </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>    ...</td>
                                <td><img src="/assets/images/calendar_add_on.svg" alt="" /></td>
                                <td>    ...</td>
                                <td><img src="assets/images/triangle.svg" alt="" /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>კომპანია 45</td>
                                <td>18.09.2023</td>
                                <td>20</td>
                                <td>GEL</td>
                                <td>20</td>
                                <td><img src="/assets/images/redaction.svg" alt="" /></td>
                                <td><img src="/assets/images/deletion.svg" alt="" /></td>
                            </tr>
                            <tr>
                                <td>კომპანია 45</td>
                                <td>18.09.2023</td>
                                <td>20</td>
                                <td>GEL</td>
                                <td>20</td>
                                <td><img src="/assets/images/redaction.svg" alt="" /></td>
                                <td><img src="/assets/images/deletion.svg" alt="" /></td>
                            </tr>
                            <tr>
                                <td>კომპანია 45</td>
                                <td>18.09.2023</td>
                                <td>20</td>
                                <td>GEL</td>
                                <td>20</td>
                                <td><img src="/assets/images/redaction.svg" alt="" /></td>
                                <td><img src="/assets/images/deletion.svg" alt="" /></td>
                            </tr>
                            <tr>
                                <td>კომპანია 45</td>
                                <td>18.09.2023</td>
                                <td>20</td>
                                <td>GEL</td>
                                <td>20</td>
                                <td><img src="/assets/images/redaction.svg" alt="" /></td>
                                <td><img src="/assets/images/deletion.svg" alt="" /></td>
                            </tr>
                            <tr>
                                <td>კომპანია 45</td>
                                <td>18.09.2023</td>
                                <td>20</td>
                                <td>GEL</td>
                                <td>20</td>
                                <td><img src="/assets/images/redaction.svg" alt="" /></td>
                                <td><img src="/assets/images/deletion.svg" alt="" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}