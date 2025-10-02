
import type { User, Task, Helper } from '@/lib/types';
import { db } from './firebase';
import { collection, getDocs, query, where, Timestamp, doc, getDoc, onSnapshot } from 'firebase/firestore';


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

export function onTasksByRequesterUpdate(requesterId: string, callback: (tasks: Task[]) => void) {
    const tasksCol = collection(db, 'tasks').withConverter(taskConverter);
    const q = query(tasksCol, where('requesterId', '==', requesterId));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tasks = querySnapshot.docs.map(doc => doc.data());
        callback(tasks);
    });

    return unsubscribe;
}

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

export async function getHelpers(): Promise<Helper[]> {
    const usersCol = collection(db, 'users');
    const q = query(usersCol, where('role', '==', 'helper'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name,
            avatarUrl: data.photoURL || `https://i.pravatar.cc/150?u=${doc.id}`,
            location: data.location,
            skills: data.skills || ['General Help'], // Placeholder
            rating: data.rating || 4.5, // Placeholder
            pastWork: data.pastWork || "No past work summary available." // Placeholder
        } as Helper;
    });
}

export async function getHelper(id: string): Promise<Helper | undefined> {
    const userDocRef = doc(db, 'users', id);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.role === 'helper') {
             return {
                id: userSnap.id,
                name: data.name,
                avatarUrl: data.photoURL || `https://i.pravatar.cc/150?u=${userSnap.id}`,
                location: data.location,
                skills: data.skills || ['General Help'], // Placeholder
                rating: data.rating || 4.5, // Placeholder
                pastWork: data.pastWork || "No past work summary available." // Placeholder
            } as Helper;
        }
    }
    return undefined;
}

export async function getUser(id: string): Promise<User | null> {
    const userDocRef = doc(db, 'users', id);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
        const data = userSnap.data();
        return { 
            id: userSnap.id,
            name: data.name,
            email: data.email,
            avatarUrl: data.photoURL,
            location: data.location || "Mumbai, MH", // fallback location
            role: data.role,
        } as User;
    }

    // Return null if no user profile is found in Firestore.
    return null;
}
