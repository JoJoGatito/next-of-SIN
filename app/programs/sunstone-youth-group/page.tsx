import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import RainbowDivider from '@/components/RainbowDivider'
import GalleryBento from '@/components/GalleryBento'
import SunstoneYouthGroupClient from './SunstoneYouthGroupClient'
import { getProgramGalleryBySlug } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Sunstone Youth Group | LGBTQ+ Youth Support | SIN',
  description: 'A safe and supportive space for LGBTQ+ youth to connect, learn, and grow together through weekly meetings, mentorship, and community activities.',
  keywords: 'LGBTQ+ youth group, queer youth support, LGBTQ+ teen community, Southern Colorado youth program, safe space for LGBTQ+ teens, queer youth activities, LGBTQ+ youth resources',
  openGraph: {
    title: 'Sunstone Youth Group | LGBTQ+ Youth Support',
    description: 'A safe and supportive space for LGBTQ+ youth to connect, learn, and grow together through weekly meetings and activities.',
    url: 'https://sunstoneinclusivity.network/programs/sunstone-youth-group',
    siteName: 'Sunstone Inclusivity Network',
    locale: 'en_US',
    type: 'website',
  },
}

export default async function SunstoneYouthGroupPage() {
  // Fetch gallery data from Sanity with caching
  const gallery = await getProgramGalleryBySlug('sunstone-youth-group')

  return <SunstoneYouthGroupClient gallery={gallery} />
}