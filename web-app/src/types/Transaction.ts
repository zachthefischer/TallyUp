export interface Transaction  {
    id: string;
    amount: number;
    description: string;
    to: string;
    from: string;
    dateTime: string;
    fulfilled: boolean;
    history: string[];
}