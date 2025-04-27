import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from './Button';
import { User } from '../types/User';
import { useNavigate } from 'react-router-dom';

const userSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email"),
    dateOfBirth: z.string().min(1, "Date of Birth is required"),
    status: z.enum(['ACTIVE', 'LOCKED']),
});

export type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
    defaultValues?: UserFormData;
    onSubmit: (data: UserFormData) => void;
    isLoading?: boolean;
}

export default function UserForm({ defaultValues, onSubmit, isLoading }: UserFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<UserFormData>({
        defaultValues,
        resolver: zodResolver(userSchema),
        mode: 'onChange',
    });

    const navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-base">
            <div>
                <label className="block mb-xs text-sm">First Name *</label>
                <input
                    {...register('firstName')}
                    className="w-full px-base py-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark dark:text-white"
                />
                {errors.firstName && <p className="text-danger text-xs mt-xs">{errors.firstName.message}</p>}
            </div>

            <div>
                <label className="block mb-xs text-sm">Last Name</label>
                <input
                    {...register('lastName')}
                    className="w-full px-base py-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark dark:text-white"
                />
            </div>

            <div>
                <label className="block mb-xs text-sm">Email *</label>
                <input
                    {...register('email')}
                    className="w-full px-base py-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark dark:text-white"
                />
                {errors.email && <p className="text-danger text-xs mt-xs">{errors.email.message}</p>}
            </div>

            <div>
                <label className="block mb-xs text-sm">Date of Birth *</label>
                <input
                    type="date"
                    {...register('dateOfBirth')}
                    className="w-full px-base py-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark dark:text-white"
                />
                {errors.dateOfBirth && <p className="text-danger text-xs mt-xs">{errors.dateOfBirth.message}</p>}
            </div>

            <div>
                <label className="block mb-xs text-sm">Status *</label>
                <select
                    {...register('status')}
                    className="w-full px-base py-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark dark:text-white"
                >
                    <option value="ACTIVE">Active</option>
                    <option value="LOCKED">Locked</option>
                </select>
                {errors.status && <p className="text-danger text-xs mt-xs">{errors.status.message}</p>}
            </div>

            <div className="flex gap-base justify-end">
                <Button variant="secondary" onClick={() => navigate('/dashboard')}>Back</Button>
                <Button type="submit" disabled={!isValid || isLoading}>
                    {isLoading ? 'Saving...' : 'Submit'}
                </Button>
            </div>
        </form>
    );
}