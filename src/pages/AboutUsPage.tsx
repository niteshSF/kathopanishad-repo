// import Header from "@/components/shared/Header"
// import BaseLayout from "@/layouts/BaseLayout"
// import aboutImg from "@/assets/about-the-project.png";

// export default function AboutUsPage() {
//   return (
//       <>
//       <BaseLayout>
//       <Header />
      
//       {/* <img
//         src={aboutImg}
//         alt="About Us"
//         style={{
//           width: "100%",
//           height: "100vh",
//           objectFit: "fill",
//           marginTop: "-20px",
//         }} /> */}

//       <h1 className="mt-10 text-center font-bold text-4xl pb-4 text-darkorange underline capitalize">
//         About the project
//       </h1>
//       <div className="flex flex-col gap-4 max-w-7xl mx-auto py-4 text-lg">
//         <p>
//           The current web-based app for an Upanishadic reader, which is part of
//           the Sanskrit Knowledge Accessor (SKA) project, aligns closely with the
//           objectives of the <strong>Bhashini program</strong> of the Ministry of
//           Electronics and Information Technology (MEITY), Government of India.
//           The Bhashini initiative aims to make digital content accessible in
//           various Indian languages, promoting inclusivity and democratizing
//           information dissemination.
//         </p>
//         <p>
//           By providing <strong>multilingual</strong> translations of the
//           Upanishads, the app supports the vision of enabling access to
//           knowledge in diverse regional languages, ensuring that individuals
//           from different linguistic backgrounds can engage with these ancient
//           texts. Additionally, the incorporation of multimedia features such as
//           audio narrations and visual aids enhances accessibility for users with
//           varying levels of literacy, furthering the program's goal of reducing
//           language barriers in the digital space.
//         </p>
//         <p>
//           This initiative also complements the government's focus on preserving
//           and promoting India's rich cultural heritage through technology,
//           reinforcing the Bhashini program’s mission to integrate linguistic
//           diversity into India’s digital ecosystem.
//         </p>
//         <p>
//           Further, this Upanishadic reader app aligns seamlessly with the
//           objectives of the{" "}
//           <strong>Sanskrit Knowledge Accessor (SKA) project,</strong> which aims
//           to digitize, analyze, and make accessible the vast repository of
//           Sanskrit texts for a global audience, and is a project headed by the
//           famous Sanskrit Scholar-technocrat Dr. Amba Kulkarni of the Central
//           University of Hyderabad, Hyderabad.
//         </p>
//       </div>
//      </BaseLayout>
//     </>
//   )
// }


import Header from "@/components/shared/Header";
import aboutImg from "@/assets/about-the-project.png";

export default function AboutUsPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />

      <img
        src={aboutImg}
        alt="About Us"
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
