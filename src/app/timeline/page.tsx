import { Timeline } from "@/components/ui/timeline";

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

export default function TimelinePage() {
  return (
    <div className="text-white bg-gray-900">
      <Timeline data={timelineData} />;
    </div>
  );
}
