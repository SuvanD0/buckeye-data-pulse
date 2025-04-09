import { useState } from 'react';
import { Linkedin, Mail } from 'lucide-react';

interface OfficerCardProps {
  name: string;
  role: string;
  linkedIn: string;
  email: string;
  school_year: string;
  major: string;
  minor?: string;
  work_experience?: string;
  fun_fact?: string;
  img?: string;
}

const OfficerCard = ({
  name,
  role,
  linkedIn,
  email,
  school_year,
  major,
  minor,
  work_experience,
  fun_fact,
  img,
}: OfficerCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const firstName = name.split(' ')[0];
  const imagePath = img || `img/SP25BDAAHeadshots/${firstName}.png`;

  return (
    <div className="flip-card-container">
      <div 
        className={`flip-card ${isFlipped ? 'flip-card-flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <div className="flip-card-front">
          <div className="h-full flex flex-col shadow-lg rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src={imagePath}
                alt={name}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="bg-gray-200/90 p-4 flex-1">
              <h3 className="text-xl font-bold text-primary mb-1 truncate">
                {name}
              </h3>
              <p className="text-gray-700 text-base mb-3">{role}</p>
              <div className="flex gap-4">
                <a
                  href={email}
                  onClick={(e) => e.stopPropagation()}
                  className="text-primary hover:text-primary/80"
                >
                  <Mail size={20} />
                </a>
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-primary hover:text-primary/80"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="flip-card-back">
          <div className="h-full bg-gray-200/90 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-primary mb-4">{name}</h3>
            <div className="space-y-3 mb-2">
              <div>
                <span className="text-primary font-bold">School Year:</span>
                <span className="ml-2">{school_year}</span>
              </div>
              <div>
                <span className="text-primary font-bold">Major:</span>
                <span className="ml-2 break-words">{major}</span>
              </div>
              {minor && minor !== "N/A" && (
                <div>
                  <span className="text-primary font-bold">Minor:</span>
                  <span className="ml-2">{minor}</span>
                </div>
              )}
              {work_experience && work_experience !== "N/A" && (
                <div>
                  <span className="text-primary font-bold">Work Experience:</span>
                  <span className="ml-2">{work_experience}</span>
                </div>
              )}
              {fun_fact && (
                <div>
                  <span className="text-primary font-bold">Fun Fact:</span>
                  <span className="ml-2">{fun_fact}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerCard;