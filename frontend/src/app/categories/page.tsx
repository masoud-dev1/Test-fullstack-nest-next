'use client';
import { useEffect, useState } from 'react';
import {apiFetch} from "../../../lib/api";

type Category = { id: number; name: string };

export default function CategoriesPage() {
    const [categories , setCategories] = useState<Category[]>([]);
    const [name, setName] = useState('');

    const load = () => apiFetch<Category[]>('/categories').then(setCategories);
    useEffect(() => { load(); }, []);

    const create = async (e: React.FormEvent) => {
        e.preventDefault();
        await apiFetch('/categories', { method: 'POST', body: JSON.stringify({name }) });
        setName('');
        load();
    };

    const remove = async (id: number) => {
        await apiFetch(`/categories/${id}`, { method: 'DELETE' });
        load();
    };

    return (
        <div>
            <h2>Users</h2>
            <form onSubmit={create} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <button>Create</button>
            </form>
            <ul>
                {categories.map((u) => (
                    <li key={u.id}>
                        #{u.id} — {u.name} ({u.name}){' '}
                        <button onClick={() => remove(u.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}