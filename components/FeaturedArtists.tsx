// This will eventually be populated from Sanity CMS
const mockArtists = [
  {
    id: 1,
    name: "Jordan Rivera",
    medium: "Digital Art",
    bio: "Creating vibrant digital pieces that celebrate queer identity and culture.",
  },
  {
    id: 2,
    name: "Alex Chen",
    medium: "Photography",
    bio: "Documenting the beauty and resilience of disabled communities.",
  },
  {
    id: 3,
    name: "Maya Johnson",
    medium: "Mixed Media",
    bio: "Exploring themes of identity, heritage, and belonging through mixed media.",
  },
]

export default function FeaturedArtists() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockArtists.map((artist) => (
        <div key={artist.id} className="card group hover:shadow-xl transition-shadow">
          <div className="h-48 bg-gradient-to-br from-sin-orange to-sin-yellow rounded-lg mb-4"></div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-sin-orange transition-colors">
            {artist.name}
          </h3>
          <p className="text-sm text-sin-orange mb-2">{artist.medium}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {artist.bio}
          </p>
          <a 
            href={`/artists/${artist.id}`} 
            className="mt-4 inline-block text-sin-orange font-semibold hover:underline"
          >
            View Portfolio →
          </a>
        </div>
      ))}
    </div>
  )
}