import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle, MoveRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

const features = [
  'Post tasks in seconds',
  'Find trusted local helpers',
  'AI-powered matchmaking',
  'Track progress seamlessly',
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Logo className="h-6 w-6 text-primary" />
          <span className="ml-2 font-bold text-xl">Kaamchor</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            href="/login"
            className="text-sm font-medium hover:text-primary transition-colors"
            prefetch={false}
          >
            Login
          </Link>
          <Button asChild>
            <Link href="/login">
              Get Started <MoveRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-24 md:pt-32 lg:pt-40 animated-gradient">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-6 animate-in fade-in slide-in-from-left-12 duration-500">
                <div className="space-y-4">
                  <h1 className="text-4xl font-black tracking-tighter sm:text-6xl xl:text-7xl/none font-headline animated-text-gradient">
                    Your Life, Delegated.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl animate-in fade-in duration-500 delay-200">
                    Stop drowning in chores. Kaamchor connects you with local hustlers ready to tackle your to-do list. Get it done.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row animate-in fade-in duration-500 delay-300">
                  <Button asChild size="lg" className="shadow-lg shadow-primary/20 animate-pulse">
                    <Link href="/login">
                      Find Help Now <MoveRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  width={600}
                  height={400}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last animate-in fade-in zoom-in-95 slide-in-from-right-12 duration-700"
                />
              )}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold">The Deets</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  All Killer, No Filler.
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We kept it simple, so you can get back to your life.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2 mt-12">
              {features.map((feature, i) => (
                <div key={feature} className="flex items-start gap-4 animate-in fade-in-0 slide-in-from-bottom-10 duration-500 transition-transform hover:scale-105" style={{ animationDelay: `${i * 150}ms`}}>
                   <Card className="p-3 bg-primary/10 border-primary/20">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </Card>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">{feature}</h3>
                    <p className="text-sm text-muted-foreground">
                      Experience the convenience and peace of mind our platform offers.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Kaamchor. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
