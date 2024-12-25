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
import emailjs from "emailjs-com"; // Import EmailJS

const EventsPage = () => {
  const user = { isAdmin: true }; // Example user object. Replace with real data.

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

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
  });

  const [registrations, setRegistrations] = useState<{
    [key: number]: boolean;
  }>(
    {}, // Initialize as an empty object
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.description) {
      const newId =
        events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1;
      setEvents([...events, { ...newEvent, id: newId }]);
      setNewEvent({ title: "", date: "", description: "" });
      showSuccessAlert("Event added successfully!");
    }
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
    showSuccessAlert("Event deleted successfully!");
  };

  // Send Email function
  const sendRegistrationEmail = (eventTitle: string, userEmail: string) => {
    emailjs
      .send(
        "env.service_id", // Replace with your service ID from EmailJS
        "template_id", // Replace with your template ID from EmailJS
        {
          user_email: userEmail,
          event_title: eventTitle,
        },
        "user_id", // Replace with your user ID from EmailJS
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
        },
        (error) => {
          console.log("Error sending email:", error);
        },
      );
  };

  const handleRegistration = (eventId: number, userEmail: string) => {
    setRegistrations((prev) => ({
      ...prev,
      [eventId]: !prev[eventId], //@ts-expect-erro: it maybe empty
    }));

    showSuccessAlert(
      registrations[eventId]
        ? "Successfully deregistered from event!"
        : "Successfully registered for event!",
    );

    // Send the email after registration
    if (!registrations[eventId]) {
      const event = events.find((event) => event.id === eventId);

      // Check if the event is defined
      if (event) {
        sendRegistrationEmail(event.title, userEmail); // Pass user email here
      } else {
        console.error("Event not found");
      }
    }
  };

  const showSuccessAlert = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const toggleAdminMode = () => {
    if (!user.isAdmin) {
      alert("You are not an admin and cannot access admin mode.");
      return;
    }
    setIsAdmin(!isAdmin);
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
              onClick={toggleAdminMode}
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
                    onClick={() =>
                      handleRegistration(event.id, "nalindalal@gmail.com")
                    } // Pass the actual user email
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
