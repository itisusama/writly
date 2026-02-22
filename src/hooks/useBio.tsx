import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

type Gender = "male" | "female"
type ZodiacElement = "Air" | "Water" | "Earth" | "Fire"

interface Sibling {
  type: "brother" | "sister"
}

interface Bio {
  name: string
  gender: Gender
  siblings: Sibling[]
  occupation: string
  zodiacElement: ZodiacElement
  zodiacSign: string
  storySetting: string
}

const OCCUPATIONS = [
  "Software Engineer",
  "Doctor",
  "Teacher",
  "Chef",
  "Musician",
  "Architect",
  "Photographer",
  "Veterinarian",
  "Pilot",
  "Journalist",
  "Lawyer",
  "Nurse",
  "Firefighter",
  "Astronomer",
  "Marine Biologist",
  "Librarian",
  "Detective",
  "Botanist",
  "Baker",
  "Sculptor",
]

const ZODIAC_MAP: Record<ZodiacElement, { signs: string[]; setting: string }> = {
  Air: {
    signs: ["Gemini", "Libra", "Aquarius"],
    setting: "Urban",
  },
  Water: {
    signs: ["Cancer", "Scorpio", "Pisces"],
    setting: "Water body",
  },
  Earth: {
    signs: ["Taurus", "Virgo", "Capricorn"],
    setting: "Suburban",
  },
  Fire: {
    signs: ["Aries", "Leo", "Sagittarius"],
    setting: "Rural",
  },
}

const ELEMENTS: ZodiacElement[] = ["Air", "Water", "Earth", "Fire"]

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateSiblings(gender: Gender): Sibling[] {
  if (gender === "female") {
    // Must have 1 sister + random number (0-3) of other siblings
    const siblings: Sibling[] = [{ type: "sister" }]
    const extraCount = randomInt(0, 3)
    for (let i = 0; i < extraCount; i++) {
      siblings.push({ type: pickRandom(["brother", "sister"]) })
    }
    return siblings
  } else {
    // Males: could have no siblings or random (0-4)
    const count = randomInt(0, 4)
    const siblings: Sibling[] = []
    for (let i = 0; i < count; i++) {
      siblings.push({ type: pickRandom(["brother", "sister"]) })
    }
    return siblings
  }
}

function generateBio(name: string, gender: Gender): Bio {
  const siblings = generateSiblings(gender)
  const occupation = pickRandom(OCCUPATIONS)
  const zodiacElement = pickRandom(ELEMENTS)
  const zodiacSign = pickRandom(ZODIAC_MAP[zodiacElement].signs)
  const storySetting = ZODIAC_MAP[zodiacElement].setting

  return {
    name,
    gender,
    siblings,
    occupation,
    zodiacElement,
    zodiacSign,
    storySetting,
  }
}

export default function useBio() {
  const [bio, setBio] = useState<Bio | null>(null)
  const router = useNavigate()

  useEffect(() => {
    const gender = localStorage.getItem("gender") as Gender | null
    const name = localStorage.getItem("selectedName")

    if (!gender || !name) {
      router("/")
      return
    }

    // Check if bio already generated this session
    const savedBio = localStorage.getItem("bio")
    if (savedBio) {
      setBio(JSON.parse(savedBio))
      return
    }

    const generated = generateBio(name, gender)
    setBio(generated)
    localStorage.setItem("bio", JSON.stringify(generated))
  }, [router])

  const regenerate = () => {
    const gender = localStorage.getItem("gender") as Gender | null
    const name = localStorage.getItem("selectedName")
    if (!gender || !name) return

    const generated = generateBio(name, gender)
    setBio(generated)
    localStorage.setItem("bio", JSON.stringify(generated))
  }

  const handleNext = () => {
  localStorage.removeItem("gender")
  localStorage.removeItem("selectedName")
  localStorage.removeItem("selectedPersonId")
  localStorage.removeItem("bio")
  router("/")
}

  const isMale = bio?.gender === "male"

  return {
    bio,
    isMale,
    regenerate,
    handleNext,
  }
}