"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Car, Umbrella, BanknoteIcon, Beer, Plus, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Define the feature type
interface Feature {
  id: string
  name: string
  value: number // 1-5 (Beer to House)
  cost: number // 1-5 (Beer to House)
}

// Value and cost options with their corresponding icons
const valueOptions = [
  { value: 5, label: "House", icon: Home, description: "Extremely valuable" },
  { value: 4, label: "Car", icon: Car, description: "Very valuable" },
  { value: 3, label: "Holiday", icon: Umbrella, description: "Moderately valuable" },
  { value: 2, label: "Money", icon: BanknoteIcon, description: "Somewhat valuable" },
  { value: 1, label: "Beer", icon: Beer, description: "Minimally valuable" },
]

const costOptions = [
  { value: 5, label: "House", icon: Home, description: "Extremely expensive" },
  { value: 4, label: "Car", icon: Car, description: "Very expensive" },
  { value: 3, label: "Holiday", icon: Umbrella, description: "Moderately expensive" },
  { value: 2, label: "Money", icon: BanknoteIcon, description: "Somewhat expensive" },
  { value: 1, label: "Beer", icon: Beer, description: "Minimally expensive" },
]

// Get background color and rank based on position in the matrix
const getBackgroundColorAndRank = (value: number, cost: number): { color: string; rank: number } => {
  const valueLabel = valueOptions.find((o) => o.value === value)?.label.toLowerCase()
  const costLabel = costOptions.find((o) => o.value === cost)?.label.toLowerCase()

  const colorAndRankMap = {
    "beer-house": { color: "bg-red-700 hover:bg-red-800", rank: 8 },
    "money-house": { color: "bg-red-500 hover:bg-red-600", rank: 7 },
    "holiday-house": { color: "bg-red-300 hover:bg-red-400", rank: 6 },
    "car-house": { color: "bg-blue-200 hover:bg-blue-300", rank: 4 },
    "house-house": { color: "bg-blue-400 hover:bg-blue-500", rank: 5 },
    "beer-car": { color: "bg-red-500 hover:bg-red-600", rank: 7 },
    "money-car": { color: "bg-red-300 hover:bg-red-400", rank: 6 },
    "holiday-car": { color: "bg-blue-200 hover:bg-blue-300", rank: 4 },
    "car-car": { color: "bg-blue-400 hover:bg-blue-500", rank: 5 },
    "house-car": { color: "bg-blue-200 hover:bg-blue-300", rank: 4 },
    "beer-holiday": { color: "bg-red-300 hover:bg-red-400", rank: 6 },
    "money-holiday": { color: "bg-blue-200 hover:bg-blue-300", rank: 4 },
    "holiday-holiday": { color: "bg-blue-400 hover:bg-blue-500", rank: 5 },
    "car-holiday": { color: "bg-blue-200 hover:bg-blue-300", rank: 4 },
    "house-holiday": { color: "bg-green-200 hover:bg-green-300", rank: 2 },
    "beer-money": { color: "bg-blue-200 hover:bg-blue-300", rank: 4 },
    "money-money": { color: "bg-blue-400 hover:bg-blue-500", rank: 5 },
    "holiday-money": { color: "bg-blue-200 hover:bg-blue-300", rank: 4 },
    "car-money": { color: "bg-green-200 hover:bg-green-300", rank: 2 },
    "house-money": { color: "bg-green-400 hover:bg-green-500", rank: 2 },
    "beer-beer": { color: "bg-blue-400 hover:bg-blue-500", rank: 5 },
    "money-beer": { color: "bg-blue-200 hover:bg-blue-300", rank: 4 },
    "holiday-beer": { color: "bg-green-200 hover:bg-green-300", rank: 2 },
    "car-beer": { color: "bg-green-400 hover:bg-green-500", rank: 2 },
    "house-beer": { color: "bg-green-600 hover:bg-green-700", rank: 1 },
  }

  const key = `${valueLabel}-${costLabel}` as keyof typeof colorAndRankMap
  return colorAndRankMap[key] || { color: "bg-gray-100 hover:bg-gray-200", rank: 0 }
}

export default function FeaturePriorityMatrix() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [newFeature, setNewFeature] = useState("")
  const [newValue, setNewValue] = useState<number | null>(null)
  const [newCost, setNewCost] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const addFeature = () => {
    if (!newFeature.trim()) {
      setError("Please enter a feature name")
      return
    }

    if (newValue === null) {
      setError("Please select a value")
      return
    }

    if (newCost === null) {
      setError("Please select a cost")
      return
    }

    if (features.length >= 10) {
      setError("Maximum of 10 features allowed")
      return
    }

    const feature: Feature = {
      id: Date.now().toString(),
      name: newFeature,
      value: newValue,
      cost: newCost,
    }

    setFeatures([...features, feature])
    setNewFeature("")
    setNewValue(null)
    setNewCost(null)
    setError(null)
  }

  const removeFeature = (id: string) => {
    setFeatures(features.filter((feature) => feature.id !== id))
  }

  // Sort features by rank
  const sortedFeatures = [...features].sort((a, b) => {
    const rankA = getBackgroundColorAndRank(a.value, a.cost).rank
    const rankB = getBackgroundColorAndRank(b.value, b.cost).rank
    return rankA - rankB
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Input Form */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Add Feature</CardTitle>
          <CardDescription>Enter feature details and rate its value to users and cost to build</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feature-name">Feature Name</Label>
              <Input
                id="feature-name"
                placeholder="Enter feature name"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="value-select">Value to User (What would you bet this has value?)</Label>
              <Select onValueChange={(value) => setNewValue(Number(value))}>
                <SelectTrigger id="value-select">
                  <SelectValue placeholder="Select value" />
                </SelectTrigger>
                <SelectContent>
                  {valueOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      <div className="flex items-center gap-2">
                        <option.icon className="h-4 w-4" />
                        <span>
                          {option.label} - {option.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost-select">Cost to Build (How much will it cost?)</Label>
              <Select onValueChange={(value) => setNewCost(Number(value))}>
                <SelectTrigger id="cost-select">
                  <SelectValue placeholder="Select cost" />
                </SelectTrigger>
                <SelectContent>
                  {costOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      <div className="flex items-center gap-2">
                        <option.icon className="h-4 w-4" />
                        <span>
                          {option.label} - {option.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardContent>
          <Button onClick={addFeature} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Feature ({features.length}/10)
          </Button>
        </CardContent>
      </Card>

      {/* Matrix Visualization */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Priority Matrix</CardTitle>
          <CardDescription>Visualize features based on their value to users vs. cost to build</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Matrix Headers */}
            <div className="flex mb-2">
              <div className="w-1/6"></div>
              <div className="w-5/6 flex justify-between px-2">
                {costOptions.map((option) => (
                  <div key={option.value} className="text-center flex flex-col items-center">
                    <option.icon className="h-6 w-6" />
                    <span className="text-xs">{option.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex">
              {/* Y-axis Labels */}
              <div className="w-1/6 flex flex-col justify-between items-center h-[400px]">
                {valueOptions.map((option) => (
                  <div key={option.value} className="text-center flex flex-col items-center">
                    <option.icon className="h-6 w-6" />
                    <span className="text-xs">{option.label}</span>
                  </div>
                ))}
              </div>

              {/* Matrix Grid */}
              <div className="w-5/6 h-[400px] grid grid-cols-5 grid-rows-5 border border-gray-200">
                {/* Generate all 25 cells (5x5 grid) */}
                {Array.from({ length: 25 }).map((_, index) => {
                  const row = Math.floor(index / 5)
                  const col = index % 5
                  const value = 5 - row // Invert row for value (5 at top, 1 at bottom)
                  const cost = 5 - col // Invert column for cost (5 at left, 1 at right)

                  // Get features in this cell
                  const cellFeatures = features.filter((f) => f.value === value && f.cost === cost)
                  const { color } = getBackgroundColorAndRank(value, cost)

                  return (
                    <div key={index} className={`border border-gray-200 p-1 ${color} relative aspect-square`}>
                      {cellFeatures.map((feature) => (
                        <div key={feature.id} className="group relative">
                          <Badge
                            key={feature.id}
                            className="m-0.5 cursor-pointer flex items-center gap-1 max-w-full overflow-hidden bg-amber-600 hover:bg-amber-700 text-white"
                            variant="secondary"
                          >
                            <span className="truncate">{feature.name}</span>
                            <button
                              onClick={() => removeFeature(feature.id)}
                              className="text-xs opacity-60 hover:opacity-100"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                          <div className="absolute z-10 hidden group-hover:block bg-white border border-gray-200 rounded-md p-2 shadow-lg min-w-[150px] max-w-[250px] -mt-1 left-0">
                            <div className="font-medium break-words">{feature.name}</div>
                            <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <span>Value: {valueOptions.find((o) => o.value === feature.value)?.label}</span>
                              <span>•</span>
                              <span>Cost: {costOptions.find((o) => o.value === feature.cost)?.label}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Axis Labels */}
            <div className="absolute -rotate-90 origin-center left-[-80px] top-1/2 text-sm font-medium w-40 text-center">
              Value to User
            </div>
            <div className="text-center text-sm font-medium mt-2">Cost to Build</div>

            {/* Quadrant Labels */}
            <div
              className="absolute top-[10%] right-[10%] text-white font-extrabold rotate-12 text-xl md:text-2xl"
              style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }}
            >
              Build this stuff
            </div>
            <div
              className="absolute bottom-[10%] left-[10%] text-white font-extrabold rotate-12 text-xl md:text-2xl"
              style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }}
            >
              Don&apos;t build it!
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature List */}
      {features.length > 0 && (
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Feature List</CardTitle>
            <CardDescription>All features you've added to the matrix, sorted by priority</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedFeatures.map((feature) => {
                const valueOption = valueOptions.find((o) => o.value === feature.value)
                const costOption = costOptions.find((o) => o.value === feature.cost)
                const { color, rank } = getBackgroundColorAndRank(feature.value, feature.cost)

                return (
                  <div key={feature.id} className={`${color} border rounded-lg p-4 flex items-center justify-between`}>
                    <div>
                      <div className="font-medium">{feature.name}</div>
                      <div className="mt-1 text-sm">
                        <span className="text-muted-foreground">Value: </span>
                        {valueOption && (
                          <span className="flex items-center gap-1 inline-flex">
                            <valueOption.icon className="h-4 w-4" />
                            {valueOption.label}
                          </span>
                        )}
                        <span className="text-muted-foreground ml-2">Cost: </span>
                        {costOption && (
                          <span className="flex items-center gap-1 inline-flex">
                            <costOption.icon className="h-4 w-4" />
                            {costOption.label}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Rank: {rank}</Badge>
                      <Button variant="ghost" size="sm" onClick={() => removeFeature(feature.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
