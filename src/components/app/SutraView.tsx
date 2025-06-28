// import { useEffect } from "react"
// import { Link } from "react-router-dom"
// import { ExternalLink } from "lucide-react"

// import { useGetSutraQuery } from "@/api/sutras.api.ts"
// import { useGetTransliterationQuery } from "@/api/transliteration.api"

// import useSutraStore from "@/store/sutraStore"
// import useLanguageStore from "@/store/languageStore"

// import HorizontalScroll from "@/assets/horizontal_scroll.png"
// import ErrorMessage from "../shared/ErrorMessage"
// import CustomBeatLoader from "../shared/CustomBeatLoader"
// import MultilineText from "../shared/MultilineText"

// const AUTO_INTERVAL_MS = 30000 // 30 seconds

// const SutraView = () => {
//   const {
//     sutra_no,
//     khanda_no,
//     chapter,
//     isComplete,
//     incrementSutra,
//     setChapter,
//   } = useSutraStore()

//   const { language } = useLanguageStore()

//   useEffect(() => {
//     setChapter(khanda_no)
//   }, [khanda_no, setChapter])

//   const { data, isLoading, error } = useGetSutraQuery(khanda_no, sutra_no)
//   const {
//     data: transliteration,
//     isLoading: isTransLoading,
//     error: transError,
//   } = useGetTransliterationQuery(khanda_no, sutra_no, language)

//   useEffect(() => {
//     if (isComplete) return
//     const t = setInterval(incrementSutra, AUTO_INTERVAL_MS)
//     return () => clearInterval(t)
//   }, [incrementSutra, isComplete])

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${HorizontalScroll})`,
//         backgroundSize: "100% 100%",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="pt-8" />

//       <div className="h-[210px] max-w-[90%] mx-auto overflow-y-auto box-content">
//         {isLoading && <CustomBeatLoader />}
//         {error && <ErrorMessage error={error.message} />}

//         {data && (
//           <>
//             <div className="flex justify-between text-lg font-bold text-darkbrown mx-4 ">
//               <Link
//                 to="/anusarak.png"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <div className="flex mt-[-5px] gap-1 items-center">
//                   Anusarak <ExternalLink size={20} />
//                 </div>
//               </Link>

//               {/* Construct ADHYAYA.VALLI.SUTRA format */}
//               <p className="bg-darkbrown rounded-sm text-white flex items-center justify-center w-20 h-10 mb-8">
//                 {khanda_no <= 3 ? "1" : "2"}.{khanda_no}.
//                 {data.number === 0 || data.number === -1 ? "S" : data.number}
//               </p>
//             </div>

//             <div className="font-bold text-darkorange mt-[-25px] text-xl text-center">
//               {data.text && <MultilineText text={data.text} />}
//             </div>
//           </>
//         )}

//         {isTransLoading && <CustomBeatLoader />}
//         {transError && <ErrorMessage error={transError.message} />}

//         {transliteration && (
//           <p className="mt-4 text-darkbrown font-semibold text-center text-xl">
//             {transliteration.text && (
//               <MultilineText text={transliteration.text} />
//             )}
//           </p>
//         )}
//       </div>

//       <div className="pb-16" />
//     </div>
//   )
// }

// export default SutraView

// ================================================================================

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ExternalLink } from "lucide-react"

import { useGetSutraQuery } from "@/api/sutras.api.ts"
import { useGetTransliterationQuery } from "@/api/transliteration.api"
import { useGetAudioQuery } from "@/api/audio.api"
import { Mode } from "@/types/types"

import useSutraStore from "@/store/sutraStore"
import useLanguageStore from "@/store/languageStore"

import HorizontalScroll from "@/assets/horizontal_scroll.png"
import ErrorMessage from "../shared/ErrorMessage"
import CustomBeatLoader from "../shared/CustomBeatLoader"
import MultilineText from "../shared/MultilineText"

const SutraView = () => {
  const {
    sutra_no,
    khanda_no,
    chapter,
    isComplete,
    incrementSutra,
    setChapter,
  } = useSutraStore()

  const { language } = useLanguageStore()

  useEffect(() => {
    setChapter(khanda_no)
  }, [khanda_no, setChapter])

  const { data, isLoading, error } = useGetSutraQuery(khanda_no, sutra_no)
  const {
    data: transliteration,
    isLoading: isTransLoading,
    error: transError,
  } = useGetTransliterationQuery(khanda_no, sutra_no, language)

  const { data: audioData } = useGetAudioQuery({
    chapter: khanda_no,
    number: sutra_no,
    mode: Mode.Chant,
  })

  return (
    <div
      style={{
        backgroundImage: `url(${HorizontalScroll})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="pt-8" />

      <div className="h-[210px] max-w-[90%] mx-auto overflow-y-auto box-content">
        {isLoading && <CustomBeatLoader />}
        {error && <ErrorMessage error={error.message} />}

        {data && (
          <>
            <div className="flex justify-between text-lg font-bold text-darkbrown mx-4 ">
              <Link
                to="/anusarak.png"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex mt-[-5px] gap-1 items-center">
                  Anusarak <ExternalLink size={20} />
                </div>
              </Link>

              {/* Construct ADHYAYA.VALLI.SUTRA format */}
              <p className="bg-darkbrown rounded-sm text-white flex items-center justify-center w-20 h-10 mb-8">
                {khanda_no <= 3 ? "1" : "2"}.{khanda_no}.
                {data.number === 0 || data.number === -1 ? "S" : data.number}
              </p>
            </div>

            <div className="font-bold text-darkorange mt-[-25px] text-xl text-center">
              {data.text && <MultilineText text={data.text} />}
            </div>
          </>
        )}

        {isTransLoading && <CustomBeatLoader />}
        {transError && <ErrorMessage error={transError.message} />}

        {transliteration && (
          <p className="mt-4 text-darkbrown font-semibold text-center text-xl">
            {transliteration.text && (
              <MultilineText text={transliteration.text} />
            )}
          </p>
        )}

        {audioData?.file_path && (
          <div className="mt-4 flex justify-center">
            <audio
              src={`/static/${audioData.file_path}`}
              autoPlay
              controls
              onEnded={() => {
                if (!isComplete) {
                  setTimeout(() => {
                    incrementSutra()
                  }, 2000) // 2-second delay
                }
              }}
            />
          </div>
        )}
      </div>

      <div className="pb-16" />
    </div>
  )
}

export default SutraView
