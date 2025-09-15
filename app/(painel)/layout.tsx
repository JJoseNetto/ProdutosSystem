import AuthGuard from '@/components/auth-guard';
import Sidebar from '@/components/side-bar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard mustRedirect>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 transition-all duration-300 overflow-auto">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}
