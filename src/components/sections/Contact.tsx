
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="mb-8">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                Get In Touch
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600">
                Have questions about BDAA or interested in getting involved? Reach out to us and we'll get back to you as soon as possible.
              </p>
              <div className="data-line my-6"></div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-4">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary mb-1">Email</h3>
                  <a href="mailto:bdaa@osu.edu" className="text-gray-600 hover:text-secondary">
                    bdaa@osu.edu
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-4">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary mb-1">Location</h3>
                  <p className="text-gray-600">
                    The Ohio State University<br />
                    Columbus, OH 43210
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-4">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary mb-1">Meeting Times</h3>
                  <p className="text-gray-600">
                    General Meetings: Wednesdays, 6:30 PM<br />
                    Mason Hall Room 240
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-primary mb-6">Send us a Message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Input 
                      id="name"
                      type="text" 
                      placeholder="Your name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="Your email"
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input 
                    id="subject"
                    type="text" 
                    placeholder="Message subject"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea 
                    id="message"
                    placeholder="Write your message here..."
                    className="w-full h-32"
                  />
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
