import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminDashboard } from '@/components/AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  if (cookieStore.get('joey-admin')?.value !== 'authenticated') {
    redirect('/admin');
  }
  return <AdminDashboard />;
}
