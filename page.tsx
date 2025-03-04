import FeaturePriorityMatrix from "@/components/feature-priority-matrix"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Feature Priority Matrix</h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">Who is this for?</h2>
          <p className="mb-2">
            This tool is primarily designed for <strong>product managers</strong> to visualize and prioritize features
            based on their value to users versus cost to build.
          </p>
          <p>
            However, this prioritization approach has applications in all areas of life! Whether you're planning home
            improvements, deciding which skills to learn, or organizing your personal projects - this matrix helps you
            make better decisions about where to invest your time and resources.
          </p>
        </div>

        <p className="text-center mb-8 text-muted-foreground max-w-2xl mx-auto">
          Add features and visualize their priority based on user value and build cost. Position features on the matrix
          to help make better product decisions.
        </p>
        <FeaturePriorityMatrix />
      </div>
    </main>
  )
}
