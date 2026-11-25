'use client';
import { useEffect, useState } from 'react';
import {apiFetch} from "../../../lib/api";

type User = { id: number; name: string };
type Category = { id: number; name: string };
type Post = { id: number; title: string; content: string; userId: number; categoryId: number | null; user?: User; category?: Category | null };

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [cats, setCats] = useState<Category[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState<number | ''>('');
    const [categoryId, setCategoryId] = useState<number | ''>('');

    const load = () => apiFetch<Post[]>('/posts').then(setPosts);
    useEffect(() => {
        load();
        apiFetch<User[]>('/users').then(setUsers);
        apiFetch<Category[]>('/categories').then(setCats);
    }, []);

    const create = async (e: React.FormEvent) => {
        e.preventDefault();
        await apiFetch('/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content, userId: Number(userId), categoryId: categoryId ? Number(categoryId) : undefined }),
        });
        setTitle(''); setContent(''); setUserId(''); setCategoryId('');
        load();
    };

    const remove = async (id: number) => {
        await apiFetch(`/posts/${id}`, { method: 'DELETE' });
        load();
    };

    return (
        <div>
            <h2>Posts</h2>
            <form onSubmit={create} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
                <select value={userId} onChange={(e) => setUserId(e.target.value ? Number(e.target.value) : '')} required>
                    <option value="">-- User --</option>
                    {users.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : '')}>
                    <option value="">-- Category (optional) --</option>
                    {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <button>Create</button>
            </form>
            <ul>
                {posts.map((p) => (
                    <li key={p.id}>
                        <b>{p.title}</b> — by {p.user?.name ?? '?'} — cat: {p.category?.name ?? '—'}{' '}
                        <button onClick={() => remove(p.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}