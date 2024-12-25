import { Header } from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"; // Import icons
import { Timeline } from "@/components/ui/timeline";
// Define the updated interface to match the team member properties
interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image: string;
  github: string; // GitHub profile link
  linkedin: string; // LinkedIn profile link
  email: string; // Email address
}

// The teamMembers array with the updated data
const teamMembers: TeamMember[] = [
  {
    name: "Ashish Baghel",
    position: "President",
    bio: "Ashish is the President of our club. He specialises in Low Level Development.",
    image: "/images/team/Ashish.jpg",
    github: "https://github.com/ashishbaghel",
    linkedin: "https://linkedin.com/in/ashishbaghel",
    email: "ashish@community.com",
  },
  {
    name: "Shiv Vardhan Singh",
    position: "Vice President",
    bio: "Shiv specialises in current emerging web technologies.",
    image: "/images/team/shiv.jpg",
    github: "https://github.com/shivv123",
    linkedin: "https://linkedin.com/in/shivv123",
    email: "shiv@community.com",
  },
  {
    name: "Devashish Mishra",
    position: "Tech Lead",
    bio: "Backend developer specializing in building robust, scalable, and efficient server-side systems.",
    image: "/images/team/Devashish.jpg",
    github: "https://github.com/devashishmishra",
    linkedin: "https://linkedin.com/in/devashishmishra",
    email: "devashish@community.com",
  },
  {
    name: "Dhruv Bhardwaj",
    position: "Tech Lead",
    bio: "Backend Game developer specializing in building robust, scalable, and efficient server-side systems.",
    image: "/images/team/dhruv.jpg",
    github: "https://github.com/dhruvbhardwaj",
    linkedin: "https://linkedin.com/in/dhruvbhardwaj",
    email: "dhruv@community.com",
  },
  {
    name: "Akansha Jha",
    position: "Event Head",
    bio: "Akansha is the key event organiser and manager in our community ensuring the smooth ongoing of Events organised by/in community.",
    image: "/images/team/Akansha.jpg",
    github: "https://github.com/akanshajha",
    linkedin: "https://linkedin.com/in/akanshajha",
    email: "akansha@community.com",
  },
  {
    name: "Nalin Dalal",
    position: "Open Source Maintainer",
    bio: "Nalin is the key joining all these technologies and GitHub maintainer in the core community team.",
    image: "/images/team/nalin.jpg",
    github: "https://github.com/nalindalal",
    linkedin: "https://linkedin.com/in/nalindalal",
    email: "nalin@community.com",
  },
  {
    name: "Muskan Soni",
    position: "Media & Publicity Head",
    bio: "Media and Publicity Head with expertise in strategic communication, brand promotion, and audience engagement.",
    image: "/images/team/muskan.jpg",
    github: "https://github.com/muskansoni",
    linkedin: "https://linkedin.com/in/muskansoni",
    email: "muskan@community.com",
  },
  {
    name: "Shiwang Kumar Rai",
    position: "Head Discipline",
    bio: "Head of Discipline, ensuring excellence through structure, integrity, and accountability.",
    image: "/images/team/Shiwang.jpg",
    github: "https://github.com/shiwangrai",
    linkedin: "https://linkedin.com/in/shiwangrai",
    email: "shiwang@community.com",
  },
];
const timelineData = [
  {
    title: "2020",
    content: (
      <p>Launched with the vision of connecting students across disciplines.</p>
    ),
  },
  {
    title: "2021",
    content: (
      <p>
        Introduced basic club and event features to enhance user engagement.
      </p>
    ),
  },
  {
    title: "2022",
    content: (
      <p>
        Expanded to multiple colleges, fostering a broader community with chat
        rooms.
      </p>
    ),
  },
  {
    title: "2023",
    content: (
      <p>
        Integrated with major educational platforms, offering certification
        opportunities.
      </p>
    ),
  },
];

export default function TeamPage() {
  return (
    <>
      <Header />
      <main className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold">Meet Our Team</h1>
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <Card key={index} className="space-y-4">
              <CardHeader className="flex flex-col items-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="mb-4 w-32 h-32 rounded-full"
                />
                <CardTitle className="text-center">{member.name}</CardTitle>
                <CardDescription className="text-center">
                  {member.position}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{member.bio}</p>
                {/* Add icons for GitHub, LinkedIn, and Email */}
                <div className="flex justify-center mt-4 space-x-4">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="text-xl text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-400" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="text-xl text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600" />
                  </a>
                  <a href={`mailto:${member.email}`}>
                    <FaEnvelope className="text-xl text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-400" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <h2 className="mb-4 text-2xl font-bold">Club History</h2>
        <Timeline data={timelineData} />
      </main>
    </>
  );
}
