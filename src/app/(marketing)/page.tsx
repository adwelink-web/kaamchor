import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import Link from 'next/link';
import { MoveRight, Zap, Users, ShieldCheck, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const BentoCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    className={cn(
      'group relative flex flex-col justify-between rounded-xl bg-card border-2 border-primary/20 p-6 shadow-xl shadow-primary/10 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/40',
      className
    )}
  >
    <div className="transition-transform duration-500 ease-out group-hover:[transform:translateZ(40px)]">
        {children}
    </div>
    <div className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
     <div className="pointer-events-none absolute top-0 left-0 h-1/2 w-1/2 -z-10 rounded-xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-50 group-hover:-translate-x-1/4 group-hover:-translate-y-1/4" />
  </div>
);

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-transparent backdrop-blur-sm sticky top-0 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Logo className="h-6 w-6 text-primary" />
          <span className="ml-2 font-bold text-xl font-headline">Kaamchor</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            href="/splash?to=/login"
            className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            prefetch={false}
          >
            Login
          </Link>
          <Button asChild>
            <Link href="/splash?to=/role-selection">
              Get Started <MoveRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-24 md:pt-32 lg:pt-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-12 duration-700">
                <h1 className="text-5xl font-black tracking-tighter sm:text-7xl xl:text-8xl/none font-headline">
                  <span className="text-primary">Your Life,</span> Delegated.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto animate-in fade-in duration-500 delay-200">
                  Stop drowning in chores. Kaamchor connects you with local hustlers ready to tackle your to-do list. Get it done.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row items-center animate-in fade-in duration-500 delay-300">
                <Button asChild size="lg" className="shadow-lg shadow-primary/40 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
                  <Link href="/splash?to=/role-selection">
                    Find Help Now <MoveRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="text-muted-foreground transition-all duration-300 transform hover:scale-105">
                  <Link href="#">
                    Learn How It Works
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-24 md:py-32 lg:py-40">
           <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 md:grid-rows-2">
              <BentoCard className="md:col-span-2">
                 <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-primary/20 border border-primary/30"><Zap className="w-6 h-6 text-primary"/></div>
                        <CardTitle className="text-2xl font-bold font-headline">Post in Seconds</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Describe your task, set a budget, and post. It's that easy. Our AI will help you find the right person for the job, fast.
                  </p>
                </CardContent>
              </BentoCard>

              <BentoCard>
                 <CardHeader>
                    <div className="flex items-center gap-3">
                         <div className="p-3 rounded-lg bg-primary/20 border border-primary/30"><Users className="w-6 h-6 text-primary"/></div>
                        <CardTitle className="text-xl font-bold font-headline">Find Local Helpers</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Connect with trusted and verified people in your community.
                  </p>
                </CardContent>
              </BentoCard>

              <BentoCard>
                 <CardHeader>
                    <div className="flex items-center gap-3">
                         <div className="p-3 rounded-lg bg-primary/20 border border-primary/30"><ShieldCheck className="w-6 h-6 text-primary"/></div>
                        <CardTitle className="text-xl font-bold font-headline">Secure & Seamless</CardTitle>
                    </div>
                </CardHeader>
                 <CardContent>
                  <p className="text-muted-foreground">
                    Track progress and communicate easily.
                  </p>
                </CardContent>
              </BentoCard>

              <BentoCard className="md:col-span-2">
                <CardHeader>
                    <div className="flex items-center gap-3">
                         <div className="p-3 rounded-lg bg-primary/20 border border-primary/30"><MapPin className="w-6 h-6 text-primary"/></div>
                        <CardTitle className="text-2xl font-bold font-headline">AI-Powered Matchmaking</CardTitle>
                    </div>
                </CardHeader>
                 <CardContent>
                  <p className="text-muted-foreground">
                    Our smart algorithm connects you with the best-suited helper based on skills, location, and your specific task requirements.
                  </p>
                </CardContent>
              </BentoCard>
            </div>
          </div>
        </section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-white/10">
        <p className="text-xs text-muted-foreground">&copy; 2024 Kaamchor. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs text-muted-foreground hover:text-white underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs text-muted-foreground hover:text-white underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
