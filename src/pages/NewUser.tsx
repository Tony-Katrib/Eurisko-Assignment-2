import { useMutation } from '@tanstack/react-query';
import { createUser } from '../api/users';
import UserForm, { UserFormData } from '../components/UserForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function NewUser() {
    const navigate = useNavigate();

    const { mutate, status } = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            toast.success('User created successfully!');
            setTimeout(() => {
                navigate('/dashboard');
            }, 100);
        },
        onError: () => {
            toast.error('Failed to create user.');
        },
    });

    const isLoading = status === 'pending';

    const handleCreate = (data: UserFormData) => {
        mutate({
            ...data,
            status: data.status.toLowerCase() as "active" | "locked",
        });
    };

    return (
        <div className="p-base max-w-lg mx-auto">
            <h2 className="text-title mb-base font-bold">Add New User</h2>
            <UserForm onSubmit={handleCreate} isLoading={isLoading} />
        </div>
    );
}