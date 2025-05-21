import api from '@/lib/axiosInstance'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import { FaTimes } from 'react-icons/fa'

const Skill = ({ skill, setReFetch }: { skill: any; setReFetch: any }) => {
  const handleDeleteSkill = async () => {
    try {
      await api.delete(`/skills?id=${skill._id}`)
      toast.success('Skill deleted successfully')
      setReFetch((prev: any) => !prev)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
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

export default Skill
