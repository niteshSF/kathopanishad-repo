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

const RightScroll = ({ isCommentary }: { isCommentary: boolean }) => {
  const { chapter, setChapter, setKhandaNo, setSutraNo } = useSutraStore()

  /* Helper to set all three numbers at once */
  const setBoth = (khanda: number, sutra: number) => {
    setChapter(khanda)
    setKhandaNo(khanda)
    setSutraNo(sutra)
  }

  /* Server call (you already had this) */
  const { error, isLoading } = useGetSutraListQuery()

  /* Demo data */
  const data: { khanda_list: Khanda[] } = {
    khanda_list: [
      { number: 1, sutra_list: [1, 2, 3] },
      { number: 2, sutra_list: [1, 2, 3] },
      { number: 3, sutra_list: [1, 2, 3] },
      { number: 4, sutra_list: [1, 2, 3] },
      { number: 5, sutra_list: [1, 2, 3] },
      { number: 6, sutra_list: [1, 2, 3] },
    ],
  }
  
  /* Split the Khandas into two Adhyāyas */
  const firstAdhyayaCount = 3
  const adhyaya1 = data.khanda_list.slice(0, firstAdhyayaCount)
  const adhyaya2 = data.khanda_list.slice(firstAdhyayaCount)

  /* Is the current chapter inside Adhyāya‑1 or Adhyāya‑2? */
  const inAdhyaya1 = adhyaya1.some((k) => k.number === chapter)
  const inAdhyaya2 = adhyaya2.some((k) => k.number === chapter)

  return (
    <div
      className="h-[580px] w-[250px] bg-cover bg-no-repeat flex flex-col items-center"
      style={{
        backgroundImage: `url(${VScrollImg})`,
        backgroundSize: "100% 100%",
        minWidth: "250px",
      }}
    >
      <div className="flex flex-col items-center mx-8 ml-10 mt-10 w-full">
        <SearchBar />

        {isCommentary ? (
          <LanguageSelect isCommentary={false} />
        ) : (
          <LanguageSelect isCommentary={true} />
        )}

        {isLoading && <CustomBeatLoader />}
        {error && <ErrorMessage error={error.message} />}

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
                  if (first)
                    setBoth(first.number, first.sutra_list[0] as number)
                }
          }
        >
          ADHYĀYA - 1
        </TexturedButton>

        {adhyaya1.map((item, idx) => (
          <TexturedButton
            key={item.number}
            selected={chapter === item.number}
            onClick={() => setBoth(item.number, item.sutra_list[0] as number)}
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
                  if (first)
                    setBoth(first.number, first.sutra_list[0] as number)
                }
          }
        >
          ADHYĀYA - 2
        </TexturedButton>

        {adhyaya2.map((item, idx) => (
          <TexturedButton
            key={item.number}
            selected={chapter === item.number}
            onClick={() => setBoth(item.number, item.sutra_list[0] as number)}
            className="-mt-1"
          >
            Valli{firstAdhyayaCount + idx + 1}
          </TexturedButton>
        ))}
      </div>
    </div>
  )
}

export default RightScroll
