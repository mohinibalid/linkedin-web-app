import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";
import { Snackbar, Alert } from '@mui/material';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = querySnapshot.docs.map((doc) => doc.data());
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  const deletePost = async (postId) => {
    try {
      const postRef = doc(db, "posts", postId);
      await deleteDoc(postRef);
      setSnackbarMessage(`Post deleted successfully!`); 
      setSnackbarOpen(true); 
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false); 
  };

  return posts.map((post) => {
    return <>
      <Post key={post.postId} post={post} deletePost={deletePost} />
      <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000} // Snackbar will auto-close after 3 seconds
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
              {snackbarMessage}
          </Alert>
      </Snackbar>
    </>;
  });
};

export default Posts;
