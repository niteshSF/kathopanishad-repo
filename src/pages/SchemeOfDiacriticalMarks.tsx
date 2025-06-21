import Header from "@/components/shared/Header";
import sdm from "@/assets/sdm.png";

export default function SchemeOfDiacriticalMarks() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />

      <img
        src={sdm}
        alt="Scheme Of Diacritical Marks"
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
