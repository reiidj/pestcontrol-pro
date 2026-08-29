'use client'

import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar 
} from 'recharts'

const COLORS = ['#4A7C59', '#C8A96E', '#0F1F15', '#6B7A6E']

export default function AnalyticsDashboard({ revenueData, packageData, sizeData }: { 
  revenueData: any[], packageData: any[], sizeData: any[] 
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* 2/3 Width: Revenue Trend Line Chart */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E8E4DC] shadow-[0_2px_12px_-4px_rgba(15,31,21,0.04)]">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#0F1F15] mb-6">Revenue Growth</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E4DC" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7A6E' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7A6E' }} tickFormatter={(val) => `$${val}`} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(15,31,21,0.1)' }}
                itemStyle={{ color: '#0F1F15', fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#4A7C59" strokeWidth={3} dot={{ r: 4, fill: '#4A7C59', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 1/3 Width: Package Breakdown Donut Chart */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8E4DC] shadow-[0_2px_12px_-4px_rgba(15,31,21,0.04)] flex flex-col">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#0F1F15] mb-2">Package Share</h3>
        <div className="h-[250px] w-full flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={packageData}
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {packageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(15,31,21,0.1)' }} 
                itemStyle={{ color: '#0F1F15', fontWeight: 'bold' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Custom Legend */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {packageData.map((entry, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-[10px] font-bold text-[#6B7A6E] truncate">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Full Width: Property Size Bar Chart */}
      <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-[#E8E4DC] shadow-[0_2px_12px_-4px_rgba(15,31,21,0.04)]">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#0F1F15] mb-6">Demographics: Property Size</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sizeData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E4DC" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7A6E', fontWeight: 'bold' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7A6E' }} allowDecimals={false} />
              <Tooltip 
                cursor={{ fill: '#F9F7F2' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(15,31,21,0.1)' }}
              />
              <Bar dataKey="count" fill="#C8A96E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}