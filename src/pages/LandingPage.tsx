import { Link, useNavigate } from "react-router-dom";
import landingPageImage from "../assets/LandingPage.png";
import EnterButton from "../assets/EnterButton.png";
import leftLogo1 from "../assets/MeitY.png"; 
import leftLogo2 from "../assets/University_of_Hyderabad.png"; 
import NameImg from "../assets/bg-text.png";
import { IoHome } from "react-icons/io5"; 
import sf from "../assets/sf-logo-new.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Background Image */}
      <img
        src={landingPageImage}
        alt="Landing Page"
        style={{ margin: "0px", padding: "0px", width: "100%", height: "100vh" }}
      />

      {/* Top-left logos */}
      <div
        style={{
          position: "absolute",
          top: "33px",
          left: "30px",
          display: "flex",
          gap: "28px",
        }}
      >
        <a
          href="https://www.meity.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={leftLogo1} alt="MeitY" style={{ height: "82px", cursor: "pointer" }} />
        </a>
        <a
          href="https://sanskrit.uohyd.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={leftLogo2} alt="University of Hyderabad" style={{ height: "84px", cursor: "pointer" }} />
        </a>
      </div>

      {/* Top-right logo + home icon */}
      <div
        style={{
          position: "absolute",
          top: "22px",
          right: "22px",
          display: "flex",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <Link to="/" style={{ color: "#fff" }}>
          <IoHome
            size={30}
            style={{
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
            }}
          />
        </Link>
        <a
          href="https://samskritifoundation.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={sf} alt="Samskriti Foundation" style={{ height: "102px", cursor: "pointer" }} />
        </a>
      </div>

       {/* Project Name Image in Center (slightly to right) */}
      <img
        src={NameImg}
        alt="Project Name"
        style={{
          position: "absolute",
          top: "23%",
          right: "8%", 
          textAlign: "center",
          width: "52vw",
          height: "auto",
        }}
      />

      {/* Enter Button */}
<img
  src={EnterButton}
  alt="Enter"
  style={{
    position: "absolute",
    bottom: "65px",
    right: "150px",
    cursor: "pointer",
    width: "230px", 
    height: "auto", 
  }}
  onClick={() => navigate("/introduction")}
/>

    </div>
  );
};

export default LandingPage;
