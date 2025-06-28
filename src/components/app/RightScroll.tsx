import VScrollImg from "@/assets/vertical_scroll.png"
import TexturedButton from "../shared/TexturedButton"
import LanguageSelect from "./LanguageSelect"
import useSutraStore from "@/store/sutraStore"
import { useGetSutraListQuery } from "@/api/sutras.api.ts"
import ErrorMessage from "../shared/ErrorMessage"
import CustomBeatLoader from "../shared/CustomBeatLoader"
import SearchBar from "./SearchBar"

interface Khanda {
  number: number
  sutra_list: (number | "next")[]
}

/* ─────────── CONSTS FOR SHĀNTI MANTRAS ─────────── */
const SHANTI_1 = 0 // before Adhyāya-1
const SHANTI_2 = 7 // after  Adhyāya-2
const DEFAULT_SUTRA = 1 // fallback sutra id

const RightScroll = ({ isCommentary }: { isCommentary: boolean }) => {
  const { chapter, setChapter, setKhandaNo, setSutraNo } = useSutraStore()

  /* Helper to set all three numbers at once */
  const setBoth = (khanda: number, sutra: number) => {
    setChapter(khanda)
    setKhandaNo(khanda)
    setSutraNo(sutra)
  }

  /* Server call (still there) */
  const { error, isLoading } = useGetSutraListQuery()

  /* Demo data */
  const data: { khanda_list: Khanda[] } = {
    khanda_list: [
      { number: 1, sutra_list: [] },
      { number: 2, sutra_list: [] },
      { number: 3, sutra_list: [] },
      { number: 4, sutra_list: [] },
      { number: 5, sutra_list: [] },
      { number: 6, sutra_list: [] },
    ],
  }

  /* Split the Khandas into two Adhyāyas */
  const firstAdhyayaCount = 3
  const adhyaya1 = data.khanda_list.slice(0, firstAdhyayaCount)
  const adhyaya2 = data.khanda_list.slice(firstAdhyayaCount)

  const inAdhyaya1 = adhyaya1.some((k) => k.number === chapter)
  const inAdhyaya2 = adhyaya2.some((k) => k.number === chapter)

  /* Helper: safest first-sutra lookup */
  const firstSutra = (sutras: (number | "next")[]) =>
    (sutras.find((s) => typeof s === "number") as number | undefined) ??
    DEFAULT_SUTRA

  return (
    <div
      className="h-[640px] w-[250px] bg-cover bg-no-repeat flex flex-col items-center"
      style={{
        backgroundImage: `url(${VScrollImg})`,
        backgroundSize: "100% 100%",
        minWidth: "250px",
      }}
    >
      <div className="flex flex-col items-center mx-8 ml-10 mt-8 w-full">
        <SearchBar />

        <LanguageSelect isCommentary={!isCommentary} />

        {isLoading && <CustomBeatLoader />}
        {error && <ErrorMessage error={error.message} />}

        {/* ──────── ŚĀNTI MANTRA 1 (before Adhyāya-1) ──────── */}
        <TexturedButton
          className="mt-4 w-56 h-12 "
          selected={chapter === SHANTI_1}
          onClick={() => setBoth(SHANTI_1, DEFAULT_SUTRA)}
        >
          Shanti Mantra 1
        </TexturedButton>

        {/* ───────── ADHYĀYA 1 ───────── */}
        <TexturedButton
          className="mt-1"
          selected={inAdhyaya1}
          disabled={inAdhyaya1}
          onClick={
            inAdhyaya1
              ? undefined
              : () => {
                  const first = adhyaya1[0]
                  if (first) setBoth(first.number, firstSutra(first.sutra_list))
                }
          }
        >
          ADHYĀYA - 1
        </TexturedButton>

        {adhyaya1.map((item, idx) => (
          <TexturedButton
            key={item.number}
            selected={chapter === item.number}
            onClick={() => setBoth(item.number, firstSutra(item.sutra_list))}
            className="-mt-1"
          >
            Valli{idx + 1}
          </TexturedButton>
        ))}

        {/* ───────── ADHYĀYA 2 ───────── */}
        <TexturedButton
          className="mt-2"
          selected={inAdhyaya2}
          disabled={inAdhyaya2}
          onClick={
            inAdhyaya2
              ? undefined
              : () => {
                  const first = adhyaya2[0]
                  if (first) setBoth(first.number, firstSutra(first.sutra_list))
                }
          }
        >
          ADHYĀYA - 2
        </TexturedButton>

        {adhyaya2.map((item, idx) => (
          <TexturedButton
            key={item.number}
            selected={chapter === item.number}
            onClick={() => setBoth(item.number, firstSutra(item.sutra_list))}
            className="-mt-1"
          >
            Valli{firstAdhyayaCount + idx + 1}
          </TexturedButton>
        ))}

        {/* ──────── ŚĀNTI MANTRA 2 ──────── */}
        <TexturedButton
          className="mt-2 w-56 h-12"
          selected={chapter === SHANTI_2}
          onClick={() => setBoth(SHANTI_2, DEFAULT_SUTRA)}
        >
          Shanti Mantra 2
        </TexturedButton>
      </div>
    </div>
  )
}

export default RightScroll
