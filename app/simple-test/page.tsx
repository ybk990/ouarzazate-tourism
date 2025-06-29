import SimpleTest from "@/components/simple-test"

export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Test Simple Backend</h1>
        <SimpleTest />
      </div>
    </div>
  )
}
