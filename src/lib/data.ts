export type LiteratureType = 'Book' | 'Magazine' | 'Tract' | 'Brochure';

export interface LiteratureItem {
    id: string;
    title: string;
    type: LiteratureType;
    quantity: number;
    language: string;
    image?: string;
}

export interface Publisher {
    id: string;
    name: string;
}

export type TransactionType = 'IN' | 'OUT' | 'ADJUSTMENT';

export interface Transaction {
    id: string;
    type: TransactionType;
    itemId: string;
    quantity: number;
    date: string;
    publisherId?: string; // For OUT transactions
    notes?: string;
}

// Mock Data
export const MOCK_PUBLISHERS: Publisher[] = [
    { id: 'p1', name: 'Alice Johnson' },
    { id: 'p2', name: 'Bob Smith' },
    { id: 'p3', name: 'Charlie Brown' },
    { id: 'p4', name: 'Diana Prince' },
];

export const MOCK_INVENTORY: LiteratureItem[] = [
    { id: 'l1', title: 'The Watchtower', type: 'Magazine', quantity: 150, language: 'English', image: '/placeholder-wt.jpg' },
    { id: 'l2', title: 'Awake!', type: 'Magazine', quantity: 120, language: 'English', image: '/placeholder-aw.jpg' },
    { id: 'l3', title: 'Enjoy Life Forever!', type: 'Book', quantity: 50, language: 'English', image: '/placeholder-elf.jpg' },
    { id: 'l4', title: 'Bible Teachings', type: 'Book', quantity: 30, language: 'Spanish', image: '/placeholder-bt.jpg' },
    { id: 'l5', title: 'Good News', type: 'Brochure', quantity: 200, language: 'English', image: '/placeholder-gn.jpg' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 't1', type: 'IN', itemId: 'l1', quantity: 200, date: '2023-10-01T10:00:00Z', notes: 'Monthly shipment' },
    { id: 't2', type: 'OUT', itemId: 'l1', quantity: 10, date: '2023-10-02T14:30:00Z', publisherId: 'p1' },
    { id: 't3', type: 'OUT', itemId: 'l3', quantity: 2, date: '2023-10-03T09:15:00Z', publisherId: 'p2' },
];
