import { NextResponse } from 'next/server';
import { db } from '@/lib/store';
import { Transaction } from '@/lib/data';

export async function GET() {
    return NextResponse.json(db.getTransactions());
}

export async function POST(request: Request) {
    const body = await request.json();
    const { type, itemId, quantity, publisherId, notes } = body;

    if (!type || !itemId || !quantity) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transaction: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        itemId,
        quantity: Number(quantity),
        date: new Date().toISOString(),
        publisherId,
        notes
    };

    db.addTransaction(transaction);

    return NextResponse.json(transaction);
}
