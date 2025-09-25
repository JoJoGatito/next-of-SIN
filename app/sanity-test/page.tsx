import { client } from '@/lib/sanity.client'
import { recentEventsQuery } from '@/lib/queries'

export default async function SanityTestPage() {
  const events = await client.fetch(recentEventsQuery)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sanity Integration Test</h1>
      <p className="mb-4 text-gray-600">
        Fetching the 3 most recent events from Sanity:
      </p>

      {events.length === 0 ? (
        <p className="text-gray-500">No events found. Create some in the Studio at /studio</p>
      ) : (
        <div className="space-y-4">
          {events.map((event: any) => (
            <div key={event._id} className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-600">
                {new Date(event.start).toLocaleString()}
                {event.end && ` - ${new Date(event.end).toLocaleString()}`}
              </p>
              {event.location && <p className="text-sm">📍 {event.location}</p>}
              {event.program && <p className="text-sm">Program: {event.program}</p>}
              {event.description && <p className="mt-2">{event.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}