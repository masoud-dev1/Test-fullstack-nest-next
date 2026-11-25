'use client';
import { useEffect, useState } from 'react';
import {apiFetch} from "../../../lib/api";

type User = { id: number; email: string; name: string };
type Category = { id: number; name: string };
type Post = { id: number; title: string; content: string; userId: number; categoryId: number | null; user?: User; category?: Category | null };

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const load = () => apiFetch<User[]>('/users').then(setUsers);
    useEffect(() => { load(); }, []);

    const create = async (e: React.FormEvent) => {
        e.preventDefault();
        await apiFetch('/users', { method: 'POST', body: JSON.stringify({ email, name }) });
        setEmail(''); setName('');
        load();
    };

    const remove = async (id: number) => {
        await apiFetch(`/users/${id}`, { method: 'DELETE' });
        load();
    };

    return (
        <div>
            <h2>Users</h2>
            <form onSubmit={create} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <button>Create</button>
            </form>
            <ul>
                {users.map((u) => (
                    <li key={u.id}>
                        #{u.id} — {u.name} ({u.email}){' '}
                        <button onClick={() => remove(u.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}