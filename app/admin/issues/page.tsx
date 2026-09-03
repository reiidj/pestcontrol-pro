import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Bug, AlertCircle, Clock, CheckCircle } from 'lucide-react'
import { updateIssueStatus } from '@/app/auth/actions'

export default async function AdminIssuesPage() {
  const supabase = await createClient()

  // Security Check
  const { data: { user } } = await supabase.auth.getUser()
  if (user?.app_metadata?.role !== 'admin') redirect('/')

  // Fetch all issues
  const { data: issues, error } = await supabase
    .from('site_issues')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) console.error("Issues DB Error:", error)

  const validIssues = issues || []

  // --- DATA AGGREGATION FOR KPI CARDS ---
  const totalIssues = validIssues.length
  const pendingIssues = validIssues.filter(i => i.status === 'pending').length
  const inProgressIssues = validIssues.filter(i => i.status === 'in_progress').length
  const resolvedIssues = validIssues.filter(i => i.status === 'resolved').length

  return (
    <>
      <header className="mb-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2 text-[#4A7C59]">
          Platform Maintenance
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#0F1F15]">
          Site Issues
        </h1>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Reports', value: totalIssues, icon: Bug, color: '#4A7C59', bg: '#EBF2ED' },
          { label: 'Pending Action', value: pendingIssues, icon: AlertCircle, color: '#D97706', bg: '#FFFBEB' },
          { label: 'In Progress', value: inProgressIssues, icon: Clock, color: '#C8A96E', bg: '#FDF8EF' },
          { label: 'Resolved', value: resolvedIssues, icon: CheckCircle, color: '#6B7A6E', bg: '#E8E4DC' }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-[#E8E4DC] shadow-[0_2px_12px_-4px_rgba(15,31,21,0.04)]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B7A6E]">{kpi.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: kpi.bg, color: kpi.color }}>
                <kpi.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#0F1F15]">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Issues Table */}
      <div className="mt-8 bg-white rounded-2xl border border-[#E8E4DC] shadow-[0_2px_12px_-4px_rgba(15,31,21,0.04)] overflow-hidden">
        <div className="px-6 py-5 border-b border-[#E8E4DC]">
          <h2 className="text-sm font-bold text-[#0F1F15]">Recent Bug Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F9F7F2]/50 border-b border-[#E8E4DC]">
              <tr>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B7A6E]">Date Reported</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B7A6E]">Issue Details</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B7A6E]">Status</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B7A6E] text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {validIssues.map((issue) => (
                <tr key={issue.id} className="border-b border-[#E8E4DC] last:border-0 hover:bg-[#F9F7F2]/30 transition-colors">
                  
                  <td className="px-6 py-4 text-sm font-medium text-[#6B7A6E] align-top">
                    {new Date(issue.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  
                  <td className="px-6 py-4 align-top">
                    <div className="text-sm font-bold text-[#0F1F15]">{issue.title}</div>
                    <div className="text-sm text-[#6B7A6E] mt-1 max-w-md line-clamp-2">{issue.description}</div>
                  </td>
                  
                  <td className="px-6 py-4 align-top">
                    <span className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-lg border ${
                      issue.status === 'resolved' ? 'bg-[#E8E4DC] text-[#6B7A6E] border-[#6B7A6E]/20' :
                      issue.status === 'in_progress' ? 'bg-[#FDF8EF] text-[#C8A96E] border-[#C8A96E]/20' :
                      'bg-[#FFFBEB] text-[#D97706] border-[#D97706]/20'
                    }`}>
                      {issue.status.replace('_', ' ')}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 text-right align-top">
                    <form action={updateIssueStatus} className="inline-flex items-center gap-2">
                      <input type="hidden" name="id" value={issue.id} />
                      <select
                        name="status"
                        defaultValue={issue.status}
                        className="bg-[#F9F7F2] border border-[#E8E4DC] text-xs rounded-lg px-3 py-2 font-bold text-[#0F1F15] focus:outline-none focus:border-[#4A7C59] cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <button 
                        type="submit" 
                        className="text-[11px] font-bold uppercase tracking-widest bg-[#0F1F15] hover:bg-[#4A7C59] text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Update
                      </button>
                    </form>
                  </td>
                  
                </tr>
              ))}
              {validIssues.length === 0 && (
                 <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-sm font-bold text-gray-400">
                      No issues reported yet.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}