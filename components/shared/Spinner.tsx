export default function Spinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[var(--primary)]"></div>
    </div>
  );
}