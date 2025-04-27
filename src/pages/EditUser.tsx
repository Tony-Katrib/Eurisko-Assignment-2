import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUserById, updateUser } from '../api/users';
import UserForm, { UserFormData } from '../components/UserForm';
import { toast } from 'react-hot-toast';
import Lottie from 'lottie-react';
import loadingSpinner from '../assets/lottie/spinner.json';
import spinnerDark from '../assets/lottie/spinnerDark.json';
import useTheme from '../store/useTheme';

export default function EditUser() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { theme } = useTheme();

    const { data, isLoading: isLoadingUser } = useQuery({
        queryKey: ['user', id],
        queryFn: () => getUserById(id!),
    });

    const { mutate, status } = useMutation({
        mutationFn: (formData: UserFormData) => updateUser(id!, formData),
        onSuccess: () => {
            toast.success('User updated successfully!');
            navigate('/dashboard');
        },
        onError: () => {
            toast.error('Failed to update user.');
        },
    });

    const isLoading = status === 'pending';

    const handleUpdate = (formData: UserFormData) => {
        const updatedFormData: UserFormData = {
            ...formData,
            status: formData.status.toLocaleLowerCase() as "ACTIVE" | "LOCKED",
        };
        mutate(updatedFormData);
    };

    if (isLoadingUser) return <div className="flex justify-center items-center h-40">
        <Lottie animationData={theme === 'dark' ? spinnerDark : loadingSpinner} loop autoplay className="w-16 h-16" style={{ width: "100%", height: "100%" }} />
    </div>;

    if (!data) return (
        <p className="text-center text-danger">User not found.</p>
    );

    return (
        <div className="p-base max-w-lg mx-auto">
            <h2 className="text-title mb-base font-bold">Edit User</h2>
            <UserForm onSubmit={handleUpdate}
                defaultValues={{
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    dateOfBirth: data.dateOfBirth,
                    status: data.status as "ACTIVE" | "LOCKED",
                }}
                isLoading={isLoading} />
        </div>
    );
}