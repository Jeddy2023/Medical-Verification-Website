import React from 'react';
import './Services.css';
import ItemVerification from "../../assets/images/ItemVerification.jpg"
import IdValidation from "../../assets/images/IdValidation.jpg"
import ItemInformation from "../../assets/images/ItemInformation.jpg"

const Services = () => {
  return (
    <section className="services">
      <h1>Our Services</h1>
      <div className="services-list">
        <div className="service-item">
          <p>Drug Verification</p>
          <button>Check Authenticity</button>
          <img src={ItemVerification} alt=""/>
        </div>
        <div className="service-item">
          <p>Report Issues</p>
          <button>Report a Problem</button>
          <img src={IdValidation} alt=""/>
        </div>
        <div className="service-item">
          <p>Drug Information</p>
          <button>Find out more</button>
          <img src={ItemInformation} alt=""/>
        </div>
      </div>
    </section>
  );
};

export default Services;
