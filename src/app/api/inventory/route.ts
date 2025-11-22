import { NextResponse } from 'next/server';
import { db } from '@/lib/store';

export async function GET() {
    return NextResponse.json(db.getInventory());
}

export async function POST(request: Request) {
    // This could be used for manual inventory adjustments (e.g. stocktaking)
    const body = await request.json();
    const { itemId, quantityChange } = body;

    const updatedItem = db.updateInventory(itemId, quantityChange);

    if (!updatedItem) {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Log this as an adjustment transaction
    db.addTransaction({
        id: Math.random().toString(36).substr(2, 9),
        type: 'ADJUSTMENT',
        itemId,
        quantity: Math.abs(quantityChange),
        date: new Date().toISOString(),
        notes: 'Manual adjustment'
    });

    return NextResponse.json(updatedItem);
}
