
import { SiteHeader } from "./SiteHeader";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container max-w-screen-2xl pt-6 pb-16">
        {children}
      </main>
      <footer className="border-t border-border/40 bg-background py-4">
        <div className="container max-w-screen-2xl flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ProjectPilot
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ for indie developers
          </p>
        </div>
      </footer>
    </div>
  );
}
