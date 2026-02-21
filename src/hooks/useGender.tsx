import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useGender() {
    const [selectedGender, setSelectedGender] = useState<string | null>(null)
    const router = useNavigate()

    useEffect(() => {
        const savedGender = localStorage.getItem("gender")
        if (savedGender) {
            setSelectedGender(savedGender)
        }
    }, [])

    const handleSelect = (gender: string) => {
        setSelectedGender(gender)
        localStorage.setItem("gender", gender)
    }

    const handleNext = () => {
        if (selectedGender) {
            router("/next") // Change this to your desired route
        }
    }
    return {
        selectedGender,
        handleSelect,
        handleNext
    }
}