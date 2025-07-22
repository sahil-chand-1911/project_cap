export type Charity = {
  id: string;
  name: string;
  description: string;
  category: string;
  // Add other fields as needed
};

export type Donation = {
  id: string;
  amount: number;
  charityId: string;
  charityName: string;
  recurring?: boolean;
  date: string;
  status: string;
  receiptUrl: string;
  // Add other fields as needed
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  // Add other fields as needed
};