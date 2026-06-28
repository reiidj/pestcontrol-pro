'use client'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminChart({ orders }: { orders: any[] }) {
  // If no orders, return a subtle placeholder
  if (!orders || orders.length === 0) {
    return <div className="h-full flex items-center justify-center text-xs text-zinc-400 italic">No data to display</div>;
  }

  const data = orders.slice(0, 7).reverse().map(o => ({
    date: new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: o.services?.price || 0
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="date" hide />
        <Tooltip cursor={{ stroke: '#4A7C59', strokeWidth: 1 }} />
        <Line type="monotone" dataKey="revenue" stroke="#4A7C59" strokeWidth={3} dot={{ fill: '#4A7C59' }} />
      </LineChart>
    </ResponsiveContainer>
  );
}