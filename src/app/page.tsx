import { db } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ArrowUpFromLine, AlertTriangle, Clock } from "lucide-react";

// Simple Card Component since I don't have the full shadcn library installed yet
function StatsCard({ title, value, icon: Icon, description, color }: any) {
  return (
    <div className="rounded-xl border bg-white text-card-foreground shadow-sm">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium text-slate-600">{title}</h3>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground text-slate-600">{description}</p>
      </div>
    </div>
  );
}

export default async function Dashboard() {
  // Direct DB access for Server Components
  const inventory = db.getInventory();
  const transactions = db.getTransactions();

  const totalItems = inventory.reduce((acc, item) => acc + item.quantity, 0);
  const lowStockItems = inventory.filter(i => i.quantity < 50).length;

  // Calculate distributed this month
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const distributedThisMonth = transactions
    .filter(t => t.type === 'OUT' && new Date(t.date) >= firstDayOfMonth)
    .reduce((acc, t) => acc + t.quantity, 0);

  const recentTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
        <p className="text-slate-600">Overview of your literature inventory and activity.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Inventory"
          value={totalItems}
          icon={Package}
          description="Items currently in stock"
          color="text-blue-500"
        />
        <StatsCard
          title="Distributed (Month)"
          value={distributedThisMonth}
          icon={ArrowUpFromLine}
          description="Items handed out this month"
          color="text-green-500"
        />
        <StatsCard
          title="Low Stock Alerts"
          value={lowStockItems}
          icon={AlertTriangle}
          description="Items with < 50 quantity"
          color="text-amber-500"
        />
        <StatsCard
          title="Recent Activity"
          value={transactions.length} // Just a count for now
          icon={Clock}
          description="Total transactions recorded"
          color="text-purple-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border bg-white shadow-sm">
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-4">Recent Transactions</h3>
            <div className="space-y-4">
              {recentTransactions.map((t) => {
                const item = inventory.find(i => i.id === t.itemId);
                return (
                  <div key={t.id} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${t.type === 'IN' ? 'bg-green-100 text-green-600' : t.type === 'OUT' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                        {t.type === 'IN' ? <Package className="h-4 w-4" /> : <ArrowUpFromLine className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {t.type === 'IN' ? 'Received' : 'Distributed'} {t.quantity} {item?.title || 'Unknown Item'}
                        </p>
                        <p className="text-xs text-slate-600">
                          {new Date(t.date).toLocaleDateString()} • {t.notes || (t.publisherId ? `To: Publisher ${t.publisherId}` : '')}
                        </p>
                      </div>
                    </div>
                    <div className={`text-sm font-bold ${t.type === 'IN' ? 'text-green-600' : 'text-blue-600'}`}>
                      {t.type === 'IN' ? '+' : '-'}{t.quantity}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-span-3 rounded-xl border bg-white shadow-sm">
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-4">Inventory Status</h3>
            <div className="space-y-4">
              {inventory.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Placeholder image or icon */}
                    <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center text-slate-400">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-600">{item.type} • {item.language}</p>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-slate-700">{item.quantity}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
