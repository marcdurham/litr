import { db } from "@/lib/store";
import { Package, Search } from "lucide-react";

export default function InventoryPage() {
    const inventory = db.getInventory();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Inventory</h2>
                    <p className="text-slate-600">Manage your literature stock.</p>
                </div>
                <div className="flex items-center space-x-2">
                    {/* Placeholder for search/filter */}
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search items..."
                            className="h-10 rounded-md border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            <div className="rounded-md border bg-white">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-700">Item</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-700">Type</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-slate-700">Language</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-slate-700">Quantity</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-slate-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {inventory.map((item) => (
                                <tr key={item.id} className="border-b transition-colors hover:bg-slate-50/50">
                                    <td className="p-4 align-middle font-medium">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center text-slate-400">
                                                <Package className="h-5 w-5" />
                                            </div>
                                            <span>{item.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle">{item.type}</td>
                                    <td className="p-4 align-middle">{item.language}</td>
                                    <td className="p-4 align-middle text-right font-bold">{item.quantity}</td>
                                    <td className="p-4 align-middle text-right">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.quantity > 50
                                            ? 'bg-green-100 text-green-800'
                                            : item.quantity > 0
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {item.quantity > 50 ? 'In Stock' : item.quantity > 0 ? 'Low Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
