import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import ModernProgramCards from '@/components/ModernProgramCards'

export const metadata: Metadata = {
  title: 'Our Programs | Sunstone Inclusivity Network',
  description: 'Explore our five inclusive programs: Sunstone Youth Group, Rock & Stone, Dis\'abitch, Cafeteria Collective, and Hue House, designed to support queer, disabled, and BIPOC communities in Southern Colorado.',
  keywords: 'inclusivity programs, LGBTQ+ youth group, outdoor activities, disability advocacy, queer community, BIPOC events, Southern Colorado community programs',
  openGraph: {
    title: 'Our Programs | Sunstone Inclusivity Network',
    description: 'Five inclusive community programs supporting diversity and belonging',
    url: 'https://sunstoneinclusivity.network/programs',
    siteName: 'SIN',
    locale: 'en_US',
    type: 'website',
  },
}

export default function ProgramsPage() {
  // This is just a redirect to the home page for now since the programs are displayed there
  // In the future, this could be a dedicated programs overview page
  return <ModernProgramCards />
}