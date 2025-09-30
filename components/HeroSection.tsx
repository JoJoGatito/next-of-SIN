export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-sin-orange to-sin-yellow dark:bg-none dark:bg-background py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
          Sunstone Inclusivity Network
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up">
          Building bridges of support and celebration for queer, disabled, and BIPOC communities
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <a href="/about" className="btn-primary inline-block">
            Learn About Us
          </a>
          <a href="/events" className="btn-secondary inline-block bg-white text-sin-orange hover:bg-gray-100">
            Upcoming Events
          </a>
        </div>
      </div>
      <div 
        className="absolute bottom-0 left-0 right-0 h-2 bg-rainbow-gradient"
        aria-hidden="true"
        role="presentation"
      ></div>
    </section>
  )
}