import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Badge variant="outline" className="w-fit">
                    Software Engineer & Entrepreneur
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                    Hi, I&apos;m <span className="text-primary">Siraj Ahmadzai</span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-[600px]">
                    I build innovative software solutions and help businesses transform their ideas into reality.
                    Passionate about creating technology that makes a difference.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="w-fit">
                    <a href="#contact">
                      <Mail className="mr-2 h-4 w-4" />
                      Get In Touch
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="w-fit bg-transparent">
                    <a href="#projects">
                      View My Work
                    </a>
                  </Button>
                </div>
                <div className="flex gap-4">
                  <a
                      href="https://github.com/sirajahmadzai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="h-6 w-6" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a
                      href="https://linkedin.com/in/sahmadzai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square relative overflow-hidden rounded-2xl bg-muted">
                  <Image
                      src="/images/me.jpg?height=500&width=500"
                      alt="Siraj Ahmadzai"
                      width={300}
                      height={300}
                      className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">About Me</h2>
                <p className="text-lg text-muted-foreground">Crafting digital experiences with passion and precision</p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Software Engineer</h3>
                    <p className="text-muted-foreground mb-4">
                      With expertise in modern web technologies, I specialize in building scalable applications using
                      React, Next.js, Node.js, and cloud platforms. I&apos;m passionate about clean code, performance
                      optimization, and creating seamless user experiences.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">Next.js</Badge>
                      <Badge variant="secondary">TypeScript</Badge>
                      <Badge variant="secondary">Node.js</Badge>
                      <Badge variant="secondary">AWS</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Entrepreneur</h3>
                    <p className="text-muted-foreground mb-4">
                      I help startups and established businesses bring their vision to life through technology. From MVP
                      development to scaling solutions, I provide strategic guidance and hands-on development to drive
                      growth and innovation.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Product Strategy</Badge>
                      <Badge variant="secondary">MVP Development</Badge>
                      <Badge variant="secondary">Team Leadership</Badge>
                      <Badge variant="secondary">Growth Hacking</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  I believe in the power of technology to solve real-world problems. Whether it&apos;s building the next
                  breakthrough application or helping a business streamline their operations, I&apos;m committed to delivering
                  solutions that create lasting impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Featured Projects</h2>
                <p className="text-lg text-muted-foreground">Some of my recent work and side projects</p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold">Keyword Research Panel</h3>
                        <Badge variant="secondary">Latest</Badge>
                      </div>
                      <p className="text-muted-foreground">
                        A comprehensive keyword research tool that helps content creators and marketers discover 
                        high-value keywords, analyze search trends, and optimize their content strategy. Built with 
                        modern web technologies for optimal performance and user experience.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">React</Badge>
                        <Badge variant="outline">Next.js</Badge>
                        <Badge variant="outline">TypeScript</Badge>
                        <Badge variant="outline">Vercel</Badge>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <Link
                          href="https://github.com/sirajahmadzai/keyword-research-panel"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          Source Code
                        </Link>
                        <Link
                          href="https://keyword-research-panel.vercel.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold">Personal Portfolio</h3>
                        <Badge variant="secondary">Portfolio</Badge>
                      </div>
                      <p className="text-muted-foreground">
                        My personal website showcasing my skills, experience, and projects. Built with Next.js 
                        and modern design principles to create an engaging and professional online presence.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Next.js</Badge>
                        <Badge variant="outline">React</Badge>
                        <Badge variant="outline">TypeScript</Badge>
                        <Badge variant="outline">Tailwind CSS</Badge>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <Link
                          href="https://github.com/sirajahmadzai/sirajahmadzai.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          Source Code
                        </Link>
                        <Link
                          href="https://sirajahmadzai.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Site
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  I&apos;m constantly working on new projects and exploring emerging technologies. 
                  Check out my GitHub for more of my work and contributions to open source projects.
                </p>
                <div className="mt-6">
                  <Link
                    href="https://github.com/sirajahmadzai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <Github className="h-5 w-5" />
                    View All Projects on GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id ="contact" className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Let&apos;s Work Together</h2>
                <p className="text-lg text-muted-foreground">
                  Ready to bring your ideas to life? I&apos;d love to hear from you.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-muted-foreground">siraj.ahmadzai@carleton.ca</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-muted-foreground">+1 (613) 709-2285</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-muted-foreground">Ottawa, ON, Canada</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <p className="text-sm text-muted-foreground mb-4">Follow me on social media</p>
                      <div className="flex gap-4">
                        <Link
                            href="https://www.github.com/sirajahmadzai" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/sahmadzai" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
                    <form
                        action="https://formspree.io/f/xnnvenqw"
                        method="POST"
                        className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                            First Name
                          </label>
                          <input
                              name="firstName"
                              type="text"
                              id="firstName"
                              className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                              placeholder="John"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                            Last Name
                          </label>
                          <input
                              name="lastName"
                              type="text"
                              id="lastName"
                              className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                              placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Subject
                        </label>
                        <input
                            name="subject"
                            type="text"
                            id="subject"
                            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="Project inquiry"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            rows={4}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                            placeholder="Tell me about your project..."
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-8">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Siraj Ahmadzai. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
  )
}
