import type { User, Task, Helper } from '@/lib/types';
import { db } from './firebase';
import { collection, getDocs, query, where, Timestamp, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


// Firestore data converter
const taskConverter = {
    toFirestore: (task: Task) => {
        return {
            ...task,
            createdAt: Timestamp.fromDate(task.createdAt),
        };
    },
    fromFirestore: (snapshot, options): Task => {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            ...data,
            createdAt: data.createdAt.toDate(),
        } as Task;
    }
};

export async function getTasks() {
    const tasksCol = collection(db, 'tasks').withConverter(taskConverter);
    const querySnapshot = await getDocs(tasksCol);
    return querySnapshot.docs.map(doc => doc.data());
}

export async function getTask(id: string) {
    const taskDocRef = doc(db, 'tasks', id).withConverter(taskConverter);
    const taskSnap = await getDoc(taskDocRef);
    if (taskSnap.exists()) {
        return taskSnap.data();
    }
    return undefined;
}


export async function getTasksByRequester(requesterId: string) {
    const tasksCol = collection(db, 'tasks').withConverter(taskConverter);
    const q = query(tasksCol, where('requesterId', '==', requesterId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
}

export async function getHelpers() {
    const helpersCol = collection(db, 'helpers');
    const querySnapshot = await getDocs(helpersCol);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Helper[];
}

export async function getHelper(id: string) {
    const helperDocRef = doc(db, 'helpers', id);
    const helperSnap = await getDoc(helperDocRef);
    if (helperSnap.exists()) {
        return { id: helperSnap.id, ...helperSnap.data() } as Helper;
    }
    return undefined;
}

export async function getUser(id: string): Promise<User | null> {
    // This is a simplified function. In a real app, you'd fetch user data 
    // from a 'users' collection in Firestore, which would be created on sign-up.
    // For now, we'll construct a user object from what we can, assuming the ID is a Firebase Auth UID.
    // This won't work server-side without the Admin SDK, but it demonstrates the principle on the client.
    
    // This is a placeholder as we don't have a full user profile system.
    // In a real app, you would fetch this from a 'users' collection.
    const mockUser = {
        id: id,
        name: "A Requester", // Placeholder name
        email: "requester@example.com", // Placeholder email
        avatarUrl: `https://picsum.photos/seed/${id}/100/100`,
        location: "Mumbai, MH" // Placeholder location
    };

    // A more realistic approach would be to have a 'users' collection
    const userDocRef = doc(db, 'users', id);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
        return { id: userSnap.id, ...userSnap.data() } as User;
    }

    // Fallback to placeholder if no user profile in Firestore.
    return mockUser;
}
