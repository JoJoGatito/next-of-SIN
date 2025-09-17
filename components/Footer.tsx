import { Mail, MessageCircle, Facebook } from 'lucide-react'

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
              <li><a href="/about" className="text-gray-300 hover:text-sin-orange transition-colors">About Us</a></li>
              <li><a href="/programs" className="text-gray-300 hover:text-sin-orange transition-colors">Programs</a></li>
              <li><a href="/events" className="text-gray-300 hover:text-sin-orange transition-colors">Events</a></li>
              <li><a href="/resources" className="text-gray-300 hover:text-sin-orange transition-colors">Resources</a></li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-sin-orange font-semibold mb-4">Get Involved</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/volunteer" className="text-gray-300 hover:text-sin-orange transition-colors">Volunteer</a></li>
              <li><a href="/donate" className="text-gray-300 hover:text-sin-orange transition-colors">Donate</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-sin-orange transition-colors">Contact</a></li>
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
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-300 hover:text-sin-orange text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-300 hover:text-sin-orange text-sm transition-colors">
                Terms of Service
              </a>
              <a href="/accessibility" className="text-gray-300 hover:text-sin-orange text-sm transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>

        {/* Rainbow Bar */}
        <div className="h-1 bg-rainbow-gradient mt-8 rounded-full"></div>
      </div>
    </footer>
  )
}