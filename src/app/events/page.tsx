"use client";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EventsPage = () => {
  // Initial events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Talk: AI in Healthcare",
      date: "2023-07-15",
      description:
        "Learn about the latest applications of AI in the healthcare industry.",
    },
    {
      id: 2,
      title: "Hackathon 2023",
      date: "2023-08-01",
      description:
        "Join us for a 24-hour coding challenge and showcase your skills!",
    },
    {
      id: 3,
      title: "Career Fair",
      date: "2023-09-10",
      description:
        "Meet with top employers and explore internship and job opportunities.",
    },
  ]);

  // State for new event form
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
  });

  // State for tracking registrations
  const [registrations, setRegistrations] = useState({});

  // State for admin mode
  const [isAdmin, setIsAdmin] = useState(false);

  // State for showing success messages
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handler for adding new events
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.description) {
      const newId =
        events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1;
      setEvents([...events, { ...newEvent, id: newId }]);
      setNewEvent({ title: "", date: "", description: "" });
      showSuccessAlert("Event added successfully!");
    }
  };

  // Handler for deleting events
  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
    showSuccessAlert("Event deleted successfully!");
  };

  // Handler for registering/deregistering
  const handleRegistration = (eventId) => {
    setRegistrations((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
    showSuccessAlert(
      registrations[eventId]
        ? "Successfully deregistered from event!"
        : "Successfully registered for event!",
    );
  };

  // Helper function for showing success alerts
  const showSuccessAlert = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <>
      <Header />
      <main className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="py-6 px-4 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Upcoming Events</h1>
            <Button
              variant={isAdmin ? "destructive" : "outline"}
              onClick={() => setIsAdmin(!isAdmin)}
            >
              {isAdmin ? "Exit Admin Mode" : "Admin Mode"}
            </Button>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-md">
              {successMessage}
            </div>
          )}

          {/* Admin Add Event Form */}
          {isAdmin && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New Event</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Event Title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Event Description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                />
                <Button onClick={handleAddEvent}>Add Event</Button>
              </CardContent>
            </Card>
          )}

          {/* Events Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{event.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant={
                      registrations[event.id] ? "destructive" : "default"
                    }
                    onClick={() => handleRegistration(event.id)}
                  >
                    {registrations[event.id] ? "Deregister" : "Register"}
                  </Button>
                  {isAdmin && (
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      Delete Event
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default EventsPage;
