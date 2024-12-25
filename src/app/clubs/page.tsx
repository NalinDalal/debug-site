'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
}

const clubs: Club[] = [
  { id: '1', name: 'Competitive Programming Club', description: 'Enhance your coding skills and compete in programming contests.', category: 'Technology' },
  { id: '2', name: 'Machine Learning Society', description: 'Explore the world of AI and machine learning through projects and workshops.', category: 'Technology' },
  { id: '3', name: 'Robotics Club', description: 'Design, build, and program robots for various competitions and exhibitions.', category: 'Technology' },
  { id: '4', name: 'Debate Society', description: 'Improve your public speaking and critical thinking skills through debates.', category: 'Communication' },
  { id: '5', name: 'Environmental Awareness Group', description: 'Promote sustainability and environmental conservation on campus.', category: 'Social' },
]

export default function ClubsPage() {
  const { user } = useAuth()
  const [selectedClub, setSelectedClub] = useState<Club | null>(null)
  const [application, setApplication] = useState({ reason: '', experience: '' })

  const handleApply = (club: Club) => {
    setSelectedClub(club)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setApplication(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitApplication = () => {
    if (selectedClub) {
      // TODO: Implement application submission logic
      console.log(`Submitting application for ${selectedClub.name}:`, application)
      setSelectedClub(null)
      setApplication({ reason: '', experience: '' })
    }
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">College Clubs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <Card key={club.id}>
              <CardHeader>
                <CardTitle>{club.name}</CardTitle>
                <CardDescription>{club.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{club.description}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleApply(club)}>Apply</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={selectedClub !== null} onOpenChange={() => setSelectedClub(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply to {selectedClub?.name}</DialogTitle>
              <DialogDescription>Please provide details for your application.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reason" className="text-right">
                  Reason for Joining
                </Label>
                <Textarea
                  id="reason"
                  name="reason"
                  className="col-span-3"
                  value={application.reason}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="experience" className="text-right">
                  Relevant Experience
                </Label>
                <Textarea
                  id="experience"
                  name="experience"
                  className="col-span-3"
                  value={application.experience}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmitApplication}>Submit Application</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </>
  )
}

