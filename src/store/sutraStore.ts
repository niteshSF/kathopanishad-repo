import { create } from "zustand"

interface State {
  sutra_no: number
  khanda_no: number
  chapter: number
  isComplete: boolean
}

interface Actions {
  setSutraNo: (sutraNo: number) => void
  setKhandaNo: (khandaNo: number) => void
  setChapter: (chapter: number) => void
  setBoth: (khandaNo: number, sutraNo: number) => void
  incrementSutra: () => void
  decrementSutra: () => void
  resetSutra: () => void
  nextKhanda: () => void
  prevKhanda: () => void
}

const MAX_SUTRA_PER_KHANDA: Record<number, number> = {
  1: 29,
  2: 25,
  3: 17,
  4: 15,
  5: 15,
  6: 18,
}

const MAX_KHANDA = Object.keys(MAX_SUTRA_PER_KHANDA).length

const useSutraStore = create<State & Actions>((set, get) => ({
  sutra_no: 1,
  khanda_no: 0,
  chapter: 1,
  isComplete: false,

  setSutraNo: (sutraNo) =>
    set(() => ({ sutra_no: sutraNo, isComplete: false })),
  setKhandaNo: (khandaNo) =>
    set(() => ({
      khanda_no: khandaNo,
      sutra_no: 1,
      chapter: khandaNo,
      isComplete: false,
    })),
  setChapter: (chapter) => set(() => ({ chapter })),

  setBoth: (khanda, sutra) =>
    set(() => ({
      khanda_no: khanda,
      sutra_no: sutra,
      chapter: khanda,
      isComplete: false,
    })),

  incrementSutra: () => {
    const { sutra_no, khanda_no } = get()
    const maxSutra = MAX_SUTRA_PER_KHANDA[khanda_no]

    // Last sutra of last kanda — stop
    if (khanda_no === MAX_KHANDA && sutra_no === maxSutra) {
      set(() => ({ isComplete: true }))
      return
    }

    // Normal increment
    if (sutra_no < maxSutra) {
      set(() => ({ sutra_no: sutra_no + 1 }))
    } else if (khanda_no < MAX_KHANDA) {
      const nextKhanda = khanda_no + 1
      set(() => ({
        khanda_no: nextKhanda,
        chapter: nextKhanda,
        sutra_no: 1,
      }))
    }
  },

  decrementSutra: () => {
    const { sutra_no, khanda_no } = get()

    if (sutra_no > 1) {
      set(() => ({ sutra_no: sutra_no - 1 }))
    } else if (khanda_no > 1) {
      const prevKhanda = khanda_no - 1
      const maxSutraPrev = MAX_SUTRA_PER_KHANDA[prevKhanda] || 1
      set(() => ({
        khanda_no: prevKhanda,
        chapter: prevKhanda,
        sutra_no: maxSutraPrev,
      }))
    }
  },

  resetSutra: () =>
    set(() => ({
      sutra_no: 1,
      khanda_no: 1,
      chapter: 1,
      isComplete: false,
    })),

  nextKhanda: () => {
    const { khanda_no } = get()
    const next = khanda_no + 1 <= MAX_KHANDA ? khanda_no + 1 : khanda_no
    set(() => ({
      khanda_no: next,
      sutra_no: 1,
      chapter: next,
      isComplete: false,
    }))
  },

  prevKhanda: () => {
    const { khanda_no } = get()
    const prev = khanda_no - 1 >= 1 ? khanda_no - 1 : khanda_no
    const maxSutra = MAX_SUTRA_PER_KHANDA[prev] || 1
    set(() => ({
      khanda_no: prev,
      sutra_no: maxSutra,
      chapter: prev,
      isComplete: false,
    }))
  },
}))

export default useSutraStore
