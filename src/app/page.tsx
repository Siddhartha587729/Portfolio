import { Heading, Paragraph } from '@/components/shared/Typography'
import Link from 'next/link'
import { ArrowRight, Code2, Briefcase, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white py-20 sm:py-32">
        <div className="container-max">
          <div className="max-w-3xl">
            <Heading as="h1" className="text-white mb-6">
              Welcome to My Portfolio
            </Heading>
            <Paragraph className="text-slate-300 text-lg mb-8">
              I'm a full-stack engineer passionate about building modern, scalable web applications. 
              Explore my projects, experience, and skills below.
            </Paragraph>
            <div className="flex gap-4 flex-wrap">
              <Link href="/portfolio" className="btn-primary">
                View Portfolio <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link href="/resume" className="btn-secondary">
                View Resume
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-max">
          <Heading as="h2" className="text-center mb-12">
            What I Do
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Code2,
                title: 'Web Development',
                description: 'Building modern, responsive web applications with React, Next.js, and TypeScript.',
              },
              {
                icon: Briefcase,
                title: 'Full-Stack Engineering',
                description: 'End-to-end development from frontend UI to backend APIs and database design.',
              },
              {
                icon: Zap,
                title: 'Performance Optimization',
                description: 'Optimizing applications for speed, scalability, and user experience.',
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="card">
                  <Icon className="text-blue-500 mb-4" size={32} />
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="container-max text-center">
          <Heading as="h2" className="mb-6">
            Ready to collaborate?
          </Heading>
          <Paragraph className="text-lg mb-8 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities.
          </Paragraph>
          <Link href="mailto:hello@example.com" className="btn-primary">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
