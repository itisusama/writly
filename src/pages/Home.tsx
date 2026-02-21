import BoxCenter from "@/slots/box-center"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Mars, Venus } from "lucide-react"
import useGender from "@/hooks/useGender"

const Home = () => {
 const gender = useGender()

  return (
    <BoxCenter>
      <div className="flex flex-col items-center gap-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Choose a Gender</h1>
          <p className="text-muted-foreground">Select one to continue</p>
        </div>

        <div className="flex gap-6">
          {/* Male Card */}
          <Card
            onClick={() => gender.handleSelect("male")}
            className={cn(
              "flex flex-col items-center justify-center gap-4 p-8 w-44 h-52 cursor-pointer transition-all duration-200 hover:scale-105 border-2",
              gender.selectedGender === "male"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-lg shadow-blue-200 dark:shadow-blue-900/30"
                : "border-transparent hover:border-blue-300"
            )}
          >
            <Mars className={cn("w-12 h-12 transition-colors duration-200", gender.selectedGender === "male" ? "text-blue-500" : "text-blue-400")} />
            <span
              className={cn(
                "font-semibold text-lg transition-colors duration-200",
                gender.selectedGender === "male" ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"
              )}
            >
              Male
            </span>
          </Card>

          {/* Female Card */}
          <Card
            onClick={() => gender.handleSelect("female")}
            className={cn(
              "flex flex-col items-center justify-center gap-4 p-8 w-44 h-52 cursor-pointer transition-all duration-200 hover:scale-105 border-2",
              gender.selectedGender === "female"
                ? "border-pink-500 bg-pink-50 dark:bg-pink-950/30 shadow-lg shadow-pink-200 dark:shadow-pink-900/30"
                : "border-transparent hover:border-pink-300"
            )}
          >
          <Venus className={cn("w-12 h-12 transition-colors duration-200", gender.selectedGender === "female" ? "text-pink-500" : "text-pink-400")} />
            <span
              className={cn(
                "font-semibold text-lg transition-colors duration-200",
                gender.selectedGender === "female" ? "text-pink-600 dark:text-pink-400" : "text-muted-foreground"
              )}
            >
              Female
            </span>
          </Card>
        </div>

        <Button
          onClick={gender.handleNext}
          disabled={!gender.selectedGender}
          size="lg"
          className={cn(
            "px-12 text-base transition-all duration-200",
            gender.selectedGender === "male" && "bg-blue-500 hover:bg-blue-600",
            gender.selectedGender === "female" && "bg-pink-500 hover:bg-pink-600"
          )}
        >
          Next
        </Button>
      </div>
    </BoxCenter>
  )
}

export default Home