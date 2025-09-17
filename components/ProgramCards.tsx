const programs = [
  {
    id: 1,
    title: "Sunstone Youth Group",
    slug: "sunstone-youth-group",
    description: "A safe and supportive space for LGBTQ+ youth to connect, learn, and grow together.",
    color: "bg-sin-orange",
  },
  {
    id: 2,
    title: "Rock & Stone",
    slug: "rock-and-stone",
    description: "Building resilience and community through peer support and empowerment programs.",
    color: "bg-sin-yellow",
  },
  {
    id: 3,
    title: "Dis'abitch",
    slug: "disabitch",
    description: "Celebrating and supporting the disabled community with pride, resources, and advocacy.",
    color: "bg-sin-red",
  },
  {
    id: 4,
    title: "Cafeteria Collective",
    slug: "cafeteria-collective",
    description: "Nourishing community through food justice, shared meals, and collective care.",
    color: "bg-green-500",
  },
  {
    id: 5,
    title: "Hue House",
    slug: "hue-house",
    description: "A vibrant space celebrating BIPOC artists, culture, and creative expression.",
    color: "bg-purple-500",
  },
]

export default function ProgramCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program) => (
        <div
          key={program.id}
          className="card hover:shadow-xl transition-shadow duration-300 group">
          <div className={`h-2 ${program.color} mb-4 rounded-full`}></div>
          <h3 className="text-xl font-bold mb-3 group-hover:text-sin-orange transition-colors">
            {program.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {program.description}
          </p>
          <a 
            href="/about#programs"
            className="mt-4 text-sin-orange font-semibold group-hover:translate-x-2 transition-transform inline-block">
            Learn More →
          </a>
        </div>
      ))}
    </div>
  )
}
