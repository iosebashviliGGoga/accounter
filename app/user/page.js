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
    return <>


        <div className={`userCard--wrapper ${selectedOption ? "d-none" : ""}`}>
            <div className="month-selector-container">
                <div className="month-selector">
                    <button onClick={handlePrevious} className="arrow-button">
                        ◀
                    </button>
                    <span className="month-display">
                        {months[currentMonthIndex]}
                    </span>
                    <button onClick={handleNext} className="arrow-button">
                        ▶
                    </button>
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
                                    <td></td>
                                    <td>{monthlyExpenses[currentYear]?.[index] || '0'}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    </>
    // return <UserLayout/>
}