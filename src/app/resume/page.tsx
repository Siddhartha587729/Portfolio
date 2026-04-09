import { Heading, Paragraph, Badge } from '@/components/shared/Typography'
import { Calendar, MapPin, Award } from 'lucide-react'

export default function ResumePage() {
  // Placeholder data - in production, this would come from Sanity
  const experience = [
    {
      company: 'Tech Company Inc.',
      position: 'Senior Full-Stack Engineer',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: null,
      isCurrent: true,
      description: 'Led development of microservices architecture and mentored junior engineers.',
      technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
    },
    {
      company: 'Startup Co.',
      position: 'Full-Stack Developer',
      location: 'Remote',
      startDate: '2020-06',
      endDate: '2021-12',
      isCurrent: false,
      description: 'Built and maintained full-stack web applications using modern JavaScript frameworks.',
      technologies: ['React', 'Express.js', 'MongoDB', 'AWS'],
    },
  ]

  const skills = {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
    backend: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'GraphQL'],
    devops: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'CI/CD'],
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 sm:py-20">
        <div className="container-max">
          <Heading as="h1" className="text-white mb-4">
            Resume
          </Heading>
          <Paragraph className="text-slate-300">
            Professional background and technical expertise
          </Paragraph>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="container-max max-w-3xl">
          {/* Experience */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <Award className="text-blue-500 mr-3" size={28} />
              <Heading as="h2" className="mb-0">
                Experience
              </Heading>
            </div>

            <div className="space-y-8">
              {experience.map((job, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{job.position}</h3>
                      <p className="text-blue-600 font-semibold">{job.company}</p>
                    </div>
                    <div className="flex items-center text-slate-600 text-sm mt-2 sm:mt-0">
                      <Calendar size={16} className="mr-1" />
                      <span>
                        {new Date(job.startDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                        })}{' '}
                        -{' '}
                        {job.isCurrent
                          ? 'Present'
                          : new Date(job.endDate || '').toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                            })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-slate-600 text-sm mb-3">
                    <MapPin size={16} className="mr-1" />
                    <span>{job.location}</span>
                  </div>

                  <Paragraph className="text-sm mb-4">{job.description}</Paragraph>

                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <Badge key={tech} variant="primary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <Heading as="h2" className="mb-8 flex items-center">
              <Award className="text-blue-500 mr-3" size={28} />
              Skills
            </Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 capitalize">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <Badge key={skill} variant="default">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
