import { ClerkProvider } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata:Metadata = {
    title: {
        template: '%s | Admin',
        default: 'Admin'
    }
}

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({children}:AdminLayoutProps) {

    return (
        <ClerkProvider>{children}</ClerkProvider>
    )
}