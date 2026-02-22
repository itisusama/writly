import BoxCenter from "@/slots/box-center"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import useBio from "@/hooks/useBio"

const Bio = () => {
  const { bio, isMale, regenerate,handleNext } = useBio()

  if (!bio) return null

  const brothers = bio.siblings.filter((s) => s.type === "brother").length
  const sisters = bio.siblings.filter((s) => s.type === "sister").length

  const siblingText = () => {
    if (bio.siblings.length === 0) return "Only child"
    const parts: string[] = []
    if (brothers > 0) parts.push(`${brothers} brother${brothers > 1 ? "s" : ""}`)
    if (sisters > 0) parts.push(`${sisters} sister${sisters > 1 ? "s" : ""}`)
    return parts.join(" and ")
  }

  const elementEmoji: Record<string, string> = {
    Air: "💨",
    Water: "💧",
    Earth: "🌍",
    Fire: "🔥",
  }

  const settingEmoji: Record<string, string> = {
    Urban: "🏙️",
    "Water body": "🌊",
    Suburban: "🏡",
    Rural: "🌾",
  }

  return (
    <BoxCenter>
      <div className="flex flex-col items-center gap-8 w-full max-w-lg px-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Character Bio</h1>
          <p className="text-muted-foreground">Here's who you are</p>
        </div>

        {/* Bio Card */}
        <Card
          className={cn(
            "w-full p-6 space-y-6 border-2",
            isMale
              ? "border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20"
              : "border-pink-500/30 bg-pink-50/50 dark:bg-pink-950/20"
          )}
        >
          {/* Name & Gender */}
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0",
                isMale ? "bg-blue-500" : "bg-pink-500"
              )}
            >
              {bio.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <h2
                className={cn(
                  "text-xl font-bold",
                  isMale ? "text-blue-600 dark:text-blue-400" : "text-pink-600 dark:text-pink-400"
                )}
              >
                {bio.name}
              </h2>
              <p className="text-sm text-muted-foreground capitalize">{bio.gender}</p>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Info Rows */}
          <div className="space-y-4">
            {/* Occupation */}
            <div className="flex items-start gap-3">
              <span className="text-2xl">💼</span>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Occupation
                </p>
                <p className="font-semibold">{bio.occupation}</p>
              </div>
            </div>

            {/* Siblings */}
            <div className="flex items-start gap-3">
              <span className="text-2xl">👨‍👩‍👧‍👦</span>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Siblings
                </p>
                <p className="font-semibold">{siblingText()}</p>
              </div>
            </div>

            {/* Zodiac */}
            <div className="flex items-start gap-3">
              <span className="text-2xl">{elementEmoji[bio.zodiacElement]}</span>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Zodiac
                </p>
                <p className="font-semibold">
                  {bio.zodiacSign}{" "}
                  <span className="text-muted-foreground font-normal">
                    ({bio.zodiacElement} sign)
                  </span>
                </p>
              </div>
            </div>

            {/* Story Setting */}
            <div className="flex items-start gap-3">
              <span className="text-2xl">{settingEmoji[bio.storySetting]}</span>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Story Setting
                </p>
                <p className="font-semibold">{bio.storySetting}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={regenerate}
            variant="outline"
            size="lg"
            className={cn(
              "px-8",
              isMale
                ? "border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-950/30"
                : "border-pink-300 text-pink-600 hover:bg-pink-50 dark:border-pink-700 dark:text-pink-400 dark:hover:bg-pink-950/30"
            )}
          >
            Reroll
          </Button>

          <Button
            onClick={handleNext}
            size="lg"
            className={cn(
              "px-12",
              isMale ? "bg-blue-500 hover:bg-blue-600" : "bg-pink-500 hover:bg-pink-600"
            )}
          >
            Next
          </Button>
        </div>
      </div>
    </BoxCenter>
  )
}

export default Bio