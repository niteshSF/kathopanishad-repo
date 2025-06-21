import { Mode } from "@/types/types"
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

type TAudio = {
  file_path: string
}

const getAudio = async (chapter: number, number: number, mode: Mode) => {
  const response = await api.get(
    `/sutras/${GLOBAL_CONFIG.upanishad}/${chapter}/${number}/audio?mode=${mode}`
  )
  return response.data
}

export const useGetAudioQuery = (
  chapter: number,
  number: number,
  mode: Mode
) => {
  return useQuery<TAudio>({
    queryKey: ["audio", chapter, number, mode],
    queryFn: () => getAudio(chapter, number, mode),
  })
}
