'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPage() {
  const { isAdmin } = useAuth()
  const [clubData, setClubData] = useState({ name: '', description: '', category: '' })
  const [noteData, setNoteData] = useState({ title: '', content: '' })
  const [eventData, setEventData] = useState({ title: '', description: '', date: '' })

  if (!isAdmin) {
    return <div>Access denied. Admin privileges required.</div>
  }

  const handleClubSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement club creation logic
    console.log('Creating new club:', clubData)
    setClubData({ name: '', description: '', category: '' })
  }

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement note upload logic
    console.log('Uploading new note:', noteData)
    setNoteData({ title: '', content: '' })
  }

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement event creation logic
    console.log('Creating new event:', eventData)
    setEventData({ title: '', description: '', date: '' })
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <Tabs defaultValue="clubs">
          <TabsList>
            <TabsTrigger value="clubs">Clubs</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>
          <TabsContent value="clubs">
            <Card>
              <CardHeader>
                <CardTitle>Create New Club</CardTitle>
                <CardDescription>Add a new club to the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleClubSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={clubData.name}
                        onChange={(e) => setClubData({ ...clubData, name: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={clubData.description}
                        onChange={(e) => setClubData({ ...clubData, description: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={clubData.category}
                        onChange={(e) => setClubData({ ...clubData, category: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4">Create Club</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Note</CardTitle>
                <CardDescription>Upload a new note in Markdown format</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNoteSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={noteData.title}
                        onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="content">Content (Markdown)</Label>
                      <Textarea
                        id="content"
                        value={noteData.content}
                        onChange={(e) => setNoteData({ ...noteData, content: e.target.value })}
                        rows={10}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4">Upload Note</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Create New Event</CardTitle>
                <CardDescription>Add a new event to the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEventSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="eventTitle">Title</Label>
                      <Input
                        id="eventTitle"
                        value={eventData.title}
                        onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="eventDescription">Description</Label>
                      <Textarea
                        id="eventDescription"
                        value={eventData.description}
                        onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="eventDate">Date</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={eventData.date}
                        onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4">Create Event</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="certifications">
            <Card>
              <CardHeader>
                <CardTitle>Manage Certifications</CardTitle>
                <CardDescription>Authorize and manage event certifications</CardDescription>
              </CardHeader>
              <CardContent>
                {/* TODO: Implement certification management UI */}
                <p>Certification management functionality coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}

