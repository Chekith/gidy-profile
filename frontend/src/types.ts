export interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string
}

export interface Skill {
  id: string
  name: string
  level: number
  endorsements: number
  endorsedBy?: string[]
}

export interface Profile {
  id: string
  name: string
  title: string
  bio: string
  avatar: string
  location: string
  email: string
  socialLinks: SocialLink[]
  skills: Skill[]
  experience: {
    company: string
    position: string
    duration: string
    description: string
  }[]
  education: {
    school: string
    degree: string
    duration: string
  }[]
}
