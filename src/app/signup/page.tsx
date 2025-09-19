'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/icons';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

function SignupContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const role = searchParams.get('role');

  const roleText = role === 'helper' ? 'Helper' : 'Requester';
  const loginHref = role === 'helper' ? '/helper/dashboard' : '/requester/dashboard';

  const handleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: 'Account Ban Gaya!',
        description: `Kaamchor par aapka ${roleText} ke roop mein swagat hai!`,
      });
      router.push(loginHref);
    } catch (error) {
      console.error('Error during sign-up:', error);
      toast({
        title: 'Sign-up Asafal',
        description: 'Kuch gadbad ho gayi. Kripya phir se koshish karein.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Logo className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">Apna {roleText} Account Banayein</CardTitle>
          <CardDescription>Shuru karne ke liye bas ek aur kadam!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button onClick={handleSignUp}>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.19,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.19,22C17.6,22 21.5,18.33 21.5,12.33C21.5,11.76 21.45,11.44 21.35,11.1Z"
                  />
                </svg>
                Google Se Sign Up Karein
              </div>
            </Button>
             <p className="text-center text-xs text-muted-foreground">
                Galat role? <Link href="/role-selection" className="underline hover:text-primary">Waapis jaayein</Link>
            </p>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Sign up karke, aap humari{' '}
            <Link href="#" className="underline">
              Seva ki Shartein
            </Link>
             se sehmat hain.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


export default function SignupPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignupContent />
        </Suspense>
    )
}
