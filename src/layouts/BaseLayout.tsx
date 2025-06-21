// import BgTop from "@/assets/bg_top.png";
// import BgBottom from "@/assets/bg_bottom.png";
import MeityLogo from "@/assets/meity-logo.png";
import SFLogo from "@/assets/sf-logo.png";
import HydLogo from "@/assets/uohyd-logo.png";
import BackgroungImage from "@/assets/BackGroundImage.png";

interface BaseLayoutProps {
  children?: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const handleClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative min-h-screen">
      {/* Full-Screen Fixed Background Image */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BackgroungImage})` }}
      ></div>

      {/* Main Container with Semi-transparent Background to Show Image */}
      <div className="relative min-h-screen z-10">
        {/* Top & Bottom Background Images */}



        {/* Page Content */}
        <div className="relative z-10">{children}</div>

        {/* Footer Section */}
        {/* <footer className="flex justify-around p-4 relative z-10"> 
          <div>
            <h2 className="font-bold text-xl text-darkbrown mb-2 ml-4">
              Sponsored By:
            </h2>
            <img
              src={MeityLogo}
              alt="Meity Logo"
              onClick={() => handleClick("https://www.meity.gov.in/")}
              className="hover:cursor-pointer h-[6rem]"
            />
          </div> 
          <div>
            <h2 className="font-bold text-xl text-darkbrown mb-2 text-center">
              Implemented By:
            </h2>
            <div className="flex gap-2">
              <img
                src={SFLogo}
                alt="Samskriti Foundation Logo"
                onClick={() => handleClick("https://samskritifoundation.org")}
                className="hover:cursor-pointer h-[6rem]"
              />
              <img
                src={HydLogo}
                alt="UOHYD Logo"
                onClick={() => handleClick("https://sanskrit.uohyd.ac.in/")}
                className="hover:cursor-pointer h-[6rem]"
              />
            </div> 
          </div>
         </footer> */}
       </div>
     </div>
  );
};

export default BaseLayout;
