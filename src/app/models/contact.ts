
export interface Contact {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    isMarried?: boolean,
    country?: string,
    // phones: Phone[];
    // addresses: Address[];
    timezone?: string;
    gender?: string;
    tags?: string[];
    canEmail?: boolean;
    dateOfBirth?: string;
    notes?: string;
  }
