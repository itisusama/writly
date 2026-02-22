import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import peopleData from "@/lib/people.json"
import type { Person } from "@/types"

export default function useName() {
  const [gender, setGender] = useState<string | null>(null)
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([])
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const router = useNavigate()

  useEffect(() => {
    const savedGender = localStorage.getItem("gender")
    if (!savedGender) {
      router("/")
      return
    }
    setGender(savedGender)

    const filtered = (peopleData as Person[]).filter(
      (person) => person.gender.toLowerCase() === savedGender.toLowerCase()
    )
    setFilteredPeople(filtered)
  }, [router])

  const handleSelect = (person: Person) => {
    setSelectedPerson(person)
    localStorage.setItem("selectedName", `${person.first_name} ${person.last_name}`)
  }

  const handleNext = () => {
    if (selectedPerson) {
      router("/bio")
    }
  }

  const isMale = gender === "male"
  const isReady = !!gender

  return {
    isReady,
    isMale,
    filteredPeople,
    selectedPerson,
    handleSelect,
    handleNext,
  }
}