import BoxCenter from "@/slots/box-center"
import { ui } from "@/barrel/ui"
import { cn } from "@/lib/utils"
import useName from "@/hooks/useName"

const Name = () => {
  const name = useName();

  return (
    <BoxCenter>
      <div className="flex flex-col items-center gap-8 w-full max-w-4xl px-4">
        <ui.Heading
          heading="Choose a Name"
          subheading={  `Showing ${name.isMale ? "male" : "female"} names - pick one to continue` }
        />

        {/* Names Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-screen max-h-[60vh] overflow-y-auto px-3">
          {name.filteredPeople.map((person) => {
            const isSelected = name.selectedPerson?.id === person.id
            return (
              <ui.Card
                key={person.id}
                onClick={() => name.handleSelect(person)}
                className={cn(
                  "flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-200 hover:scale-[1.03] border-2 text-center",
                  isSelected && name.isMale &&
                    "border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-lg shadow-blue-200 dark:shadow-blue-900/30",
                  isSelected && !name.isMale &&
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
                      ? name.isMale
                        ? "bg-blue-500"
                        : "bg-pink-500"
                      : name.isMale
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
                      ? name.isMale
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

        <div className="flex flex-col items-center gap-4">  
          <ui.Button
            onClick={name.handleNext}
            disabled={!name.selectedPerson}
            size="lg"
            className={cn(
              "px-12 text-base transition-all duration-200",
              name.isMale && "bg-blue-500 hover:bg-blue-600",
              !name.isMale && "bg-pink-500 hover:bg-pink-600"
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