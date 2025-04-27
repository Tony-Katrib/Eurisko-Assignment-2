import { User } from "../types/User";
import useAuth from "../store/useAuth";
import { UserFormData } from '../components/UserForm';
import { UserFormValues } from '../types/UserFormValues';

export const getUsers = async (search = ''): Promise<User[]> => {
    const { accessToken } = useAuth.getState();
    const res = await fetch(`/api/users${search ? `?search=${search}` : ''}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error('Failed to fetch users');
    }

    return data.result.data.users;
};

export async function createUser(user: UserFormValues) {
    const token = useAuth.getState().accessToken;

    const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Failed to create user');
    }

    return data.result.data.user;
}

export async function getUserById(id: string) {
    const { accessToken } = useAuth.getState();

    const res = await fetch(`/api/users/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) throw new Error('Failed to fetch user');
    const data = await res.json();

    return data.result.data.user;
}

export async function updateUser(id: string, data: UserFormData) {
    const token = useAuth.getState().accessToken;

    const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (!res.ok) {
        throw new Error(responseData.message || 'Failed to update user');
    }

    return responseData.result.data.user;
}

export async function deleteUser(id: string) {
    const token = useAuth.getState().accessToken;

    const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) throw new Error('Failed to delete user');
    return res.json();
}