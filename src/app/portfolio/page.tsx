import { Heading, Paragraph, Badge } from '@/components/shared/Typography'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function PortfolioPage() {
  // Placeholder data - in production, this would come from Sanity
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with real-time inventory management',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      url: '#',
      featured: true,
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates',
      technologies: ['Next.js', 'Firebase', 'Tailwind CSS'],
      url: '#',
      featured: true,
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      description: 'Real-time analytics dashboard with data visualization',
      technologies: ['Vue.js', 'D3.js', 'Express.js'],
      url: '#',
      featured: false,
    },
  ]

  return (
    <div>
      {/* Header */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-max">
          <Heading as="h1" className="mb-4">
            Portfolio
          </Heading>
          <Paragraph className="text-lg max-w-2xl">
            A selection of projects I've worked on, showcasing my expertise in full-stack web development.
          </Paragraph>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 sm:py-24">
        <div className="container-max">
          <Heading as="h2" className="mb-12">
            Featured Projects
          </Heading>
          
          <div className="grid grid-cols-1 gap-8 mb-12">
            {projects
              .filter((p) => p.featured)
              .map((project) => (
                <div key={project.id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-slate-900">{project.title}</h3>
                      <Paragraph className="mb-4">{project.description}</Paragraph>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="primary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <Link
                        href={project.url}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                      >
                        View Project <ExternalLink className="ml-2" size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Other Projects */}
          <Heading as="h3" className="mb-6">
            Other Works
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects
              .filter((p) => !p.featured)
              .map((project) => (
                <div key={project.id} className="card">
                  <h4 className="text-xl font-semibold mb-2 text-slate-900">{project.title}</h4>
                  <Paragraph className="text-sm mb-3">{project.description}</Paragraph>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="default">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Link
                    href={project.url}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors"
                  >
                    View <ExternalLink className="ml-1" size={14} />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
