
import React from 'react';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Badge } from '@/components/ui/badge';

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

  const workshopData = [
    { month: 'Jan', count: 4 },
    { month: 'Feb', count: 5 },
    { month: 'Mar', count: 6 },
    { month: 'Apr', count: 8 },
    { month: 'May', count: 3 },
    { month: 'Jun', count: 2 },
    { month: 'Jul', count: 2 },
    { month: 'Aug', count: 3 },
    { month: 'Sep', count: 7 },
    { month: 'Oct', count: 8 },
    { month: 'Nov', count: 7 },
    { month: 'Dec', count: 4 },
  ];

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
            Data-Driven Growth
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visualizing our impact through data. See how BDAA has grown and expanded its reach across campus.
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
              <ChartContainer 
                config={{ 
                  members: { 
                    label: "Members", 
                    color: "#ea384c" 
                  } 
                }}
              >
                <BarChart data={memberGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="year" tick={{ fill: '#666' }} />
                  <YAxis tick={{ fill: '#666' }} />
                  <Tooltip />
                  <Bar dataKey="members" fill="#ea384c" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Workshops Per Month</h3>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                57 Total
              </Badge>
            </div>
            <div className="h-[300px]">
              <ChartContainer 
                config={{ 
                  count: { 
                    label: "Workshops", 
                    color: "#f04c60" 
                  } 
                }}
              >
                <LineChart data={workshopData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="month" tick={{ fill: '#666' }} />
                  <YAxis tick={{ fill: '#666' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#f04c60" strokeWidth={3} dot={{ fill: '#f04c60', strokeWidth: 2, r: 4 }} />
                </LineChart>
              </ChartContainer>
            </div>
          </div>
          
          <div className="lg:col-span-2 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Skills Distribution</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {['Python', 'R', 'SQL', 'Tableau', 'Excel', 'Machine Learning', 'Data Mining', 'Visualization'].map((skill, index) => (
                <div key={index} className="relative h-8 bg-gray-200 rounded-md overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-primary"
                    style={{ width: `${40 + Math.random() * 50}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center px-3">
                    <span className="text-sm font-medium text-white">{skill}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataVisualization;
