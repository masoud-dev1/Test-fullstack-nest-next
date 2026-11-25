'use server'; //server component

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    // 👈 ۲. این خط را بیاورید داخل تابع و NEXT_PUBLIC را حذف کنید
    const API_URL = process.env.API_URL ?? 'http://localhost:3000';

    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) },
        cache: 'no-store',
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
}