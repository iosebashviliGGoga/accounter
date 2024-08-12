"use client"

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CustomDropdownIcon from '@/components/atoms/CustomDropdownIcon';
import { useRouter } from 'next/navigation';

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


export default function User(props) {
    console.log('userrr')
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(0)
    const handleNextStep = () => {
        setCurrentStep(prevStep => prevStep + 1);
        console.log(currentStep)


    };


    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    function formatDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }

    const useAuthRedirect = () => {
        const router = useRouter();

        useEffect(() => {
            const isSigned = localStorage.getItem('isSigned');
            // if (isSigned === 'false') {
            //     router.push('/auth/login');
            // }
        }, [router]);
    };
    useAuthRedirect()
    // console.log(props.userInfo.value)   
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        RSuser: '',
        RSpassword: ''
    });

    const [error, setError] = useState(0);
    const [fillerror, setFillError] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFirstStep = () => {
        const { name, surname, phone } = formData;

        if (name === '' || surname === '' || phone === '') {
            setFillError(1);
            setError(0);
        } else {
            setCurrentStep(prevStep => prevStep + 1);
            setFillError(0);
            setError(0);
        }
    };

    const handleRSregistration = async (e) => {
        e.preventDefault();

        const { name, surname, phone, RSuser, RSpassword } = formData;
        const isTermsChecked = document.querySelector('#html').checked;

        if (RSuser === '' || RSpassword === '' || !isTermsChecked) {
            setFillError(1);
            setError(0);
        } else {
            setLoading(1)
            setCurrentStep(0)
            try {
                const response = await fetch('https://dev.proservice.ge/accounnter/api/login.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        complete_registration: "true",
                        first_name: name,
                        last_name: surname,
                        rs_username: RSuser,
                        rs_password: RSpassword,
                        phone_number: phone
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Success:', data);
                    // Handle successful registration (e.g., navigate to the next step)
                } else {
                    console.error('Error:', response.statusText);
                    alert('Registration failed. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            }
        }
    };


    return <>

        <div className="userCard--wrapper">

            <div className="userCard ">



                <div className="container">
                    {currentStep === 1 && (
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                            <div>
                                <h2 className="userCard--header">შეიყვანეთ მონაცემები:</h2>
                                <div className="d-flex flex-column align-items-center step1">
                                    <div className="input--container">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="სახელი"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="text"
                                            name="surname"
                                            className="form-control"
                                            placeholder="გვარი"
                                            value={formData.surname}
                                            onChange={handleInputChange}
                                        />
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                name="phone"
                                                className="form-control"
                                                placeholder="ტელეფონის ნომერი"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                            />
                                            <p className={`steps--error ${!fillerror ? "d-none" : ""}`}>
                                                გთხოვთ შეავსოთ ყველა ველი
                                            </p>
                                        </div>
                                    </div>
                                    <button className="usercard--submitBtn" onClick={handleFirstStep}>
                                        გაგრძელება
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                            <div>
                                <h2 className="userCard--header">შეიყვანეთ მონაცემები:</h2>
                                <div className="d-flex flex-column align-items-center step2">
                                    <div className="input--container">
                                        <input
                                            type="text"
                                            name="RSuser"
                                            className="form-control"
                                            placeholder="RS-ის მომხმარებელი"
                                            value={formData.RSuser}
                                            onChange={handleInputChange}
                                        />
                                        <div className="position-relative">
                                            <input
                                                type="password"
                                                name="RSpassword"
                                                className="form-control"
                                                placeholder="პაროლი"
                                                value={formData.RSpassword}
                                                onChange={handleInputChange}
                                            />
                                            <p className={`steps--error ${!fillerror ? "d-none" : ""}`}>
                                                გთხოვთ შეავსოთ ყველა ველი
                                            </p>
                                        </div>
                                        <div className="checkbox-wrapper">
                                            <input type="checkbox" id="html" />
                                            <label htmlFor="html">
                                                <span>ვეთანხმები წესებსა და პირობებს</span>
                                            </label>
                                        </div>
                                    </div>
                                    <button className="usercard--submitBtn" onClick={handleRSregistration}>
                                        გაგრძელება
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
               


            </div>

            {loading ? (
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

            ) : ""}
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

        <div className="userCard declarations d-none">
            <div className="declarations--tablewrapper">

                {props.userInfo?.value?.map((user) => {

                    return <p>{user.Id} ,{user.Status} ,{formatDate(user.CreationTime)}</p>
                })}
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
    </div >
    </>
}