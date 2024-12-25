import { Header } from '@/components/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Sponsor {
  name: string;
  description: string;
  logo: string;
  website: string;
}

const sponsors: Sponsor[] = [
  {
    name: "TechCorp",
    description: "Leading technology solutions provider",
    logo: "/placeholder.svg?height=100&width=100",
    website: "https://techcorp.example.com"
  },
  {
    name: "EduInnovate",
    description: "Innovative educational technology company",
    logo: "/placeholder.svg?height=100&width=100",
    website: "https://eduinnovate.example.com"
  },
  {
    name: "FutureFund",
    description: "Venture capital firm focusing on education and technology",
    logo: "/placeholder.svg?height=100&width=100",
    website: "https://futurefund.example.com"
  }
]

export default function SponsorsPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Our Sponsors</h1>
        <p className="mb-8">We are grateful for the support of our sponsors who help make our community possible.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsors.map((sponsor, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{sponsor.name}</CardTitle>
                <CardDescription>{sponsor.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="w-32 h-32 object-contain mb-4" />
                <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Visit Website
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  )
}

