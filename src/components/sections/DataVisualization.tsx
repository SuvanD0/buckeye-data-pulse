import React from 'react';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Trophy, Wrench } from 'lucide-react';

const DataVisualization = () => {
  // Sample data for charts
  const memberGrowthData = [
    { year: '2018', members: 150 },
    { year: '2019', members: 230 },
    { year: '2020', members: 280 },
    { year: '2021', members: 340 },
    { year: '2022', members: 420 },
    { year: '2023', members: 500 },
  ];

  // NEW: Sample data for Competition Participation
  const competitionData = [
    { name: 'Kaggle Intro', participants: 25, year: 2022 },
    { name: "OSU Datathon '23", participants: 40, year: 2023 },
    { name: 'Internal Case Comp', participants: 32, year: 2023 },
    { name: 'Predictive Analytics Challenge', participants: 28, year: 2024 },
    { name: "OSU Datathon '24", participants: 55, year: 2024 },
  ];

  // NEW: Sample data for Tool & Technology Focus
  const toolFocusData = [
    { tool: 'Python', focus: 85 },
    { tool: 'SQL', focus: 70 },
    { tool: 'R', focus: 45 },
    { tool: 'Tableau', focus: 60 },
    { tool: 'TensorFlow/Keras', focus: 55 },
    { tool: 'Scikit-learn', focus: 75 },
    { tool: 'Git/GitHub', focus: 50 },
  ];

  // Chart config helper
  const chartConfig = (label: string, color: string) => ({
    [label.toLowerCase()]: { label, color }
  });

  return (
    <section className="section-padding bg-gray-50 relative">
      {/* Minimal Data Visualization Background */}
      <div className="absolute inset-0 bg-data-grid bg-[size:20px_20px] opacity-20"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Our Impact
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Data-Driven Growth & Activity
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visualizing our journey: member expansion, competitive engagement, and technology focus.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Member Growth</h3>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                +19% YoY
              </Badge>
            </div>
            <div className="h-[300px]">
              <ChartContainer config={chartConfig("Members", "#ea384c")}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={memberGrowthData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="year" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} width={30}/>
                    <Tooltip
                      cursor={{ fill: 'rgba(234, 56, 76, 0.1)' }}
                      contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="members" fill="#ea384c" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                 <Trophy size={20} className="mr-2 text-secondary"/> Competition Participation
              </h3>
              <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-none">
                Growing Engagement
              </Badge>
            </div>
            <div className="h-[300px]">
              <ChartContainer config={chartConfig("Participants", "#f5a623")}>
                <ResponsiveContainer width="100%" height="100%">
                   {/* Using name for X-axis might get crowded, consider year or simplified names if needed */}
                   <BarChart data={competitionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" tick={{ fill: '#666', fontSize: 10 }} interval={0} angle={-20} textAnchor="end" height={40} axisLine={false} tickLine={false}/>
                    <YAxis tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} width={30}/>
                    <Tooltip
                      cursor={{ fill: 'rgba(245, 166, 35, 0.1)' }}
                      contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="participants" fill="#f5a623" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
             <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Wrench size={20} className="mr-2 text-accent" /> Tool & Technology Focus
              </h3>
               <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-none">
                Core Curriculum
              </Badge>
            </div>
            <div className="h-[300px] mt-4">
              <ChartContainer config={chartConfig("Focus", "#4a90e2")}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={toolFocusData} layout="horizontal" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="tool" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false}/>
                    <YAxis tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} width={30}/>
                     <Tooltip
                      cursor={{ fill: 'rgba(74, 144, 226, 0.1)' }}
                      contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="focus" fill="#4a90e2" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataVisualization;
