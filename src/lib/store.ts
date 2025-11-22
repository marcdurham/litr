import { LiteratureItem, Transaction, Publisher, MOCK_INVENTORY, MOCK_TRANSACTIONS, MOCK_PUBLISHERS } from './data';

class Store {
    inventory: LiteratureItem[];
    transactions: Transaction[];
    publishers: Publisher[];

    constructor() {
        this.inventory = [...MOCK_INVENTORY];
        this.transactions = [...MOCK_TRANSACTIONS];
        this.publishers = [...MOCK_PUBLISHERS];
    }

    getInventory() {
        return this.inventory;
    }

    updateInventory(itemId: string, quantityChange: number) {
        const item = this.inventory.find(i => i.id === itemId);
        if (item) {
            item.quantity += quantityChange;
            return item;
        }
        return null;
    }

    addTransaction(transaction: Transaction) {
        this.transactions.push(transaction);
        // Update inventory based on transaction
        const multiplier = transaction.type === 'IN' ? 1 : -1;
        // For adjustments, it depends, but let's assume 'ADJUSTMENT' sets the value or adds? 
        // Let's keep it simple: IN adds, OUT subtracts. ADJUSTMENT could be +/-.
        // If type is ADJUSTMENT, we might expect quantity to be the delta.

        this.updateInventory(transaction.itemId, transaction.quantity * multiplier);
        return transaction;
    }

    getTransactions() {
        return this.transactions;
    }

    getPublishers() {
        return this.publishers;
    }
}

// Singleton instance for the mock server
export const db = new Store();
