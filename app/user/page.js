export default function Page() {
    return <>

        <div className="userCard">
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <div>
                    <h2 className="userCard--header">შეიყვანეთ მონაცემები:</h2>

                    <form action={''} className="d-flex flex-column align-items-center">
                        <div className="input--container">
                            <input type="text" name="email" className="form-control" placeholder="ელ-ფოსტა" />
                            <input type="text" name="password" className="form-control " placeholder="პაროლი" />
                            <input type="text" name="mobile" className="form-control " placeholder="ტელეფონის ნომერი" />
                        </div>
                        <button className="usercard--submitBtn">გაგრძელება</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}