import { Suggestion } from '@/types/suggestion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface SuggestionsProps {
  suggestions: Suggestion[];
}

export function Suggestions({ suggestions }: SuggestionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {suggestions.map((suggestion) => (
        <Card key={suggestion.id}>
          <CardHeader>
            <CardTitle>{suggestion.title}</CardTitle>
            <CardDescription>{suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{suggestion.description}</p>
            <Link href={suggestion.link}>
              <Button>Learn More</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

