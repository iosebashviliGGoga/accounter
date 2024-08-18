"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const redirectToUserInfo = (e) => {
    e.preventDefault()
    router.push('/user');
  };

  const [email, setEmail] = useState('testuser@gmail.com');
  const [password, setPassword] = useState('testPassword');
  const [error, setError] = useState(0)
  const [fillerror, setFillError] = useState(0)


  const handleSubmit = (e) => {
    e.preventDefault()
    const inputEmail = document.querySelector('input[name="email"]').value;
    const inputPassword = document.querySelector('input[name="password"]').value;

    if (inputEmail !== email || inputPassword !== password) {
      setError(1)
    } else {
      // router.push('/user');
      // localStorage.setItem('isSigned', 'true');
    }
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault()
  //   const email = document.querySelector('input[name="email"]').value;
  //   const password = document.querySelector('input[name="password"]').value;


  //   try {
  //     const response = await fetch('https://dev.proservice.ge/accounnter/api/login.php', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         // email:"goga123s@gmail.com",
  //         // password:"goga123",
  //         email: email,
  //         password: password,
  //         complete_registration: "true",
  //         first_name: "გოგა",
  //         last_name: "იოსებაშვილი",
  //         rs_username: "22001007719",
  //         rs_password: "557449",
  //         phone_number: "55555"

  //       })
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('Success:', data);
  //       // Handle successful registration (e.g., navigate to the next step)
  //     } else {
  //       console.error('Error:', response.statusText);
  //       alert('Registration failed. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     alert('An error occurred. Please try again later.');
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault()

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    console.log(email,password)
    if (email == '' || password == '') {
      setError(0)
      setFillError(1)
    } else {
      try {
        const response = await fetch('https://dev.proservice.ge/accounnter/api/login.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // email:"goga123s@gmail.com",
            // password:"goga123",
            email: email,
            password: password
          })
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Success:', data);
          if (!data.success) { 
            setError(1)
            setFillError(0)
            document.querySelector('.auth--form__header .error-password').textContent = data.message

           } else{
            setError(0)
            setFillError(0)
            localStorage.setItem('user', JSON.stringify(data.user));
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


      <form action="" className="auth--form">
        <h3 className="auth--form__header">
          ავტორიზაცია
          <p className={`error-password ${!error ? "d-none" : ""}`}>
            ელ-ფოსტა ან პაროლი არასწორია!
          </p>
          <p className={`error-password ${!fillerror ? "d-none" : ""}`}>
           გთხოვთ, შეავსეთ ყველა ველი
          </p>
        </h3>
        <div>
          <input type="text" name="email" className="form-control" placeholder="ელ-ფოსტა"  />
          <input type="password" name="password" className="form-control mb-4" placeholder="პაროლი"  />
          <p>
            <Link href="" className="toReset--link">
              დაგავიწყდა პაროლი?
            </Link>
          </p>
          <div className="mt-3 mb-4">
            <button type="submit" className="auth--submit__btn" onClick={handleLogin}>
              შესვლა
            </button>
          </div>

          {/* <div className="authForm--bottom">
            <img src="/assets/images/login-fb.png" alt="" />

            <img src="/assets/images/login-google.png" alt="" />
          </div> */}
        </div>
      </form>

      {/* პაროლის აღდგენის ფორმა
      
      
      <form action="" className="auth--form d-flex flex-column justify-content-center">
        <h3 className="auth--form__header mb-lg-5 mb-4 pb-3">
          მიუთითე ელ-ფოსტა
          <p className="error-password d-none">
            ელ-ფოსტა ან პაროლი არასწორია!
          </p>
        </h3>
        <div>
          <input type="text" name="email" className="form-control" placeholder="ელ-ფოსტა" />

          <div className="mt-lg-5 mt-4 pt-lg-5  mb-4">
            <button type="submit" className="auth--submit__btn">
              პაროლის აღდგენა
            </button>
          </div>


        </div>
      </form> */}

      {/* <form action="" className="auth--form d-flex flex-column justify-content-center auth--form__messageSend">
        <h3 className="auth--form__header mb-lg-5 mb-4 pb-3">
         პაროლს აღსადგენი ბმული გამოგზავნილია ელ-ფოსტაზე
         <p className="mt-2">g*****dze@gmail.com</p>
        </h3>
       
      </form> */}

    </div>
  );
}
