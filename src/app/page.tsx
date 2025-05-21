import ContactSection from '@/components/Contact/ContactSection'
import Hero from '@/components/Hero/Hero'
import ProjectSection from '@/components/Projects/ProjectSection'
import ServiceSection from '@/components/Services/ServiceSection'
import Skills from '@/components/Skills/Skills'
import TestimonialSection from '@/components/Testimonials/TestimonialSection'
import getData from '@/lib/getData'
import { getAllProjects, getAllTestimonials } from '@/services'

export default async function Home() {
  const { fetcher } = getData()
  const projects = await getAllProjects()
  const testimonials = await getAllTestimonials()
  const skillList: any = await fetcher('/skills')
  const aboutMe: any = await fetcher('/about-me')

  return (
    <main>
      <Hero aboutMe={aboutMe?.about} />
      <Skills skills={skillList?.skills || []} />
      <div className="mx-auto my-8 max-w-[1200px] px-4 md:my-[3.75rem]">
        <ProjectSection projects={projects} />
        <ServiceSection />
        <TestimonialSection testimonials={testimonials} />
        <ContactSection />
      </div>
    </main>
  )
}
