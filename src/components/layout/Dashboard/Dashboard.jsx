import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap';
import p1 from "../../../assets/carousel1.png"
import p2 from "../../../assets/carousel2.png"
import p3 from "../../../assets/carousel3.png"
import styles from "../navbar/navbar.module.css"
const Dashboard = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100 caroImg"
            src={p1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 style={{ display: "inline-block", position: "relative", bottom: "350px", left: "-380px", color: "#FF928B", fontSize: "60px", width: "450px", overflowWrap: "break-word", textAlign: "left" }}>Take Control of Your Privacy</h3>
            <p style={{ position: "absolute", top: "-180px", fontSize: "32px", textAlign: "left", width: "480px", left: "-90px", fontWeight: "lighter" }}>Manage and control access of your medical reports by industry leading blockchain technology</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 caroImg"
            src={p2}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Manage your reports</h3>
            <p>Give access to trusted doctors</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 caroImg"
            src={p3}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Privacy and Security assured</h3>
            <p>
              Blockchain based secure application
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className={styles.navBott}>
        <h1 style={{ color: "white", paddingTop: "10px", paddingLeft: "50px", backgroundColor:"#424874" }}>ABOUT</h1>
      </div>
      <div style={{ padding: "5%", fontSize: "22px", backgroundColor: "#323658" }}>
        <h1 style={{ color: "#FF928B", }}>
          Blockchain based Medical Records Management System
        </h1>
        <ol style={{ color: "white" }}>
          <li>Securely share your medical reports with doctors
            Your data is protected by immutable smart contract</li>
          <br />
          <li>As a doctor, you can easily access all the older records of your patients. Request your patients to grant access to you by simply searching your through the search bar. Do not forget to provide them with your metamask address to avoid ambiguity. </li><br />
          <li>MedDocs is helpful for patients to manage their reports from different hospitals and by different doctors at one platform. There is no need to maintain a different portfolio for prescriptions.In one tap you can view all your reports.</li><br />
          <li>This website can be a lifesaver in emergency situations. If you have an allergy or a certain class of drugs affect your health than you can mention it in your profile which will be visible
            to all the doctors across the globe. While prescribing medicines and performing surgeries, doctors can consider these remarks and provide drugs accordingly.</li><br />
        </ol>
        <h1 style={{ color: "#FF928B", }}>
          Future Scope
        </h1>
        <ol style={{ color: "white" }}>
          <li>Patients can book appointements with doctors and chat with them directly through the app. </li>
          <li>Users can carry out transactions for fees payment throught the application. </li>
        </ol>
      </div>

    </>
  );
}

export default Dashboard