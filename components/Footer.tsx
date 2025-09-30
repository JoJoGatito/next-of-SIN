import { Mail, MessageCircle, Facebook, Accessibility, Eye, Type } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-100 py-12 px-4 md:px-8 lg:px-16 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-sin-orange text-xl font-bold mb-4">SIN</h3>
            <p className="text-gray-300 text-sm">
              Sunstone Inclusivity Network - Building bridges of support for our communities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sin-orange font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-sin-orange transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-sin-orange transition-colors">About Us</a></li>
              <li><a href="/events" className="text-gray-300 hover:text-sin-orange transition-colors">Events</a></li>
              <li><a href="/local" className="text-gray-300 hover:text-sin-orange transition-colors">Local Community</a></li>
            </ul>
          </div>

          {/* Support Us */}
          <div>
            <h4 className="text-sin-orange font-semibold mb-4">Support Us</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/donate" className="text-gray-300 hover:text-sin-orange transition-colors">Donate</a></li>
              <li><a href="/local#resources" className="text-gray-300 hover:text-sin-orange transition-colors">Resources</a></li>
              {/* <li><a href="/local#artists" className="text-gray-300 hover:text-sin-orange transition-colors">Featured Artists</a></li> */}
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h4 className="text-sin-orange font-semibold mb-4">Connect With Us</h4>
            <div className="space-y-3">
              {/* Discord */}
              <a 
                href="https://discord.gg/5XeapVWHVv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-sin-orange transition-colors group"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Join our Discord</span>
              </a>
              
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/sunstoneinclusivitynetwork" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-sin-orange transition-colors group"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Follow on Facebook</span>
              </a>
              
              {/* Email */}
              <a 
                href="mailto:info@sunstonein.org" 
                className="flex items-center gap-2 text-gray-300 hover:text-sin-orange transition-colors group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">info@sunstonein.org</span>
              </a>
              
              {/* Location */}
              <p className="text-sm text-gray-400 mt-4">
                Pueblo, Colorado
              </p>
            </div>
          </div>
        </div>

        {/* Accessibility Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="bg-gray-800/50 dark:bg-gray-950/50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Accessibility className="w-6 h-6 text-sin-orange" />
              <h3 className="text-lg font-semibold text-sin-orange">Our Commitment to Accessibility</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <Type className="w-5 h-5 text-sin-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium mb-1">OpenDyslexic Font Support</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      We proudly use OpenDyslexic, a typeface designed to increase readability for readers with dyslexia. 
                      This font features weighted bottoms to help letters stay oriented and unique character shapes to reduce confusion.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <Eye className="w-5 h-5 text-sin-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium mb-1">WCAG 2.1 AA Compliant</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Our website follows Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, ensuring 
                      accessible color contrasts, keyboard navigation, screen reader compatibility, and clear content structure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-gray-300 text-sm">
                <span className="font-medium text-white">Need assistance?</span> If you encounter any barriers or need content in an alternative format, 
                please <a href="mailto:info@sunstonein.org" className="text-sin-orange hover:underline">contact us</a>. 
                We&apos;re committed to making our resources accessible to everyone.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 Sunstone Inclusivity Network. All rights reserved.
            </p>
            
            {/* Social Links for Mobile */}
            <div className="flex gap-4 mb-4 md:hidden">
              <a 
                href="https://discord.gg/5XeapVWHVv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-sin-orange transition-colors"
                aria-label="Join our Discord"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/sunstoneinclusivitynetwork" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-sin-orange transition-colors"
                aria-label="Follow on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="mailto:info@sunstonein.org" 
                className="text-gray-300 hover:text-sin-orange transition-colors"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <div className="text-gray-300 text-sm">
              A 501(c)(3) Nonprofit Organization | EIN: 33-3449307
            </div>
          </div>
        </div>

        {/* Rainbow Bar - decorative */}
        <div 
          className="h-1 bg-rainbow-gradient mt-8 rounded-full"
          aria-hidden="true"
          role="presentation"
        ></div>
      </div>
    </footer>
  )
}