'use client'
import useDataFetch from '@/hooks/useDataFetch'
import React from 'react'
import SkillsForm from './components/SkillsForm'
import Image from 'next/image'
import { FaTimes } from 'react-icons/fa'
import api from '@/lib/axiosInstance'
import { toast } from 'react-hot-toast'

function SkillsPage() {
  const [reFetch, setReFetch] = React.useState(false)
  const { data } = useDataFetch('/skills', reFetch)
  return (
    <div className="flex">
      {/* skill data show  */}
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
  )
}

export default SkillsPage

const Skill = ({ skill, setReFetch }: { skill: any; setReFetch: any }) => {
  const handleDeleteSkill = async () => {
    try {
      await api.delete(`/skills?id=${skill._id}`)
      toast.success('Skill deleted successfully')
      setReFetch((prev: any) => !prev)
    } catch (error) {}
  }
  return (
    <div className="border-border flex items-center gap-2 rounded-lg border p-3" key={skill._id}>
      <Image src={skill.icon} alt={skill.name} width={32} height={32} />
      <p>{skill.name}</p>
      <button onClick={handleDeleteSkill}>
        <FaTimes className="cursor-pointer duration-200 hover:text-red-700" />
      </button>
    </div>
  )
}
