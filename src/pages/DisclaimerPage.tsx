// import Header from "@/components/shared/Header"
// import BaseLayout from "@/layouts/BaseLayout"  
// import disclaimerImg from "@/assets/disclaimer.png";

// export default function DisclaimerPage() {
//   return (
//     <BaseLayout>
//       <Header />

// {/* <img
//         src={disclaimerImg}
//         alt="About Us"
//         style={{
//           width: "100%",
//           height: "100vh",
//           objectFit: "fill",
//           marginTop:"-20px"
//         }} /> */}

//       <h1 className="mt-10 text-center font-bold text-4xl pb-4 text-darkorange underline capitalize">
//         Disclaimer
//       </h1>
//       <div className="flex flex-col gap-4 text-lg max-w-7xl mx-auto py-4">
//         <p>
//           Also known as also known as Ishopanishad and Vajasaneyi Samhita
//           Upanishad, the Ishavasya Upanishad, is one of the most important as
//           well as the shortest Upanishads that forms the final chapter of Shukla
//           Yajurveda Samhita.
//         </p>

//         <p>
//           In this web application the translation and interpretation have been
//           provided to in a lucid manner to enable the user to follow and
//           understand the mantras that form this Upanishad easily. The
//           translations of the of interpretations of the three principal schools
//           of Vedanta, viz. Advaita, Dvaita and Vishishtadvaita authored by the
//           Acharya-s of yore, provides an opportunity for users to understand the
//           different dimensions of the meanings of the text from different
//           authentic viewpoints.
//         </p>
//         <p>
//           The information (in the form of audio /text) contained in this
//           application is collated and compiled from various sources and may
//           differ in readings and results in variation from text to text. Hence,
//           Samskriti Foundation®, Central University of Hyderabad or Ministry of
//           Electronics and Information Technology (MeitY) will not be responsible
//           for any variations or discrepancies in the content. Nevertheless,
//           every effort has been made to ensure that the content aligns with the
//           generally accepted readings of the original sources.
//         </p>
//       </div>

//     </BaseLayout>
//   )
// }




import Header from "@/components/shared/Header";
import disclaimerImg from "@/assets/disclaimer.png";

export default function AboutUsPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />

      <img
        src={disclaimerImg}
        alt="Disclaimer Page"
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "fill",
          marginTop: "-20px",
          display: "block",
        }}
      />
    </div>
  );
}