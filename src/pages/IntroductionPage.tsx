import { useNavigate } from "react-router-dom";
import IntroductionImage from "../assets/intro-desktop.png";
import enterButton from "../assets/intro-enter.png";

const IntroductionPage = () => {
  const navigate = useNavigate(); // ✅ Correct way to navigate in React Router v6

  return (
    <div>
      {/* Background Image */}
      <img
        src={IntroductionImage}
        alt="Introduction Image"
        style={{ margin: "0px", padding: "0px", width: "100%", height: "100vh" }}
      />

      {/* Arrow Button */}
      <img
        src={enterButton}
        alt="Next"
        style={{ position: "absolute", bottom: "80px", right: "220px", cursor: "pointer", width: "220px" }}
        onClick={() => navigate("/chant")} // ✅ Navigate to ChantPage when clicked
      />
    </div>
  );
};

export default IntroductionPage;

