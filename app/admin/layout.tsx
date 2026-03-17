// Minimal admin segment layout.
// - Login page uses this directly (clean, no sidebar).
// - Dashboard pages are nested under (dashboard)/layout.tsx which adds the sidebar.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
