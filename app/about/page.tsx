import Image from 'next/image'
import { Users, Heart, Target, Sparkles } from 'lucide-react'

// Board members data
const boardMembers = [
  {
    id: 1,
    name: "JoJo",
    title: "Board Chair & Founder",
    image: "/assets/images/board/JoJo.webp",
    bio: "Visionary leader and community builder with a passion for inclusive technology. Guiding our organization's strategic direction and growth."
  },
  {
    id: 2,
    name: "Ben",
    title: "Board Member",
    image: "/assets/images/board/Ben.webp",
    bio: "Dedicated advocate for social justice and accessibility. Working to ensure all community members have equal opportunities to thrive."
  },
  {
    id: 3,
    name: "Board Member",
    title: "Coming Soon",
    image: null,
    bio: "We're looking for passionate community leaders to join our board and help shape the future of inclusivity in Southern Colorado."
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sin-orange via-sin-yellow to-sin-red py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            About Sunstone Inclusivity Network
          </h1>
          <p className="text-xl text-white/90">
            Building Community, By Community
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Our Mission</h2>
            
            <p className="text-lg mb-6 text-foreground">
              At Sunstone Inclusivity Network, we believe true belonging is built by the community, 
              for the community. Our mission is to create intentionally inclusive spaces, events, 
              groups, and clubs throughout Southern Colorado; Where everyone, especially those from 
              marginalized communities, can thrive, connect, and lead.
            </p>

            <p className="text-lg mb-6 text-foreground">
              We center LGBTQ+ individuals, people with disabilities, and communities of color, 
              ensuring that our spaces are not just welcoming but actively designed with equity, 
              accessibility, and intersectionality in mind. We challenge outdated systems of exclusion 
              and build new models of community care, empowerment, and joy.
            </p>

            <p className="text-lg mb-8 text-foreground">
              Sunstone represents resilience, warmth, and illumination. These are values that guide 
              our work as we forge a world where every person in Southern Colorado can show up 
              authentically, be celebrated, and have a voice in shaping the future.
            </p>

            <div className="bg-gradient-to-r from-sin-orange to-sin-yellow p-8 rounded-xl my-12">
              <p className="text-2xl font-bold text-white text-center">
                We're not just inclusive. We are transformative.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 gradient-text">
            What Sets Sunstone Inclusivity Network Apart
          </h2>
          
          <p className="text-lg mb-8 text-foreground">
            At Sunstone Inclusivity Network, we don't just advocate for marginalized communities; 
            we empower them to lead, build, and reclaim space. Here's what makes us different:
          </p>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-sin-orange">
              <h3 className="font-bold text-lg mb-2 text-sin-orange">Rebuilding the Table</h3>
              <p className="text-foreground">
                We don't just invite people to the table, we rebuild the table entirely; 
                Ensuring that those most impacted by exclusion are the ones designing and 
                leading our programs, events, and initiatives.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-sin-yellow">
              <h3 className="font-bold text-lg mb-2 text-sin-yellow">Intersectional Focus</h3>
              <p className="text-foreground">
                We go beyond surface-level inclusion, prioritizing LGBTQ+ individuals, 
                people with disabilities, and communities of color, especially those at 
                the intersections of these identities. Our work actively challenges 
                systemic oppression, not just addresses its symptoms.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-sin-red">
              <h3 className="font-bold text-lg mb-2 text-sin-red">True Accessibility</h3>
              <p className="text-foreground">
                Many organizations promote diversity, but we take it further by ensuring 
                our spaces are physically, socially, and culturally accessible. We embrace 
                neurodivergence, disability justice, decolonization, and community care as 
                central to our mission.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-sin-orange">
              <h3 className="font-bold text-lg mb-2 text-sin-orange">Direct Action</h3>
              <p className="text-foreground">
                We don't just host discussions, we create real change through direct support, 
                mutual aid, leadership training, and advocacy initiatives. We equip individuals 
                and organizations with tangible tools to dismantle oppressive systems.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-sin-yellow">
              <h3 className="font-bold text-lg mb-2 text-sin-yellow">Accountability</h3>
              <p className="text-foreground">
                Many organizations engage in symbolic activism without real impact. We hold 
                ourselves and others accountable to ongoing, tangible, and measurable change. 
                Our work is rooted in solidarity, not saviorism.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-sin-red">
              <h3 className="font-bold text-lg mb-2 text-sin-red">Culture Shift</h3>
              <p className="text-foreground">
                Sunstone Inclusivity Network isn't just about events and programs, it's about 
                shifting culture in Southern Colorado. We are creating new models of equity, 
                justice, and belonging that go beyond traditional non-profit structures.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-sin-red via-sin-orange to-sin-yellow p-8 rounded-xl mt-12">
            <p className="text-2xl font-bold text-white text-center">
              We don't just include. We disrupt, reimagine, and rebuild.
            </p>
          </div>
        </div>
      </section>

      {/* Board Members Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-sin-yellow">
              THE HUMANS THAT MADE THIS REALITY
            </h2>
            <p className="text-2xl text-sin-orange">
              OUR COUNCIL OF LEADERS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member) => (
              <div key={member.id} className="relative group">
                {/* Sun rays container */}
                <div className="relative">
                  {/* Sun head background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/assets/images/board/sun-head.webp"
                      alt=""
                      width={300}
                      height={300}
                      className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  
                  {/* Member photo */}
                  <div className="relative z-10 mx-auto w-48 h-48 rounded-full overflow-hidden">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-sin-orange/50 to-sin-red/50 flex items-center justify-center">
                        <Users className="w-24 h-24 text-white/50" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Member info */}
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-sin-yellow">
                    {member.name}
                  </h3>
                  <p className="text-sin-orange font-semibold mb-3">
                    {member.title}
                  </p>
                  <p className="text-gray-300 text-sm px-4">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}