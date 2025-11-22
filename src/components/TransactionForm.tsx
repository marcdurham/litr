'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LiteratureItem, Publisher } from '@/lib/data';

interface TransactionFormProps {
    type: 'IN' | 'OUT';
    inventory: LiteratureItem[];
    publishers?: Publisher[];
}

export function TransactionForm({ type, inventory, publishers }: TransactionFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        itemId: '',
        quantity: '',
        publisherId: '',
        notes: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type,
                    itemId: formData.itemId,
                    quantity: Number(formData.quantity),
                    publisherId: formData.publisherId,
                    notes: formData.notes
                }),
            });

            if (res.ok) {
                router.refresh();
                setFormData({ itemId: '', quantity: '', publisherId: '', notes: '' });
                // Optionally show success message
            }
        } catch (error) {
            console.error('Failed to submit transaction', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl border shadow-sm max-w-lg">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Literature Item</label>
                <select
                    required
                    className="w-full h-10 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.itemId}
                    onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
                >
                    <option value="">Select an item</option>
                    {inventory.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.title} ({item.type}) - {item.language}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                <input
                    type="number"
                    required
                    min="1"
                    className="w-full h-10 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
            </div>

            {type === 'OUT' && publishers && (
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Publisher</label>
                    <select
                        required
                        className="w-full h-10 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.publisherId}
                        onChange={(e) => setFormData({ ...formData, publisherId: e.target.value })}
                    >
                        <option value="">Select a publisher</option>
                        {publishers.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                <textarea
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full h-10 rounded-md font-medium text-white transition-colors ${loading ? 'bg-slate-400' : type === 'IN' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
            >
                {loading ? 'Processing...' : type === 'IN' ? 'Receive Stock' : 'Distribute Literature'}
            </button>
        </form>
    );
}
