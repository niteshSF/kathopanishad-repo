import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { useState, useEffect, useRef } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { useGetResultQuery } from "@/api/search.api"

import LightBarImg from "@/assets/abc.png"
import DarkBarImg from "@/assets/dark_bar.png"

import CustomBeatLoader from "../shared/CustomBeatLoader"
import ErrorMessage from "../shared/ErrorMessage"

import useLanguageStore from "@/store/languageStore"
import useModeStore from "@/store/modeStore"
import useSutraStore from "@/store/sutraStore"
import usePhilosophyStore from "@/store/philosophyStore"
import { Language, Mode, Philosophy } from "@/types/types"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 250)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  /* stores */
  const { setLanguage } = useLanguageStore()
  const { setMode } = useModeStore()
  const { setSutraNo, setKhandaNo } = useSutraStore()
  const { setPhilosophy } = usePhilosophyStore()

  /* API */
  const {
    data: results = [],
    isLoading,
    error,
  } = useGetResultQuery(debouncedSearchTerm)

  /* keep a debug log once per query */
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      console.log("🔍 Search API returned:", results)
      setHasFetchedOnce(true)
    } else {
      setHasFetchedOnce(false)
    }
  }, [results, debouncedSearchTerm])

  /* close dropdown when clicking outside */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (listRef.current && !listRef.current.contains(e.target as Node)) {
        setSearchTerm("")
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  /* helpers */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value)

  const handleSearchSelect = (
    lang: Language,
    modeRaw: string,
    khandaNo: number,
    sutraNo: number
  ) => {
    setLanguage(lang)
    setSutraNo(sutraNo)
    setKhandaNo(khandaNo)

    if (modeRaw === Mode.Chant) {
      setMode(Mode.Chant)
      navigate("/chant")
    } else if (modeRaw === Mode.TeachMe) {
      setMode(Mode.TeachMe)
      navigate("/teach-me")
    } else if (modeRaw.startsWith("interpretation")) {
      setMode(Mode.LearnMore)
      navigate("/learn-more")
      const [, pType] = modeRaw.split(" - ")
      if (pType) setPhilosophy(pType as Philosophy)
    }

    setSearchTerm("")
  }

  const renderResultItem = (result: (typeof results)[number], idx: number) => {
    const modeLabel =
      result.mode === Mode.Chant
        ? "Chant"
        : result.mode === Mode.TeachMe
        ? "Teach Me"
        : result.mode.startsWith("interpretation")
        ? "Learn More"
        : result.mode

    return (
      <div
        key={idx}
        onMouseEnter={() => setHoveredIndex(idx)}
        onMouseLeave={() => setHoveredIndex(null)}
        className="p-2 w-full text-darkbrown font-semibold hover:text-white flex items-center hover:cursor-pointer hover:rounded-sm"
        style={{
          backgroundImage: `url(${hoveredIndex === idx ? DarkBarImg : "none"})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() =>
          handleSearchSelect(
            result.lang,
            result.mode,
            result.khanda_no,
            result.sutra_no
          )
        }
      >
        <p className="whitespace-nowrap overflow-hidden text-ellipsis flex-[8]">
          {result.text}
        </p>
        <p className="flex-[2] text-right">
          ॥
          {result.sutra_no === 0 || result.sutra_no === -1
            ? "S"
            : result.sutra_no}
          ॥ ({modeLabel})
        </p>
      </div>
    )
  }

  return (
    <div className="relative mb-4">
      <div className="relative w-full mx-auto">
        <Input
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleInputChange}
          className="h-11 pl-10 pr-3 rounded-md w-full placeholder:text-darkbrown placeholder:font-bold border-none shadow-none focus:outline-none"
          style={{
            backgroundImage: `url(${LightBarImg})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundColor: "transparent",
          }}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-darkbrown" />
      </div>

      {searchTerm && (
        <div
          ref={listRef}
          className="absolute max-w-5xl top-12 right-10 p-2 flex flex-col gap-1 rounded-md z-10
                     max-h-[418px] overflow-y-auto"
          style={{
            backgroundImage: `url(${DarkBarImg})`,
            backgroundSize: "102% 121%",
            backgroundRepeat: "no-repeat",
          }}
        >
          {isLoading && <CustomBeatLoader />}
          {error && <ErrorMessage error="Search failed" />}

          {/* show “no results” only after first fetch */}
          {!isLoading && hasFetchedOnce && results.length === 0 && (
            <p className="text-darkbrown text-center font-semibold">
              No results found
            </p>
          )}

          {results.map(renderResultItem)}
        </div>
      )}
    </div>
  )
}

export default SearchBar
