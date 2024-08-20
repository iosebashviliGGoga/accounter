"use client"

import UserLayout from "@/components/user/UserLayout";

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CustomDropdownIcon from '@/components/atoms/CustomDropdownIcon';
import useAuthRedirect from '@/components/atoms/UseAuthRedirect'; // Import your custom hook
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function Page() {

    const { isUserFullyRegistered, user } = useAuthRedirect(); // Use the custom hook




    const months = [
        'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
        'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
    ];


    const [checkedItems, setCheckedItems] = useState({ checkbox1: false, checkbox2: false });

    const handlePrevious = () => {
        setCurrentMonthIndex((prevIndex) =>
            prevIndex === 0 ? 11 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentMonthIndex((prevIndex) =>
            prevIndex === 11 ? 0 : prevIndex + 1
        );
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };



    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };


    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
    const [selectedOption, setSelectedOption] = useState(1); // 1 for year, 0 for month
    const [loading, setLoading] = useState(true);
    const [monthlyExpenses, setMonthlyExpenses] = useState({});
    const [years, setYears] = useState([]); // State to hold the dynamic years

    useEffect(() => {
        const handleFirst11Fetch = async () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            setLoading(true);
            try {
                const response = await fetch('https://dev.proservice.ge/accounnter/api/declaration.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "user": {
                            email: storedUser.email,
                        },
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const outputData = data?.declaration_data?.OutputData;
                    if (outputData) {
                        const parsedOutputData = JSON.parse(outputData);
                        const expensesString = parsedOutputData.DynamicProperties?.['11TvisShemosavali'] || '';
                        const expensesArray = expensesString.split(',').filter(expense => expense !== '');

                        const expensesObject = {};
                        const yearsSet = new Set();

                        expensesArray.forEach(expense => {
                            const [date, amount] = expense.split('-');
                            const [day, month, year] = date.split('/').map(Number); // Manually parse the date
                            yearsSet.add(year); // Add year to the Set

                            if (!expensesObject[year]) {
                                expensesObject[year] = {};
                            }

                            // Months are 0-indexed in JavaScript, so adjust accordingly
                            expensesObject[year][month - 1] = parseFloat(amount) || 0;
                        });

                        setMonthlyExpenses(expensesObject);
                        setYears([...yearsSet]); // Convert Set to array and set years
                        const yearsArray = [...yearsSet];
                        setCurrentYear(yearsArray[yearsArray.length - 1]);
                    }
                } else {
                    console.error('Error:', response.statusText);
                    alert('Failed to fetch data. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        handleFirst11Fetch();
    }, []);

    const handleYearChange = (year) => {
        setCurrentYear(year);
    };


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [showError2, setShowError2] = useState(false);

    const [dateValue, setDateValue] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [numberValue, setNumberValue] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        // Calculate the current date minus one month
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 1); // Subtract one month
        const formattedDate = currentDate.toISOString().slice(0, 10); // Format as YYYY-MM-DD
        setDateValue(formattedDate);
        populateTable()
    }, []);

    const handleSubmit = async () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        // Check if any of the inputs are empty
        if (!companyName || !numberValue) {
            setShowError(true);
            return;
        }

        setShowError(false);

        // Construct the data object
        const data = {

            action: "insert",
            data: {
                declaration_date: dateValue,
                company_name: companyName,
                gel_amount: numberValue,
            },
            user: {
                email: storedUser.email
            }
        };

        try {
            // Send the POST request
            const response = await fetch('https://dev.proservice.ge/accounnter/api/user_declaration.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Handle successful submission
                //  alert('Data submitted successfully');
                const respo = await response.json();  // Add await here
                console.log(respo)
                if (respo.success) {

                    handleClose(); // Close the modal
                    populateTable()
                }

            } else {
                // Handle server error
                alert('Failed to submit data');
            }
        } catch (error) {
            // Handle network error
            alert('An error occurred while submitting the data');
        }
    };




    const populateTable = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const data = {

            action: "index",
            user: {
                email: storedUser.email
            }
        };


        fetch('https://dev.proservice.ge/accounnter/api/user_declaration.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data from the endpoint');
                }
                return response.json();
            })
            .then(data => {
                const table = document.querySelector('#monthlyDeclarations tbody');

                // Clear existing rows (optional, if you want to replace all rows)
                table.innerHTML = '';

                // Assume data is an array of objects
                data.data.forEach(item => {
                    const newRow = table.insertRow();
                    newRow.innerHTML = `
                    <td>${item.company_name}</td>
                    <td>${item.declaration_date}</td>
                    <td>${item.gel_amount}</td>
                `;
                });

            })

            .catch(error => {
                alert('An error occurred while fetching data from the endpoint');
                console.error(error);
            });
    };

    const [rsSMSerror, setRsSMSerror] = useState('')
    const [SMSError, setSMSError] = useState(0)
    const [currentStep, setCurrentStep] = useState(0);
    const handleNextStep = () => {
        setCurrentStep(prevStep => prevStep + 1);


    };

    const hanldeRSDeclaration = async () => {
        setShow2(false)
        setCurrentStep(1)

        const storedUser = JSON.parse(localStorage.getItem('user'));


        try {
            const response = await fetch('https://dev.proservice.ge/accounnter/api/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // email:"goga123s@gmail.com",
                    // password:"goga123",
                    user: {
                        email: storedUser.email,
                    },
                    action: "completeDeclaration"
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                console.log(data,data.success, data.success == true,data.getQueueItemData.Status)
                if (data.success) {
                    console.log('in data.succes')
                    if(data.getQueueItemData.Status	== 'Successful'){
                        console.log('in data.getQueueItemData.Status')
                        setCurrentStep(2)
                    } else{
                        setCurrentStep(0)
                    }
                    
                //    document.querySelector('.auth--form__header .error-password').textContent = data.message

                } else {
                    //   setError(0)
                    //   setFillError(0)
                   
                    document.querySelector('.auth--form__header .error-password').textContent = data.message
                    //   router.push('/user/profile')
                }
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

    const handleRSsms = async (e) => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const smsValue = document.querySelector('#smsV').value
        
        setCurrentStep(1)
        try {
            const response = await fetch('https://dev.proservice.ge/accounnter/api/sms_verify.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user": {
                        email: storedUser.email,
                    },
                    "itemData": {
                        "Name": "UsersCode",
                        "Priority": "High",
                        "SpecificContent": {
                            "code": smsValue
                        },
                      
                        "Progress": "new"
                    },
                    // "access_token": localStorage.getItem('access_token')
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                // document.querySelector('.profile--wrapper').classList.remove('d-none')


                //        setLoading(0)
                //        setCurrentStep(10)
                if (data.authItemData.Status == 'Successful') {
                    //  console.log(data.authItemData.Reference, data.authItemData.Id)
                    //  let referenceFor11tve = data.authItemData.Reference
                    //  let idFor11tve = data.authItemData.Id
                    setCurrentStep(3)

                    
                } else {
                    setLoading(0)
                    setCurrentStep(4)
                    setSMSError(1)
                    setFillError(0)
                    setRsSMSerror(data.message)
                }


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


    return <>


        <div>
            <div className={`userCard--wrapper ${selectedOption ? "d-none" : ""}`}>
                <div className={`${currentStep !== 0 ? "d-none" : ""}`}>
                    <div className="month-selector-container">
                        <div className="d-flex align-items-center">
                            <div className="month-selector">
                                {/* <button onClick={handlePrevious} className="arrow-button">
                                ◀
                            </button> */}
                                <span className="month-display">
                                    {months[currentMonthIndex]}
                                </span>
                                {/* <button onClick={handleNext} className="arrow-button">
                                ▶
                            </button> */}
                            </div>

                        </div>
                        <div className="radio-group">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="timeframe"
                                    value={1}
                                    checked={selectedOption == 1}
                                    onChange={() => setSelectedOption(1)}
                                    className="radio-input"
                                />
                                წელი
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="timeframe"
                                    value={0}
                                    checked={selectedOption == 0}
                                    onChange={() => setSelectedOption(0)}
                                    className="radio-input"
                                />
                                თვე
                            </label>
                        </div>
                    </div>

                    <div className="userCard declarations">
                        <div className="declarations--tablewrapper">
                            <table className='table' id="monthlyDeclarations">
                                <thead>
                                    <tr>
                                        <th>
                                            კომპანია
                                        </th>
                                        <th>თარიღი</th>
                                        {/* <th>თანხა</th> */}
                                        {/* <th>ვალუტა</th> */}
                                        <th>თანხა ლარში</th>
                                        {/* <th>რედაქტირება </th>
                                <th> წაშლა</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <tr>
                                <td>    ...</td>
                                <td><img src="/assets/images/calendar_add_on.svg" alt="" /></td>
                                <td>    ...</td>
                                <td><img src="assets/images/triangle.svg" alt="" /></td>
                            </tr> */}

                                    <tr>
                                        <td>კომპანია 45</td>
                                        <td>18.09.2023</td>
                                        {/* <td>20</td>
                                <td>GEL</td> */}
                                        <td>20</td>
                                        {/* <td><img src="/assets/images/redaction.svg" alt="" /></td>
                                <td><img src="/assets/images/deletion.svg" alt="" /></td> */}
                                    </tr>
                                    <tr>
                                        <td>კომპანია 45</td>
                                        <td>18.09.2023</td>
                                        <td>20</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="declaration--buttons">
                                <button className="usercard--submitBtn usercard--submitBtn__secondary" onClick={handleShow}>შემოსავლის დამატება</button>
                                <button className="usercard--submitBtn" onClick={handleShow2}>დეკლარაციის გაგზავნა</button>

                            </div>
                        </div>
                    </div>
                </div>


                {currentStep === 1 && (
                    <div className="userCard">
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
                    </div>

                )}
                {currentStep === 2 && (
                    <div className="userCard">
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                            <div>
                                <div className="d-flex flex-column align-items-center step3">
                                    <h2 className='step--success'>შეიყვანეთ სმს კოდი:</h2>
                                    <div className="d-flex flex-column align-items-center step2">
                                        <div className="input--container ">
                                            <div className='position-relative'>
                                                <input type="text" name="smsV" className="form-control" placeholder="" id='smsV' />
                                                <div className="d-flex justify-content-center">
                                                    <button className='resend--code'>
                                                        კოდის ხელახლა გაგზავნა
                                                    </button>
                                                </div>
                                                <p className={`steps--error code--error ${!SMSError ? 'd-none' : ""}`}>
                                                    {rsSMSerror}
                                                </p>
                                            </div>

                                        </div>
                                        <button className="usercard--submitBtn" onClick={handleRSsms}>გაგრძელება</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )}
                {currentStep === 3 && (
                    <div className="userCard">
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center px-5">
                            <div>
                                <div className="d-flex flex-column align-items-center ">
                                    <h2 className='step--success'>დეკლარაციის შევსებით შემდეგ, ნომერზე მიიღებთ დამადასტურებელ მესიჯს</h2>

                                </div>
                            </div>
                        </div>
                    </div>

                )}

            </div>
        </div>


        <div className={`userCard--wrapper ${!selectedOption ? "d-none" : ""}`}>
            <div className="month-selector-container">
                <div className="year-selector">

                    {years.map((year, index) => (
                        <React.Fragment key={year}>
                            <button
                                className={`year-button ${currentYear === year ? 'active' : ''}`}
                                onClick={() => handleYearChange(year)}
                            >
                                {year}
                            </button>
                            {index < years.length - 1 && " / "}
                        </React.Fragment>
                    ))}
                </div>
                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="timeframe1"
                            value={1}
                            checked={selectedOption == 1}
                            onChange={() => setSelectedOption(1)}
                            className="radio-input"
                        />
                        წელი
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="timeframe1"
                            value={0}
                            checked={selectedOption == 0}
                            onChange={() => setSelectedOption(0)}
                            className="radio-input"
                        />
                        თვე
                    </label>
                </div>
            </div>

            <div className="userCard declarations declarations--years">
                <div className="declarations--tablewrapper">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>
                                    თვე
                                </th>
                                <th>ბანკში ჩარიცხვები/ ტერმინალი</th>
                                <th>სალარო</th>
                                <th>ზედნადები</th>
                                <th>ჯამური  თანხა</th>

                            </tr>
                        </thead>
                        <tbody>
                            {months.map((month, index) => (
                                <tr key={index}>
                                    <td>{month}</td>
                                    <td>{monthlyExpenses[currentYear]?.[index] || '0'}</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>{monthlyExpenses[currentYear]?.[index] || '0'}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <Modal show={show} onHide={handleClose} className="message--modal">
            <Modal.Header>
                <Modal.Title>შემოსავლის დამატება</Modal.Title>
                <img src="/assets/images/close.svg" alt="" onClick={handleClose} className="message--closeBtn" />
            </Modal.Header>
            <Modal.Body>
                {/* Input for Date (Disabled) */}
                <div className="form-group">
                    <label htmlFor="dateInput">თარიღი</label>
                    <input type="date" id="dateInput" className="form-control" value={dateValue} disabled />
                </div>
                {/* Input for Company Name */}
                <div className="form-group">
                    <label htmlFor="companyName">კომპანიის სახელი</label>
                    <input
                        type="text"
                        id="companyName"
                        className="form-control"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>
                {/* Input for Number */}
                <div className="form-group">
                    <label htmlFor="numberInput">თანხა ლარში</label>
                    <input
                        type="number"
                        id="numberInput"
                        className="form-control"

                        value={numberValue}
                        onChange={(e) => setNumberValue(e.target.value)}
                    />
                </div>
                {showError && (
                    <p className="steps--error code--error">გთხოვთ, შეავსეთ ყველა ველი</p>
                )}
                <div className="d-flex justify-content-center">
                    <button className="usercard--submitBtn" onClick={handleSubmit}>
                        დამატება
                    </button>
                </div>
            </Modal.Body>
        </Modal>



        <Modal show={show2} onHide={handleClose2} className="message--modal declarations--modal">
            <Modal.Header>
                <Modal.Title>დარწმუნებული ხართ, რომ ჟურნალში მიმდინარე თვის ყველა ჩარიცხვა შეიყვანეთ?</Modal.Title>
                <img src="/assets/images/close.svg" alt="" onClick={handleClose2} className="message--closeBtn" />
            </Modal.Header>
            <Modal.Body>

                {showError2 && (
                    <p className="steps--error code--error">გთხოვთ, შეავსეთ ყველა ველი</p>
                )}
                <div className="d-flex justify-content-center">
                    <button className="usercard--submitBtn" onClick={hanldeRSDeclaration}>
                        დიახ, გააგზავნე დეკლარაცია
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    </>
    // return <UserLayout/>
}