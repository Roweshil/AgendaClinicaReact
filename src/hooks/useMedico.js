import { createContext, useContext } from "react"

export const MedicoContext = createContext()

export function useMedico() {
  return useContext(MedicoContext)
}