import React, { useState } from 'react';
import { api } from '../../api/axios'; // Make sure this points to the correct API file
import './HeroSection.css';

const HeroSection = () => {
  const [code, setCode] = useState(''); // State to store the input value
  const [isLoading, setIsLoading] = useState(false); // Loading state for button
  const [verificationResult, setVerificationResult] = useState(null); // State to store API response
  const [error, setError] = useState(''); // State to store any error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setVerificationResult(null); // Reset result on new submission
    setError(''); // Reset the error on new submission

    try {
      const response = await api.post('/medicine/verification-code', { code });
      setVerificationResult(response.data); // Store API response data
    } catch (err) {
      console.error(err);
      setError('Verification failed. Please check the code and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="hero-container">
      <div className="hero-content">
        <h1>Welcome to Medic's Verify</h1>
        <p>Your most trusted Medical Source of Information.</p>
        <div className="tracker">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Example: XH562193728K"
              value={code}
              onChange={(e) => setCode(e.target.value)} 
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify Item'}
            </button>
          </form>
        </div>

        {/* Display verification result in table format */}
        {verificationResult && (
          <div className="verification-result">
            <h2>Medicine Details</h2>
            <table>
              <tbody>
                <tr>
                  <th>Name:</th>
                  <td>{verificationResult.name}</td>
                </tr>
                <tr>
                  <th>Description:</th>
                  <td>{verificationResult.description}</td>
                </tr>
                <tr>
                  <th>Manufacture Name:</th>
                  <td>{verificationResult.manufactureName}</td>
                </tr>
                <tr>
                  <th>Manufacture Date:</th>
                  <td>{new Date(verificationResult.manufactureDate).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th>Expiration Date:</th>
                  <td>{new Date(verificationResult.expirationDate).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th>Verification Code:</th>
                  <td>{verificationResult.verificationCode}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Display error message if any */}
        {error && <p className="error-message">{error}</p>}
      </div>
    </section>
  );
};

export default HeroSection;
