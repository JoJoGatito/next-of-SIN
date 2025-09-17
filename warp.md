# Sunstone Inclusivity Network Website Design Document

## Executive Summary

This document outlines the design and technical specifications for rebuilding the Sunstone Inclusivity Network (SIN) website. The new website will be modern, accessibility-forward, mobile-friendly, and easy to maintain for non-technical users.

The site will showcase SIN's five programs (Sunstone Youth Group, Rock & Stone, Dis'abitch, Cafeteria Collective, and Hue House), provide information about local events and resources for queer, disabled, and BIPOC communities, and feature artists affiliated with the organization.

### Core Requirements
- Modern web architecture using Next.js and React
- Integration with Sanity.io CMS for content management
- Mobile-responsive design
- Light and dark mode with black and orange color scheme
- Comprehensive accessibility features
- Event calendar system
- Resource database

---

## Technical Architecture

### Framework Selection: Next.js

**Next.js** has been selected as the primary framework for the following reasons:
- Server-side rendering and static site generation capabilities
- Excellent performance and SEO benefits
- Component-based React architecture
- Built-in routing and image optimization
- Seamless integration with Sanity.io

### Tech Stack Overview

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Styled Components and/or Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **CMS**: Sanity.io
- **Deployment**: Vercel

### Architecture Diagram

```
┌─────────────────┐     ┌───────────────┐
│                 │     │               │
│  Next.js App    │◄────┤  Sanity.io    │
│  (Frontend)     │     │  (CMS)        │
│                 │     │               │
└─────────────────┘     └───────────────┘
        │
        │
        ▼
┌─────────────────────────────────────┐
│                                     │
│  Server-Side     Static Site        │
│  Rendering  ┌───┐ Generation        │
│             │   │                   │
└─────────────┘   └───────────────────┘
        │                 │
        └────────┬────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│                                     │
│        Vercel Deployment            │
│                                     │
└─────────────────────────────────────┘
```

### Page Generation Strategy

- **Static Generation**: For pages that don't change frequently (About, Program descriptions)
- **Incremental Static Regeneration**: For pages that update periodically (Featured Artists)
- **Server-side Rendering**: For dynamic content (Events calendar with filters)
- **Client-side Rendering**: For interactive components (Resource filtering)

---

## Design System

### Color Palette

The color palette maintains SIN's brand identity while ensuring accessibility:

**Primary Colors**:
- Black (#000000) - Background in dark mode, text in light mode
- White (#FFFFFF) - Background in light mode, text in dark mode
- Orange (#FF8A00) - Primary accent color

**Secondary Colors**:
- Yellow (#FFD600) - Secondary accent
- Red (#FF3D00) - Call to action, alerts

**Rainbow Elements**:
- Use of full-spectrum rainbow gradients for select decorative elements
- Rainbow gradient: linear-gradient(to right, #FF0000, #FF8A00, #FFD600, #00FF00, #0000FF, #4B0082, #8B00FF)

**Accessibility**:
- All color combinations must meet WCAG 2.1 AA contrast ratio requirements (4.5:1 for normal text, 3:1 for large text)
- Alternative high-contrast theme available

### Typography

**Dyslexie Font Implementation**:

The website will exclusively use **Dyslexie** font, a typeface specifically designed to improve readability for people with dyslexia. This choice aligns perfectly with Sunstone Inclusivity Network's commitment to accessibility and inclusion for disabled communities.

**Font Selection**:
- **Primary Font: Dyslexie** - Dyslexie Regular & Dyslexie Bold
  - Designed specifically for dyslexia
  - Distinguishable letter shapes (e.g., 'a' and 'o' are more distinct)
  - Heavy bottom stroke for better ground orientation
  - Unique letterforms reduce letter confusion
  - Web font license required for implementation

**Fallback Strategy**:
- Primary fallback: **Inter** (Google Fonts) - Clean sans-serif with excellent readability
- Secondary fallback: **Helvetica Neue** or **Arial** (system fonts)
- Monospace fallback: **SF Mono** (for code blocks)

**Font Loading Implementation**:
- Self-hosted Dyslexie web fonts (requires license from Dyslexie Website)
- Font-display: 'fallback' to prevent invisible text during load
- Preload critical font files for optimal performance
- Proper font-face declarations with multiple formats (woff2, woff, ttf)

**Type Scale**:
- Base size: 18px (1.125rem) - Slightly larger for better dyslexia accommodation
- Scale ratio: 1.25 (major third)
- Resulting sizes:
  - xs: 0.8rem (14.4px)
  - sm: 0.875rem (15.75px)
  - base: 1rem (18px)
  - lg: 1.25rem (22.5px)
  - xl: 1.563rem (28.125px)
  - 2xl: 1.953rem (35.156px)
  - 3xl: 2.441rem (43.945px)
  - 4xl: 3.052rem (54.931px)

**Line Heights**:
- Headings: 1.3 (slightly more spacious for better readability)
- Body text: 1.6 (increased for dyslexia accommodation)
- Large text blocks: 1.8

**Letter Spacing**:
- Body text: 0.01em - Slight letter spacing for improved readability
- Headings: 0.005em - Minimal letter spacing for visual cohesion

**Implementation Notes**:
- Require Dyslexie font license for web use
- Ensure font loading doesn't impact performance
- Test font rendering across different browsers and devices
- Provide font loading fallback to prevent accessibility issues during font load
- Consider user preference for font alternatives (though Dyslexie will be default)

### Components

**Core Components**:
1. **Navigation**
   - Main navigation
   - Mobile navigation (hamburger menu)
   - Program navigation
   - Breadcrumbs

2. **Cards**
   - Program card
   - Event card
   - Resource card
   - Artist card

3. **Interactive Elements**
   - Primary button
   - Secondary button
   - Text link
   - Toggle switch (for dark/light mode)
   - Form elements (inputs, dropdowns, checkboxes)

4. **Content Blocks**
   - Hero section
   - Feature section
   - Program highlight
   - Testimonial block
   - Call to action block

5. **Specialized Components**
   - Calendar view
   - Resource filter interface
   - Artist gallery

---

## Content Strategy and Information Architecture

### Site Map

```
Home
├── About Us
│   └── Our Story
│   └── Our Team
│   └── Our Sponsors
├── Programs
│   └── Sunstone Youth Group (SYG)
│   └── Rock & Stone
│   └── Dis'abitch
│   └── Cafeteria Collective
│   └── Hue House
├── Events
│   └── Program Events
│   └── Local Events Calendar
├── Resources
│   └── Local Resources for Queer Community
│   └── Resources for Disabled Community
│   └── Resources for BIPOC Community
├── Featured Artists
│   └── Artist Profiles
│   └── Gallery
├── Get Involved
│   └── Volunteer
│   └── Donate
├── Contact Us
```

### Content Types in Sanity.io

1. **Program**
   - Title
   - Slug
   - Description (rich text)
   - Featured image
   - Meeting information
   - Contact person
   - Related resources
   - Related events

2. **Event**
   - Title
   - Event type (Program/Local)
   - Related program (reference)
   - Date and time
   - Location
   - Description
   - Accessibility information
   - Registration information
   - Image/graphic
   - Tags

3. **Resource**
   - Title
   - Resource type
   - Target communities
   - Description
   - Contact information
   - Website URL
   - Physical address
   - Hours of operation
   - Services offered
   - Accessibility features
   - Verified status
   - Last verified date
   - Tags
   - Image/logo

4. **Artist**
   - Name
   - Biography
   - Portrait/photo
   - Artwork samples
   - Website/social media
   - Art medium/style
   - Featured status

5. **Team Member**
   - Name
   - Role
   - Biography
   - Photo
   - Contact information

6. **Sponsor**
   - Name
   - Logo
   - Website
   - Sponsorship level
   - Description

7. **Page**
   - Title
   - Slug
   - Content blocks (portable text)

---

## User Experience and Interfaces

### Key User Flows

1. **Program Discovery and Engagement**
   ```
   Homepage → Programs Overview → Program Detail → 
   Register for Event/Contact Program Leader
   ```

2. **Event Finding**
   ```
   Homepage → Events Calendar → Filter Events → 
   Event Detail → Registration
   ```

3. **Resource Access**
   ```
   Homepage → Resources → Filter Resources → 
   Resource Detail → Visit Resource Website/Contact
   ```

4. **Artist Exploration**
   ```
   Homepage → Featured Artists → Artist Profile → 
   View Gallery/Contact Artist
   ```

### Wireframes

Detailed wireframes will be developed for the following key pages:

1. **Homepage**
   - Hero section with mission statement
   - Featured programs section
   - Upcoming events carousel
   - Featured artists showcase
   - Call to action for donation/volunteering

2. **Program Page Template**
   - Program description and information
   - Upcoming program events
   - Program-specific resources
   - Contact information

3. **Events Calendar**
   - Monthly/weekly/daily view options
   - Filtering interface
   - Event cards
   - List/calendar toggle

4. **Resources Database**
   - Search and filter interface
   - Resource cards in grid/list view
   - Filtering sidebar

5. **Artist Profile Template**
   - Artist bio and information
   - Gallery of work
   - Contact/social media links

6. **Mobile Navigation**
   - Hamburger menu
   - Expanded menu view
   - Nested navigation structure

---

## Implementation Details for Key Features

### Events Calendar System

**Data Structure**:
- Event schema in Sanity.io as defined in Content Types section
- Relationships between events and programs
- Tagging system for categorization

**Frontend Components**:
1. **Calendar View**
   - Interactive month/week/day views using `react-big-calendar`
   - Color-coding based on program/event type
   - Responsive design adapting to screen sizes
   - Keyboard navigable for accessibility

2. **List View**
   - Chronological listing with pagination
   - Compact display for mobile
   - Expandable event details

3. **Filtering System**
   - Program filters
   - Event type filters
   - Accessibility feature filters
   - Date range selection
   - Saved preferences (localStorage)

4. **Event Detail Pages**
   - Full event information
   - Add-to-calendar functionality
   - Related events

**Technical Implementation**:
- Data fetching using Next.js data fetching methods
- Server-side rendering for SEO
- Client-side state for filters
- URL query parameters for shareable filtered views

### Resource Database

**Data Structure**:
- Resource schema in Sanity.io as defined in Content Types section
- Tagging and categorization system
- Verification tracking

**Frontend Components**:
1. **Search and Filter Interface**
   - Full-text search
   - Primary filters for community type
   - Secondary filters for resource type
   - Mobile-friendly filter UI

2. **Display Options**
   - Grid view with cards
   - List view (more compact)
   - Toggle between views

3. **Resource Detail Pages**
   - Comprehensive information
   - Contact options
   - Related resources

**Technical Implementation**:
- Combination of server-side and client-side filtering
- Search implementation using Fuse.js
- Pagination for performance
- Filter state management with React context

### Featured Artists Section

**Implementation Details**:
- Grid layout of artist cards
- Individual artist profile pages
- Image gallery with lightbox functionality
- Integration with artist social media

### Light/Dark Mode Implementation

- Theme context provider in React
- Local storage for saving preference
- CSS variables for theme-based styling
- Smooth transition animations between modes
- System preference detection

---

## Accessibility Implementation

### Standards Compliance

- WCAG 2.1 AA compliance as minimum standard
- Regular automated and manual testing

### Specific Implementations

1. **Semantic HTML**
   - Proper heading structure (h1-h6)
   - Semantic elements (nav, main, section, article)
   - ARIA landmarks

2. **Keyboard Navigation**
   - Logical tab order
   - Focus indicators
   - Skip navigation links
   - Keyboard-accessible interactive components

3. **Screen Reader Support**
   - Alt text for all images
   - ARIA labels where needed
   - Screen reader announcements for dynamic content
   - Tested with popular screen readers

4. **Color and Contrast**
   - All text meets AA contrast requirements
   - Information not conveyed by color alone
   - High contrast mode

5. **Forms and Interactions**
   - Clear error messages
   - Form validation
   - Sufficient time for interactions
   - No auto-playing content

6. **Motion and Animation**
   - Respects reduced motion preferences
   - No content that flashes

7. **Text Sizing**
   - Text can be resized up to 200% without loss of content
   - No fixed font sizes

---

## Mobile Responsiveness Strategy

### Approach

- Mobile-first design methodology
- Fluid layouts with CSS Grid and Flexbox
- Relative units (rem, em, %) over fixed units (px)

### Breakpoint Strategy

- Small: 0-639px (mobile)
- Medium: 640-767px (large mobile/small tablet)
- Large: 768-1023px (tablet)
- Extra Large: 1024-1279px (small desktop)
- 2XL: 1280px and above (large desktop)

### Implementation Techniques

1. **Responsive Navigation**
   - Hamburger menu for mobile
   - Expanded horizontal menu for desktop
   - Nested menu management

2. **Fluid Typography**
   - Viewport-relative sizing
   - Minimum and maximum sizes

3. **Flexible Layouts**
   - Stack layouts for narrow screens
   - Grid layouts for wider screens
   - Component reordering based on screen size

4. **Touch Optimization**
   - Larger touch targets (min 44x44px)
   - Adequate spacing between interactive elements
   - Swipe-friendly interfaces

5. **Performance Optimization**
   - Responsive images
   - Reduced animation on mobile
   - Code splitting for faster initial load

---

## Deployment and Hosting Strategy

### Hosting Platform: Vercel

- Optimized for Next.js applications
- Global CDN for fast content delivery
- Easy integration with GitHub for CI/CD
- Automatic HTTPS
- Edge functions for API routes

### Deployment Pipeline

```
GitHub Repository → Vercel Integration → 
Automated Builds → Preview Deployments → Production Deployment
```

### Environment Strategy

- Development environment for active development
- Staging environment for testing
- Production environment for public website

### Domain Management

- Planning for domain transfer or setup from existing "sunstoneinclusivity.network"
- DNS configuration
- SSL certificate management

### Monitoring

- Uptime monitoring
- Performance monitoring
- Error tracking

---

## Project Implementation Approach

### Phase 1: Foundation
- Project setup and repository creation
- Basic Next.js structure with TypeScript
- Sanity.io schema development
- Core component development

### Phase 2: Core Development
- Design system implementation
- Base page templates
- CMS integration
- Responsive layout framework

### Phase 3: Feature Implementation
- Events calendar system
- Resource database
- Artist showcase
- Light/dark mode

### Phase 4: Refinement and Testing
- Accessibility testing and improvements
- Performance optimization
- Cross-browser testing
- Content entry and migration

### Phase 5: Launch and Handover
- Final quality assurance
- Deployment to production
- Documentation
- Training for content editors