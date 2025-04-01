
import { Linkedin, Mail } from 'lucide-react';

const Team = () => {
  // Sample team data
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      position: "President",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      linkedin: "#",
      email: "alex.j@osu.edu"
    },
    {
      id: 2,
      name: "Maya Patel",
      position: "Vice President",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      linkedin: "#",
      email: "maya.p@osu.edu"
    },
    {
      id: 3,
      name: "David Chen",
      position: "Technical Director",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      linkedin: "#",
      email: "david.c@osu.edu"
    },
    {
      id: 4,
      name: "Sarah Miller",
      position: "Events Coordinator",
      image: "https://randomuser.me/api/portraits/women/17.jpg",
      linkedin: "#",
      email: "sarah.m@osu.edu"
    }
  ];

  return (
    <section id="team" className="section-padding relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
            Our Leadership
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The Big Data & Analytics Association is led by passionate students dedicated to creating valuable opportunities for our members.
          </p>
          <div className="w-24 h-1 bg-accent/30 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="group">
              <div className="relative overflow-hidden rounded-xl aspect-square mb-4">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <div className="flex space-x-3">
                    <a 
                      href={member.linkedin} 
                      className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors"
                      aria-label={`LinkedIn profile of ${member.name}`}
                    >
                      <Linkedin size={18} />
                    </a>
                    <a 
                      href={`mailto:${member.email}`} 
                      className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-montserrat font-bold text-xl text-primary group-hover:text-secondary transition-colors">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.position}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Interested in joining the leadership team? Elections are held at the end of each academic year.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;
