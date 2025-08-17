import React, { useContext, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { postData } from "@/Api/personalizedApi"
import { UserContext } from "@/Context/UserContext"

const Personalized = () => {
  const { userId } = useContext(UserContext)
  const [formData, setFormData] = useState({
    userId,
    bloodSugar: "",
    systolic: "",   // Upper BP
    diastolic: "",  // Lower BP
    stepCount: "",
    burnedCalories: "",
    weight: "",
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Sending Data:", formData)

    try {
      await postData(formData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            Personalized Health Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Blood Sugar */}
            <Input
              id="bloodSugar"
              type="number"
              placeholder="Blood Sugar Level (mg/dL)"
              value={formData.bloodSugar}
              onChange={handleChange}
            />

            {/* Blood Pressure - Upper */}
            <Input
              id="systolic"
              type="number"
              placeholder="Upper Blood Pressure (mmHg)"
              value={formData.systolic}
              onChange={handleChange}
            />

            {/* Blood Pressure - Lower */}
            <Input
              id="diastolic"
              type="number"
              placeholder="Lower Blood Pressure (mmHg)"
              value={formData.diastolic}
              onChange={handleChange}
            />

            {/* Step Count */}
            <Input
              id="stepCount"
              type="number"
              placeholder="Step Count"
              value={formData.stepCount}
              onChange={handleChange}
            />

            {/* Burned Calories */}
            <Input
              id="burnedCalories"
              type="number"
              placeholder="Burned Calories"
              value={formData.burnedCalories}
              onChange={handleChange}
            />

            {/* Weight */}
            <Input
              id="weight"
              type="number"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
            />

            <Button type="submit" className="w-full mt-4">
              Save Data
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Personalized
