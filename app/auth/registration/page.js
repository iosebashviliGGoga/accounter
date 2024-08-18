"use client"
import { useState } from "react";
import User from "@/components/user/User";
import Link from "next/link";
import { useRouter } from 'next/navigation';
export default function Page() {
    const router = useRouter();

    const redirectToUserInfo = (e) => {
        // e.preventDefault()
        // router.push('/user');
    };

    const [error, setError] = useState(0)
    const [fillerror, setFillError] = useState(0)


    const handleRegistration = async (e) => {
        e.preventDefault()
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;
        const password2 = document.querySelector('input[name="password2"]').value;



        // API request
        if (email == '' || password == "" || password2 == "") {
            setFillError(1)
            setError(0)
        } else {
            try {
                const response = await fetch('https://dev.proservice.ge/accounnter/api/registration.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        password_confirm: password2
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Success:', data);
                    if (!data.success) {
                        console.log(data.errors.login)
                        setError(1)
                        setFillError(0)
                        document.querySelector('.auth--form__header .error-password').textContent = data.errors.errors

                    } else {
                        setError(0)
                        setFillError(0)
                        const userData = {
                            ...data.user, // Assuming data.user contains the user's profile information
                            email: email,
                            password: password
                        };
                        
                        localStorage.setItem('user', JSON.stringify(userData));
                        router.push('/user/profile')
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

    };



    return (
        <div className="container">

            {/* <User/> */}

            <form action="" className="auth--form auth--form__registration">
                <h3 className="auth--form__header">
                    რეგისტრაცია

                    <p className={`error-password ${!error ? 'd-none' : ""}`}>
                        ასეთი  იუზერი უკვე არსებობს
                    </p>
                    <p className={`error-password ${!fillerror ? 'd-none' : ""}`}>
                        გთხოვთ, შეავსეთ ყველა ველი
                    </p>
                </h3>
                <div>
                    <div className="position-relative">
                        <input type="text" name="email" className="form-control mb-4" placeholder="ელ-ფოსტა" />
                        {/* <p className="error-password d-none">
                            ასეთი  იუზერი უკვე არსებობს
                        </p> */}
                    </div>
                    <div className="position-relative">
                        <input type="password" name="password" className="form-control mb-4" placeholder="პაროლი" />

                    </div>
                    <div className="position-relative">
                        <input type="password" name="password2" className="form-control mb-4" placeholder="გაიმეორეთ პაროლი" />
                        {/* <p className="error-password d-none">
                            პაროლები არ ემთხვევა
                        </p> */}
                    </div>
                    <div className="mt-5 mb-4">
                        <button type="submit" className="auth--submit__btn" onClick={handleRegistration}>
                            რეგისტრაცია
                        </button>
                    </div>

                    {/* <div className="authForm--bottom">
                        <img src="/assets/images/login-fb.png" alt="" />

                        <img src="/assets/images/login-google.png" alt="" />
                    </div> */}
                </div>
            </form>


            {/* <form action="" className="auth--form d-flex flex-column justify-content-center auth--form__messageSend">
                <h3 className="auth--form__header mb-lg-5 mb-4 pb-3">
                ავტორიზაციის ბმული გამოგზავნილია ელ-ფოსტაზე
                    <p className="mt-2">g*****dze@gmail.com</p>
                </h3>

            </form> */}


        </div>
    );
}
