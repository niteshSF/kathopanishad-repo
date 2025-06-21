import { Language } from "@/types/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { GLOBAL_CONFIG } from "./config"

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

type TTransliteration = {
  id: number
  text: string
  language: Language
}

const getTransliteration = async (
  chapter: number,
  number: number,
  lang: Language
) => {
  const response = await api.get(
    `/sutras/${GLOBAL_CONFIG.upanishad}/${chapter}/${number}/transliteration?lang=${lang}`
  )
  return response.data
}

export const useGetTransliterationQuery = (
  chapter: number,
  number: number,
  lang: Language
) => {
  return useQuery<TTransliteration>({
    queryKey: ["transliterations", chapter, number, lang],
    queryFn: () => getTransliteration(chapter, number, lang),
  })
}