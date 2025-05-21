'use client'
import useDataFetch from '@/hooks/useDataFetch'
import React from 'react'
import SkillsForm from './components/SkillsForm'
import Skill from './components/Skill'
import AboutMeForm from './components/AboutMeForm'

function SkillsPage() {
  const [reFetch, setReFetch] = React.useState(false)
  const [reFetchAbout, setReFetchAbout] = React.useState(false)
  const { data } = useDataFetch('/skills', reFetch)
  const { data: aboutMe } = useDataFetch('/about-me', reFetchAbout)
  return (
    <div className="space-y-20">
      {/* About me data */}
      <div className="flex">
        <div className="w-8/12">
          <p>About Me</p>
          <h2 className="text-neutral mt-3">{aboutMe?.about}</h2>
        </div>
        <div className="w-4/12">
          <AboutMeForm setReFetch={setReFetchAbout} about={aboutMe} />
        </div>
      </div>
      {/* skill data show  */}
      <div className="flex">
        <div className="w-8/12">
          <p>Skills item</p>
          <div className="mt-5 flex w-full flex-wrap gap-3">
            {data?.skills?.map((skill: any) => (
              <Skill key={skill._id} skill={skill} setReFetch={setReFetch} />
            ))}
          </div>
        </div>
        {/* Skills data post */}
        <div className="w-4/12">
          <SkillsForm setReFetch={setReFetch} />
        </div>
      </div>
    </div>
  )
}

export default SkillsPage
