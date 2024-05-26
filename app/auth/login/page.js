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


  const handleSubmit = (e) => {
    e.preventDefault()
    const inputEmail = document.querySelector('input[name="email"]').value;
    const inputPassword = document.querySelector('input[name="password"]').value;

    if (inputEmail !== email || inputPassword !== password) {
     setError(1)
    } else{
      router.push('/user');
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
        </h3>
        <div>
          <input type="text" name="email" className="form-control" placeholder="ელ-ფოსტა" defaultValue={'testuser@gmail.com'}/>
          <input type="password" name="password" className="form-control mb-4" placeholder="პაროლი" defaultValue={'testPassword'}/>
          <p>
            <Link href="" className="toReset--link">
              დაგავიწყდა პაროლი?
            </Link>
          </p>
          <div className="mt-3 mb-4">
            <button type="submit" className="auth--submit__btn" onClick={handleSubmit}>
              შესვლა
            </button>
          </div>

          <div className="authForm--bottom">
            <img src="/assets/images/login-fb.png" alt="" />

            <img src="/assets/images/login-google.png" alt="" />
          </div>
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
