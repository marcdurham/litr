import { db } from "@/lib/store";
import { TransactionForm } from "@/components/TransactionForm";
import { ArrowDownToLine } from "lucide-react";

export default function OrdersPage() {
    const inventory = db.getInventory();
    const transactions = db.getTransactions().filter(t => t.type === 'IN').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Incoming Orders</h2>
                <p className="text-slate-600">Log new literature shipments arriving at the congregation.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <h3 className="text-lg font-medium text-slate-900 mb-4">Receive New Stock</h3>
                    <TransactionForm type="IN" inventory={inventory} />
                </div>

                <div className="lg:col-span-2">
                    <h3 className="text-lg font-medium text-slate-900 mb-4">Recent Arrivals</h3>
                    <div className="rounded-md border bg-white">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-slate-700">Date</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-slate-700">Item</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-slate-700">Notes</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-slate-700">Quantity</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {transactions.map((t) => {
                                    const item = inventory.find(i => i.id === t.itemId);
                                    return (
                                        <tr key={t.id} className="border-b transition-colors hover:bg-slate-50/50">
                                            <td className="p-4 align-middle">{new Date(t.date).toLocaleDateString()}</td>
                                            <td className="p-4 align-middle font-medium">{item?.title || 'Unknown'}</td>
                                            <td className="p-4 align-middle text-slate-600">{t.notes || '-'}</td>
                                            <td className="p-4 align-middle text-right font-bold text-green-600">+{t.quantity}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
