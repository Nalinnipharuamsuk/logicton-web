"use client";

export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-slate-900">Dashboard Overview</h1>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-600 font-medium mb-2 text-base">Total Visits</h3>
                    <p className="text-4xl font-bold text-blue-600 tracking-tight">12,450</p>
                    <span className="text-sm text-green-600 font-medium">↑ 12% from last month</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-600 font-medium mb-2 text-base">New Inquiries</h3>
                    <p className="text-4xl font-bold text-blue-600 tracking-tight">45</p>
                    <span className="text-sm text-green-600 font-medium">↑ 5% from last week</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-600 font-medium mb-2 text-base">Active Projects</h3>
                    <p className="text-4xl font-bold text-blue-600 tracking-tight">8</p>
                    <span className="text-sm text-slate-500 font-medium">Stable</span>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold mb-4 text-slate-900">Recent Activity</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-slate-900">New contact form submission</p>
                                    <p className="text-sm text-slate-500">From: user{i}@example.com</p>
                                </div>
                            </div>
                            <span className="text-sm text-slate-500">2 hours ago</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
