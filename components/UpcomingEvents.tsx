import { Clock, MapPin } from 'lucide-react'

// This will eventually be populated from Sanity CMS
const mockEvents = [
  {
    id: 1,
    title: "Pride Month Kickoff",
    date: "June 1, 2024",
    time: "6:00 PM",
    location: "Community Center",
    program: "Sunstone Youth Group",
  },
  {
    id: 2,
    title: "Disability Awareness Workshop",
    date: "June 5, 2024",
    time: "2:00 PM",
    location: "Virtual",
    program: "Dis'abitch",
  },
  {
    id: 3,
    title: "Community Potluck",
    date: "June 10, 2024",
    time: "5:30 PM",
    location: "Hue House",
    program: "Cafeteria Collective",
  },
]

export default function UpcomingEvents() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockEvents.map((event) => (
        <div key={event.id} className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold">{event.title}</h3>
              <p className="text-sm text-sin-orange">{event.program}</p>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {event.date}
            </span>
          </div>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {event.time}
            </p>
            <p className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {event.location}
            </p>
          </div>
          <button className="mt-4 text-sin-orange font-semibold hover:underline">
            View Details
          </button>
        </div>
      ))}
    </div>
  )
}