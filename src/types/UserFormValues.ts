export type UserFormValues = {
    firstName: string;
    lastName?: string | null;
    email: string;
    dateOfBirth: string;
    status: 'active' | 'locked';
};
