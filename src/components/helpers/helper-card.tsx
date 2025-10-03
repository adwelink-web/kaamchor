

import type { Helper } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type HelperCardProps = {
  helper: Helper;
};

export default function HelperCard({ helper }: HelperCardProps) {
  return (
    <Card className="flex flex-col text-center items-center">
      <CardHeader>
        <div className="flex justify-center">
          <Image
            src={helper.avatarUrl}
            width={80}
            height={80}
            alt={helper.name}
            className="rounded-full border-2 border-primary"
          />
        </div>
        <CardTitle>{helper.name}</CardTitle>
        <CardDescription className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 text-primary fill-primary"/> {helper.rating} / 5.0
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
          <MapPin className="w-4 h-4" />
          <span>{helper.location}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {helper.skills.map(skill => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <Button className="w-full" variant="outline" asChild>
            <Link href={`/profile`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
