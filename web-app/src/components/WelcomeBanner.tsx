import logo from '../assets/TallyUp Logo.png';
import './Banner.css';

function WelcomeBanner() {
  return (
    <div className="welcome-banner">
      <div className="welcome-banner-content">
        <div className="welcome-banner-header">
          <h2 className="welcome-banner-title">
            Welcome to
          </h2>
          <img 
            src={logo}
            alt="TallyUp Logo" 
            className="welcome-banner-logo"
          />
        </div>
        <p className="welcome-banner-description">
          Your all-in-one solution for club finances and reimbursements
        </p>
      </div>
      <div className="welcome-banner-circle-1"></div>
      <div className="welcome-banner-circle-2"></div>
      <div className="welcome-banner-circle-3"></div>
    </div>
  );
}

export default WelcomeBanner;