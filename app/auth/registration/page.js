"use client"
import Link from "next/link";
import { useRouter } from 'next/navigation';
export default function Page() {
    const router = useRouter();

    const redirectToUserInfo = () => {
        router.push('/user');
    };
    return (
        <div className="container">


            <form action="" className="auth--form auth--form__registration">
                <h3 className="auth--form__header">
                    რეგისტრაცია

                </h3>
                <div>
                    <div className="position-relative">
                        <input type="text" name="email" className="form-control" placeholder="ელ-ფოსტა" />
                        <p className="error-password d-none">
                            ასეთი  იუზერი უკვე არსებობს
                        </p>
                    </div>
                    <div className="position-relative">
                        <input type="text" name="password" className="form-control mb-4" placeholder="პაროლი" />
                        
                    </div>
                    <div className="position-relative">
                        <input type="text" name="rpassword" className="form-control mb-4" placeholder="გაიმეორეთ პაროლი" />
                        <p className="error-password d-none">
                        პაროლები არ ემთხვევა
                        </p>
                    </div>
                    <div className="mt-5 mb-4">
                        <button type="submit" className="auth--submit__btn" onClick={redirectToUserInfo}>
                            რეგისტრაცია
                        </button>
                    </div>

                    <div className="authForm--bottom">
                        <img src="/assets/images/login-fb.png" alt="" />

                        <img src="/assets/images/login-google.png" alt="" />
                    </div>
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
