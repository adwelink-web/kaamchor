import type { User, Task, Helper } from '@/lib/types';
import { db } from './firebase';
import { collection, getDocs, query, where, Timestamp, doc, getDoc } from 'firebase/firestore';


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

export async function getUser(id: string) {
    // In a real app, you would have a 'users' collection with public profiles.
    // We are simulating this for now as we don't have a public user profile collection yet.
    // This would be expanded to fetch a user's public profile from Firestore.
    // NOTE: This does not fetch the authenticated user object, but a public user profile.
    return {
        id: id,
        name: "Mock User",
        email: "mock@user.com",
        avatarUrl: `https://picsum.photos/seed/${id}/100/100`,
        location: "San Francisco, CA"
    };
}
