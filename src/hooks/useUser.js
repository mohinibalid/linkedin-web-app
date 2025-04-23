import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const useUser = (uid) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) {
      setUser(null);
      setLoading(false);
      return;
    }
    const docRef = doc(db, "users", `${uid}`);
    
    const q = query(collection(db, "users"), where("uid", "==", uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const postsData = querySnapshot.docs.map((doc) => doc.data());
          setUser(postsData[0]);
          setLoading(false);
          setError(null);
        });

    return () => unsubscribe();
  }, [uid]);
  return { user, loading, error };
};

export default useUser;
