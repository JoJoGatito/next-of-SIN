'use client'

import Image from 'next/image'
import { Users, Heart, Target, Sparkles, Award, Globe, Zap, Shield, Rocket } from 'lucide-react'
import { AccessibleGradient } from '@/components/AccessibleGradient'
import { motion } from 'framer-motion'
import { 
  AnimatedSection, 
  FloatingShape, 
  ParallaxText, 
  StaggeredContainer,
  StaggeredItem,
  MorphingBlob,
  RevealOnScroll
} from '@/components/animations/AboutAnimations'

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

// Timeline data
const timelineEvents = [
  {
    year: "Feb 2025",
    title: "SIN was created",
    description: "Sunstone Inclusivity Network was founded to build truly inclusive communities",
    icon: Sparkles,
    color: "orange"
  },
  {
    year: "May 2025",
    title: "First SYG event",
    description: "Launched our first Sunstone Youth Group event, bringing together young community members",
    icon: Users,
    color: "yellow"
  },
  {
    year: "June 2025",
    title: "Hue House is established",
    description: "Launched Hue House, a BIPOC program building secular communities and events for BIPOC folks",
    icon: Globe,
    color: "red"
  },
  {
    year: "July 2025",
    title: "First seed funding for the SYG program",
    description: "Received initial funding to expand and sustain the Sunstone Youth Group program",
    icon: Rocket,
    color: "orange"
  }
]


export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Ultra-Clean Hero Section - Seamless Design */}
      <section className="relative flex items-center justify-center bg-white dark:bg-gray-900 py-24 sm:py-32">
        {/* No gradients for completely seamless design */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.1 } 
              },
            }}
          >
            {/* Main heading with gradient accent */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                About{' '}
                <span className="relative inline-block">
                  <span className="text-brand-dark-red dark:text-sin-yellow">
                    Sunstone
                  </span>
                  {/* The animated underline is clean, I'll keep it */}
                  <motion.span 
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-brand-dark-red dark:bg-sin-yellow rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
              </h1>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-200 mt-2">
                Inclusivity Network
              </h2>
            </motion.div>

            {/* Subtitle with better typography */}
            <motion.p 
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-light max-w-3xl mx-auto mt-8"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              Building Community, <span className="font-medium text-gray-800 dark:text-gray-200">By Community</span>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section with Animations - Seamless continuation */}
      <section className="py-0 pb-16 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="prose dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-6">
              <AccessibleGradient text="Our Mission" />
            </h2>
            
            <RevealOnScroll animation="fadeUp">
              <p className="text-lg mb-6 text-foreground">
                At Sunstone Inclusivity Network, we believe true belonging is built by the community, 
                for the community. Our mission is to create intentionally inclusive spaces, events, 
                groups, and clubs throughout Southern Colorado; Where everyone, especially those from 
                marginalized communities, can thrive, connect, and lead.
              </p>
            </RevealOnScroll>

            <RevealOnScroll animation="fadeUp">
              <p className="text-lg mb-6 text-foreground">
                We center LGBTQ+ individuals, people with disabilities, and communities of color, 
                ensuring that our spaces are not just welcoming but actively designed with equity, 
                accessibility, and intersectionality in mind. We challenge outdated systems of exclusion 
                and build new models of community care, empowerment, and joy.
              </p>
            </RevealOnScroll>

            <RevealOnScroll animation="fadeUp">
              <p className="text-lg mb-8 text-foreground">
                Sunstone represents resilience, warmth, and illumination. These are values that guide 
                our work as we forge a world where every person in Southern Colorado can show up 
                authentically, be celebrated, and have a voice in shaping the future.
              </p>
            </RevealOnScroll>

            <RevealOnScroll animation="scale">
              <motion.div 
                className="bg-gradient-to-r from-sin-orange to-sin-yellow p-8 rounded-xl my-12 relative overflow-hidden"
                role="region"
                aria-label="Our values statement"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-sin-yellow to-sin-red opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <p className="text-2xl font-bold text-white text-center relative z-10">
                  We're not just inclusive. We are transformative.
                </p>
              </motion.div>
            </RevealOnScroll>
          </AnimatedSection>
        </div>
      </section>

      {/* What Sets Us Apart Section with Interactive Cards */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-950 relative">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8">
              <AccessibleGradient text="What Sets Sunstone Inclusivity Network Apart" />
            </h2>
            
            <p className="text-lg mb-8 text-foreground">
              At Sunstone Inclusivity Network, we don't just advocate for marginalized communities; 
              we empower them to lead, build, and reclaim space. Here's what makes us different:
            </p>
          </AnimatedSection>

          <StaggeredContainer className="space-y-6">
            <StaggeredItem>
              <motion.div 
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-sin-orange relative overflow-hidden group"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-sin-orange/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div 
                    className="inline-block"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Zap className="w-6 h-6 text-sin-orange mb-2" />
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2 text-sin-orange">Rebuilding the Table</h3>
                  <p className="text-foreground">
                    We don't just invite people to the table, we rebuild the table entirely; 
                    Ensuring that those most impacted by exclusion are the ones designing and 
                    leading our programs, events, and initiatives.
                  </p>
                </div>
              </motion.div>
            </StaggeredItem>

            <StaggeredItem>
              <motion.div 
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-sin-yellow relative overflow-hidden group"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-sin-yellow/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div 
                    className="inline-block"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Users className="w-6 h-6 text-sin-yellow mb-2" />
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2 text-sin-yellow">Intersectional Focus</h3>
                  <p className="text-foreground">
                    We go beyond surface-level inclusion, prioritizing LGBTQ+ individuals, 
                    people with disabilities, and communities of color, especially those at 
                    the intersections of these identities. Our work actively challenges 
                    systemic oppression, not just addresses its symptoms.
                  </p>
                </div>
              </motion.div>
            </StaggeredItem>

            <StaggeredItem>
              <motion.div 
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-sin-red relative overflow-hidden group"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-sin-red/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div 
                    className="inline-block"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Shield className="w-6 h-6 text-sin-red mb-2" />
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2 text-sin-red">True Accessibility</h3>
                  <p className="text-foreground">
                    Many organizations promote diversity, but we take it further by ensuring 
                    our spaces are physically, socially, and culturally accessible. We embrace 
                    neurodivergence, disability justice, decolonization, and community care as 
                    central to our mission.
                  </p>
                </div>
              </motion.div>
            </StaggeredItem>

            <StaggeredItem>
              <motion.div 
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-sin-orange relative overflow-hidden group"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-sin-orange/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div 
                    className="inline-block"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Target className="w-6 h-6 text-sin-orange mb-2" />
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2 text-sin-orange">Direct Action</h3>
                  <p className="text-foreground">
                    We don't just host discussions, we create real change through direct support, 
                    mutual aid, leadership training, and advocacy initiatives. We equip individuals 
                    and organizations with tangible tools to dismantle oppressive systems.
                  </p>
                </div>
              </motion.div>
            </StaggeredItem>

            <StaggeredItem>
              <motion.div 
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-sin-yellow relative overflow-hidden group"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-sin-yellow/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div 
                    className="inline-block"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Award className="w-6 h-6 text-sin-yellow mb-2" />
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2 text-sin-yellow">Accountability</h3>
                  <p className="text-foreground">
                    Many organizations engage in symbolic activism without real impact. We hold 
                    ourselves and others accountable to ongoing, tangible, and measurable change. 
                    Our work is rooted in solidarity, not saviorism.
                  </p>
                </div>
              </motion.div>
            </StaggeredItem>

            <StaggeredItem>
              <motion.div 
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-sin-red relative overflow-hidden group"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-sin-red/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div 
                    className="inline-block"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Sparkles className="w-6 h-6 text-sin-red mb-2" />
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2 text-sin-red">Culture Shift</h3>
                  <p className="text-foreground">
                    Sunstone Inclusivity Network isn't just about events and programs, it's about 
                    shifting culture in Southern Colorado. We are creating new models of equity, 
                    justice, and belonging that go beyond traditional non-profit structures.
                  </p>
                </div>
              </motion.div>
            </StaggeredItem>
          </StaggeredContainer>

          <RevealOnScroll animation="scale">
            <motion.div 
              className="bg-gradient-to-r from-sin-red via-sin-orange to-sin-yellow p-8 rounded-xl mt-12 relative overflow-hidden"
              role="region"
              aria-label="Our approach statement"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-sin-yellow via-sin-red to-sin-orange opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <p className="text-2xl font-bold text-white text-center relative z-10">
                We don't just include. We disrupt, reimagine, and rebuild.
              </p>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <AccessibleGradient text="Our Journey" />
            </h2>
          </AnimatedSection>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-sin-orange via-sin-yellow to-sin-red" />
            
            {timelineEvents.map((event, index) => {
              const Icon = event.icon
              const isLeft = index % 2 === 0
              
              // Map colors to Tailwind classes
              const colorClasses = {
                orange: 'text-sin-orange',
                yellow: 'text-sin-yellow', 
                red: 'text-sin-red'
              }
              
              const gradientClasses = {
                orange: 'from-sin-orange to-sin-yellow',
                yellow: 'from-sin-yellow to-sin-orange',
                red: 'from-sin-red to-sin-orange'
              }
              
              return (
                <RevealOnScroll key={index} animation={isLeft ? "fadeRight" : "fadeLeft"}>
                  <div className={`flex items-center mb-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <h3 className={`text-2xl font-bold ${colorClasses[event.color as keyof typeof colorClasses]} mb-2`}>
                          {event.year}
                        </h3>
                        <h4 className="text-lg font-semibold mb-2">{event.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{event.description}</p>
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      className="w-2/12 flex justify-center"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${gradientClasses[event.color as keyof typeof gradientClasses]} rounded-full flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>
                    
                    <div className="w-5/12" />
                  </div>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* Board Members Section - Subtle Separation */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white relative overflow-hidden">
        {/* Subtle background elements */}
        <FloatingShape className="top-0 left-0" size={200} color="yellow" delay={0} />
        <FloatingShape className="bottom-0 right-0" size={180} color="orange" delay={3} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark-red dark:text-sin-yellow"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              The Humans That Made This Reality
            </motion.h2>
            <motion.p 
              className="text-lg text-sin-orange dark:text-sin-orange"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our Council of Leaders
            </motion.p>
          </AnimatedSection>

          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member, index) => (
              <StaggeredItem key={member.id}>
                <motion.div 
                  className="relative group"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Sun rays container */}
                  <div className="relative">
                    {/* Sun head background - decorative */}
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center" 
                      aria-hidden="true"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                      <Image
                        src="/assets/images/board/sun-head.webp"
                        alt=""
                        width={300}
                        height={300}
                        className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        aria-hidden="true"
                      />
                    </motion.div>
                    
                    {/* Member photo with hover effect */}
                    <motion.div 
                      className="relative z-10 mx-auto w-48 h-48 rounded-full overflow-hidden"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <motion.div 
                          className="w-full h-full bg-gradient-to-br from-sin-orange/50 to-sin-red/50 flex items-center justify-center"
                          role="img"
                          aria-label="Board member position available - placeholder image"
                          whileHover={{ 
                            background: "linear-gradient(135deg, var(--sin-yellow), var(--sin-red))" 
                          }}
                        >
                          <Users className="w-24 h-24 text-white/50" aria-hidden="true" />
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  {/* Member info with staggered animation */}
                  <motion.div 
                    className="mt-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <motion.h3 
                      className="text-xl font-bold text-brand-dark-red dark:text-sin-yellow"
                      whileHover={{ scale: 1.05 }}
                    >
                      {member.name}
                    </motion.h3>
                    <p className="text-sin-orange font-semibold mb-3 text-base">
                      {member.title}
                    </p>
                    <motion.p 
                      className="text-gray-600 dark:text-gray-300 text-sm px-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {member.bio}
                    </motion.p>
                  </motion.div>
                </motion.div>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </div>
      </section>
    </div>
  )
}