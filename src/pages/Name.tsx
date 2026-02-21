import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BoxCenter from "@/slots/box-center"
import { ui } from "@/barrel/ui"
import { cn } from "@/lib/utils"
import peopleData from "@/lib/people.json"
import type { Person } from "@/types"

const Name = () => {
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

    const savedPersonId = localStorage.getItem("selectedPersonId")
    if (savedPersonId) {
      const found = filtered.find((p) => p.id === parseInt(savedPersonId))
      if (found) setSelectedPerson(found)
    }
  }, [router])

  const handleSelect = (person: Person) => {
    setSelectedPerson(person)
    localStorage.setItem("selectedName", `${person.first_name} ${person.last_name}`)
  }

  const handleNext = () => {
    if (selectedPerson) {
      router("/next") // Change to your desired route
    }
  }

  const isMale = gender === "male"

  if (!gender) return null

  return (
    <BoxCenter>
      <div className="flex flex-col items-center gap-8 w-full max-w-4xl px-4">
        <ui.Heading
          heading="Choose a Name"
          subheading={  `Showing ${isMale ? "male" : "female"} names - pick one to continue` }
        />

        {/* Names Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-screen max-h-[60vh] overflow-y-auto px-3">
          {filteredPeople.map((person) => {
            const isSelected = selectedPerson?.id === person.id
            return (
              <ui.Card
                key={person.id}
                onClick={() => handleSelect(person)}
                className={cn(
                  "flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-200 hover:scale-[1.03] border-2 text-center",
                  isSelected && isMale &&
                    "border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-lg shadow-blue-200 dark:shadow-blue-900/30",
                  isSelected && !isMale &&
                    "border-pink-500 bg-pink-50 dark:bg-pink-950/30 shadow-lg shadow-pink-200 dark:shadow-pink-900/30",
                  !isSelected &&
                    "border-transparent hover:border-muted-foreground/30"
                )}
              >
                {/* Avatar circle with initial */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mb-2 transition-colors duration-200",
                    isSelected
                      ? isMale
                        ? "bg-blue-500"
                        : "bg-pink-500"
                      : isMale
                        ? "bg-blue-300 dark:bg-blue-800"
                        : "bg-pink-300 dark:bg-pink-800"
                  )}
                >
                  {person.first_name[0]}
                  {person.last_name[0]}
                </div>

                <span
                  className={cn(
                    "font-medium text-sm transition-colors duration-200",
                    isSelected
                      ? isMale
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-pink-600 dark:text-pink-400"
                      : "text-foreground"
                  )}
                >
                  {person.first_name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {person.last_name}
                </span>
              </ui.Card>
            )
          })}
        </div>

        {/* Selected indicator + Next */}
        <div className="flex flex-col items-center gap-4">
          {selectedPerson && (
            <p className="text-sm text-muted-foreground">
              Selected:{" "}
              <span
                className={cn(
                  "font-semibold",
                  isMale ? "text-blue-500" : "text-pink-500"
                )}
              >
                {selectedPerson.first_name} {selectedPerson.last_name}
              </span>
            </p>
          )}

          <ui.Button
            onClick={handleNext}
            disabled={!selectedPerson}
            size="lg"
            className={cn(
              "px-12 text-base transition-all duration-200",
              isMale && "bg-blue-500 hover:bg-blue-600",
              !isMale && "bg-pink-500 hover:bg-pink-600"
            )}
          >
            Next
          </ui.Button>
        </div>
      </div>
    </BoxCenter>
  )
}

export default Name