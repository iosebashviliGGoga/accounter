
"use client"
import Link from "next/link";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';





export default function Home() {
  return (
    <main>
      <div className="container">
        <section id="whatIsAccounter">
          <div className="d-flex justify-content-between align-items-center flex-lg-row flex-column-reverse">
            <div>
              <h2>რა არის ექაუნთერი?</h2>
              <p>მცირე მეწარმეების საუკეთესო დამხმარე
                დეკლარაციების ჩასაბარებლად</p>
              <Link className="  btn--green" href={'/auth/registration'}>სცადე უფასოდ</Link>
            </div>
            <img src={`/assets/images/image 4.png`} alt="Accounter Image" className="img-fluid" />
          </div>

        </section>

      </div>
      <section className="bg-gray" id="howItWorks">
        <div className="container">
          <h2 className="text-center">როგორ მუშაობს?</h2>

          <Tabs
            defaultActiveKey="step1"
            id="howItWorksTabs"
            fill
          >
            <Tab eventKey="step1" title="რეგისტრაცია">
              <div>
                <img src={`/assets/images/image 9.png`} alt="" className='img-fluid' />
                <p>
                  რეგისტრირდები ჩვენს საიტზე და გვაკავშირებ შენს RS იუზერთან
                </p>

              </div>
            </Tab>
            <Tab eventKey="step2" title="შემოსავლების ჟურნალი">
              <div>

                <p>
                თვის განმავლობაში ბანკში ჩარიცხვები რომ გექნება, უბრალოდ დაამატებ შემოსავლების ჟურნალში
                </p>
                <img src={`/assets/images/sqrini 1 1.png`} alt="" className='img-fluid' />
              </div>
            </Tab>
            <Tab eventKey="step3" title="სალაროს ინფორმაცია">
              <div>
                <img src={`/assets/images/sqrini 2 1.png`} alt="" className='img-fluid' />
                <p>
                  ექაუნთერს  RS-დან მოაქვს სალაროს იმნფორმაცია, ამატებს ჩარიცხვებს და ამუშავებს მონაცემებს დეკლარაციის ჩასაბარებლად
                </p>

              </div>
            </Tab>
            <Tab eventKey="step4" title="დეკლარაციის შევსება">
              <div>

                <p>

                </p>
                <img src={`/assets/images/sqrini 3 1.png`} alt="" className='img-fluid' />
              </div>
            </Tab>

          </Tabs>
        </div>
      </section>

      <section id="choosePackage">
        <div className="container">
          <h2 className="text-center">
            აირჩიე სასურველი პაკეტი
          </h2>

          <div className="choosePackage--cards">
            <div className="choosePackage--card">
              <h2>
                9 ლარი <span>/ თვე</span>
              </h2>
              <ul>
                <li>  <img src={`/assets/images/check.svg`} alt="" className='img-fluid' />   მცირე მეწარმის დეკლარაციის შევსება</li>
                <li><img src={`/assets/images/check.svg`} alt="" className='img-fluid' />შემოსავლებისა და ხარჯების კონტროლი</li>
                <li><img src={`/assets/images/check.svg`} alt="" className='img-fluid' />შემოსავლების ჟურნალის წარმოება</li>
              </ul>
              <div className="d-flex justify-content-center">
                <Link className="  btn--green" href={'/auth/registration'}>სცადე უფასოდ</Link>
              </div>
            </div>

            <div className="choosePackage--card">
              <h2>
                14 ლარი <span>/ თვე</span>
              </h2>
              <ul>
                <li><img src={`/assets/images/check.svg`} alt="" className='img-fluid' />მცირე მეწარმის დეკლარაციის შევსება</li>
                <li><img src={`/assets/images/check.svg`} alt="" className='img-fluid' />შემოსავლებისა და ხარჯების კონტროლი</li>
                <li><img src={`/assets/images/check.svg`} alt="" className='img-fluid' />შემოსავლების ჟურნალის წარმოება</li>
                <li><img src={`/assets/images/check.svg`} alt="" className='img-fluid' />წინა თვეების დეკლარაციების დაზუსტება</li>
              </ul>
              <div className="d-flex justify-content-center">
                <Link className="  btn--disabled" href={'/'}>მალე დაემატება</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
