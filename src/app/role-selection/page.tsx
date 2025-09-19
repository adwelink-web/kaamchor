import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { User, Briefcase } from 'lucide-react';

export default function RoleSelectionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">Apna Role Chunein</h1>
        <p className="text-muted-foreground mt-2">
          Aap yahan kaam karwane aaye hain ya kaam karne?
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Link href="/signup?role=requester">
            <Card className="text-center hover:bg-primary/5 border-2 border-transparent hover:border-primary/30 transition-all duration-300 transform hover:scale-105 cursor-pointer flex flex-col items-center p-8 h-full">
            <CardHeader>
                <div className="mx-auto bg-primary/20 p-4 rounded-full mb-4">
                    <User className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl font-headline">Mujhe Madad Chahiye</CardTitle>
                <CardDescription>
                Kaam post karein aur apne area mein skilled helpers paayein.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="outline">Requester Banein</Button>
            </CardContent>
            </Card>
        </Link>

        <Link href="/signup?role=helper">
            <Card className="text-center hover:bg-primary/5 border-2 border-transparent hover:border-primary/30 transition-all duration-300 transform hover:scale-105 cursor-pointer flex flex-col items-center p-8 h-full">
            <CardHeader>
                 <div className="mx-auto bg-primary/20 p-4 rounded-full mb-4">
                    <Briefcase className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl font-headline">Main Madad Karunga</CardTitle>
                <CardDescription>
                Available kaam dekhein, apni skills offer karein, aur paise kamayein.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Button>Helper Banein</Button>
            </CardContent>
            </Card>
        </Link>
      </div>
       <p className="mt-8 text-center text-sm text-muted-foreground">
          Pehle se account hai?{' '}
          <Link href="/login" className="underline hover:text-primary">
            Log In Karein
          </Link>
        </p>
    </div>
  );
}
