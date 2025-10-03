
import { auth } from '@/lib/firebase';
import { getUser } from '@/lib/data';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getApps } from 'firebase/app';


// This page is a placeholder to redirect to the correct profile page.
export default async function ProfileRedirectPage() {
    const headerList = headers();
    const cookie = headerList.get('cookie');
    
    // This is a workaround for Next.js bug with server-side auth
    if (getApps().length === 0) {
        return null;
    }

    const user = auth.currentUser;
    
    if (user) {
        const dbUser = await getUser(user.uid);
        if (dbUser?.role === 'helper') {
            redirect('/helper/profile');
        } else {
            redirect('/requester/profile');
        }
    } else {
        redirect('/login');
    }

    return null; // or a loading spinner
}
