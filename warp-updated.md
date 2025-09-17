# Sunstone Inclusivity Network - Website Design Document v2.0

## Project Overview
A modern, accessible, and performant website for Sunstone Inclusivity Network (SIN) that serves as a hub for community engagement, resource sharing, and event coordination for LGBTQ+, disabled, and BIPOC communities in Southern Colorado.

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom utility classes
- **Typography**: OpenDyslexic (primary) + Inter (fallback) for accessibility
- **Theme**: Dark/Light mode support with system preference detection
- **Performance**: Progressive enhancement, lazy loading, optimized animations
- **Deployment**: Vercel (recommended)
- **Contact Integration**: Discord, Facebook, Email

## Design System

### Color Palette
- **Primary**: 
  - SIN Orange: `#FF8A00`
  - SIN Yellow: `#FFD600` 
  - SIN Red: `#FF3D00`
- **Neutral**: Grayscale with proper contrast ratios
- **Backgrounds**: Light/Dark adaptive with glass morphism effects
- **Gradients**: OKLab color space for perceptually smooth rainbow transitions without banding

### Visual Effects
- **Glass Morphism**: Backdrop blur with semi-transparent overlays
- **Rainbow Gradients**: Smooth OKLab-based transitions for dividers and accents
- **Animated Gradients**: GPU-optimized with will-change property
- **Parallax Effects**: Desktop-only mouse tracking for depth

## Key Features

### Accessibility First
- OpenDyslexic font option for users with dyslexia (integrated as primary font)
- High contrast mode support with proper WCAG AAA compliance
- Proper heading hierarchy throughout all pages
- ARIA labels and semantic HTML structure
- Full keyboard navigation support
- Screen reader optimized content
- Minimum touch target sizes (44x44px) enforced
- Reduced motion support with `prefers-reduced-motion` media queries
- Skip to content links
- Mobile-first responsive design
- Accessible expandable cards and interactive elements

### Core Pages

#### 1. Home Page
- **Progressive Enhancement Hero Section**:
  - Static gradient background (immediate load)
  - Optional mouse parallax effects (desktop only, deferred)
  - Scroll-based animations (desktop only)
  - Reduced height on mobile (85vh) for content discovery
  - CTA buttons (Get Involved, Learn More)
  - Performance-optimized with RequestAnimationFrame
  
- **Compact, Expandable Program Cards**:
  - 5-column grid on desktop, responsive down to 1 column
  - Click-to-expand functionality with smooth transitions
  - Animated gradient accent borders
  - Quick stats preview in collapsed state
  - Full descriptions and details when expanded
  - Accessible button controls

- **Interactive Events Timeline**:
  - CSS-variable driven alignment system for pixel-perfect positioning
  - Mobile-optimized layout with stacked cards
  - Filter by event type functionality
  - Expandable event details on click
  - Smooth animations with proper easing
  
- **Modern Artists Gallery**: 
  - Isotope/masonry layout
  - Lightbox functionality
  - Lazy loading for images
  
- **Smooth Rainbow Divider Bar**:
  - OKLab gradient implementation
  - Animated shimmer effect
  - No color banding
  - Blur overlays for softness

#### 2. About Page
- **Full Mission Statement**: 
  - Transformative messaging with clear vision
  - Styled sections with gradient accents
  
- **"What Sets Us Apart" Section** with 6 core differentiators:
  - Rebuilding the Table (not just a seat)
  - Intersectional Focus (multi-community support)
  - True Accessibility (beyond compliance)
  - Direct Action (tangible support)
  - Accountability (transparent operations)
  - Culture Shift (systemic change focus)
  
- **Board Members Section**:
  - Sun-head design element surrounding photos
  - Individual bios and professional titles
  - "THE HUMANS THAT MADE THIS REALITY" header
  - Responsive grid layout
  - Placeholder system for easy updates

#### 3. Programs Page
- Individual program sections
- Meeting schedules and locations
- Contact information
- Related resources and events

#### 4. Events Calendar
- Monthly/weekly/daily views
- Program-specific filtering
- Accessibility information
- Registration links

#### 5. Resources Database
- Searchable directory
- Category filtering
- Verification status
- Contact information

## Component Library

### Navigation
- **Sticky Header**: 
  - Glass morphism blur effect
  - Smooth scroll behavior
  - Logo and branding
  
- **Mobile Menu**:
  - Hamburger animation
  - Smooth slide-in transition
  - Full-screen overlay
  
- **Theme Toggle**:
  - Dark/light mode switch
  - System preference detection
  - Smooth transitions
  
- **Footer**:
  - Quick links section
  - Social media integration:
    - Discord server link
    - Facebook page
    - Email contact (hello@sunstoneinclusivity.network)
  - Location info (Pueblo, Colorado)
  - Rainbow accent bar
  - Mobile-optimized with icon-only social links

### Interactive Elements
- **Card Components**:
  - Hover effects with animated gradient borders
  - Expandable/collapsible with smooth transitions
  - Loading states with skeletons
  
- **Timeline Components**:
  - Interactive click-to-expand events
  - CSS-variable driven alignment
  - Mobile-responsive layout
  
- **Animation Elements**:
  - Mouse parallax effects (desktop only)
  - Scroll-triggered animations (Intersection Observer)
  - Progressive enhancement approach
  - Staggered entrance animations
  
- **Form Components**:
  - Accessible input fields
  - Clear validation messages
  - Toast notifications
  - Modal dialogs

## Performance Optimization

### Progressive Enhancement Strategy
1. **Initial Load**:
   - Static content renders immediately
   - Critical CSS inlined
   - Fonts preloaded with fallbacks
   
2. **Enhanced Experience**:
   - Animations added after initial paint
   - Parallax effects for capable devices
   - Advanced interactions progressively loaded
   
3. **Mobile Optimizations**:
   - Reduced animations
   - No mouse-tracking effects
   - Simplified gradients
   - Battery-conscious features

### Animation Guidelines
- **Progressive Enhancement**:
  - Static content loads first
  - Animations added via JavaScript after load
  - Mobile devices receive reduced animation set
  
- **Technical Implementation**:
  - RequestAnimationFrame for smooth 60fps
  - CSS transforms for GPU optimization
  - Will-change property for animated elements
  - Passive event listeners for scroll/touch
  
- **Easing Functions**:
  - Consistent cubic-bezier curves
  - Natural motion with ease-out
  - Staggered delays for visual interest

### Mobile-First Approach
- **Touch Optimization**:
  - 44px minimum touch targets
  - Adequate spacing between buttons
  - Swipe gestures where appropriate
  
- **Responsive Images**:
  - Next.js Image optimization
  - WebP format with fallbacks
  - Lazy loading for below-fold content
  
- **Performance Features**:
  - Code splitting for route-based chunks
  - Dynamic imports for heavy components
  - Service worker for offline capability (future)
  
- **Mobile-Specific UI**:
  - Simplified navigation
  - Compact card layouts
  - Icon-only social links in footer
  - Reduced viewport heights for content hints

## Performance Targets
- Lighthouse score > 90 for all metrics
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Cumulative Layout Shift < 0.1
- Progressive enhancement ensures instant usability
- Optimized bundle size with code splitting
- Image optimization with WebP format
- Font subsetting for faster loads

## Implementation Details

### CSS Architecture
- **Tailwind Configuration**:
  - Custom color palette
  - Extended animation utilities
  - Glass morphism utilities
  - Custom gradient classes
  
- **Global Styles**:
  - CSS custom properties for themes
  - OKLab gradient definitions
  - Animation keyframes
  - Utility classes for common patterns

### Component Structure
- **Atomic Design Pattern**:
  - Atoms (buttons, inputs, labels)
  - Molecules (cards, form groups)
  - Organisms (hero, navigation, footer)
  - Templates (page layouts)
  - Pages (route components)

### State Management
- React Context for global state
- Local component state for UI
- URL parameters for shareable states
- LocalStorage for user preferences

## Recent Updates & Improvements

### Visual Enhancements
✅ **OKLab Gradients**: Implemented perceptually smooth rainbow gradients
✅ **Glass Morphism**: Added throughout for modern depth effects
✅ **Animated Borders**: GPU-optimized gradient animations on cards
✅ **Shimmer Effects**: Smooth, blurred rainbow animations

### Performance Improvements
✅ **Progressive Enhancement**: Static first, enhance later approach
✅ **Conditional Rendering**: Device-appropriate feature loading
✅ **Optimized Animations**: RequestAnimationFrame and will-change
✅ **Lazy Loading**: Images and heavy components load on demand

### Component Updates
✅ **Hero Section**: Progressive enhancement with conditional parallax
✅ **Program Cards**: Expandable design for better space utilization
✅ **Timeline**: CSS-variable driven alignment system
✅ **Footer**: Social media integration with responsive icons

### New Features
✅ **About Page**: Complete with mission and board sections
✅ **Social Links**: Discord, Facebook, Email integration
✅ **Mobile Optimizations**: Reduced animations, smaller viewports
✅ **Accessibility**: OpenDyslexic as primary font

## Future Enhancements
- User authentication system
- Event RSVP functionality with calendar integration
- Donation processing with Stripe
- Multi-language support (Spanish priority)
- Community forum with moderation
- Resource library with advanced search
- Email newsletter integration with Mailchimp
- Analytics dashboard for admins
- Member directory
- Volunteer scheduling system
- Accessibility preference persistence
- PWA capabilities for offline access
- Real-time notifications
- Advanced search with filters
- Content versioning and rollback

## Development Guidelines

### Code Standards
- TypeScript for type safety
- ESLint and Prettier for consistency
- Component documentation with Storybook
- Unit tests for utilities
- Integration tests for critical paths

### Git Workflow
- Feature branches from main
- Pull requests with reviews
- Semantic commit messages
- Automated testing in CI/CD

### Documentation
- Component API documentation
- Setup and deployment guides
- Content management tutorials
- Accessibility testing procedures

## Conclusion
This document represents the current state of the Sunstone Inclusivity Network website rebuild, incorporating modern web development best practices, accessibility standards, and performance optimizations. The progressive enhancement approach ensures the site is usable on all devices while providing enhanced experiences for capable browsers.

The focus on accessibility, particularly the use of OpenDyslexic font and comprehensive ARIA implementation, aligns perfectly with SIN's mission of true inclusivity for disabled communities. The modern visual design with glass morphism and smooth gradients creates an engaging, contemporary look while maintaining professional standards.

Regular updates to this document will track ongoing improvements and feature additions as the project evolves.