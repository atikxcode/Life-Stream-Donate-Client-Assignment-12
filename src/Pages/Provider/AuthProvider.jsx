import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../../Firebase/firebase.config'
import { GoogleAuthProvider, GithubAuthProvider  } from "firebase/auth";
import useAxiosSecure from '../../hooks/useAxiosPublic'

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {

  const axiosPublic = useAxiosSecure()

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    return signInWithPopup(auth, googleProvider)
  }


  const handleGithubSignIn = () => {
    return signInWithPopup(auth, githubProvider)
  }

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const[theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');
  
  
  
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
  }

  const updateUser = (user, name, photo) => {
    
    return updateProfile(user, {
      displayName: name,
       photoURL: photo
    })
  }

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }

  useEffect(() => {
   const unSubscribe =  onAuthStateChanged(auth, currentUser => {
      console.log('user in the auth state changed', currentUser)
      setUser(currentUser)
      if(currentUser){
        const userInfo = {
          email: currentUser?.email
        }
        // get token and store client
        axiosPublic.post('/jwt', userInfo)
        .then(res => {
          if(res.data.token){
            localStorage.setItem('access-token', res.data.token);
          }
        })
      } else {
        localStorage.removeItem('access-token')
      }
      setLoading(false)
      
    });
    return () => {
      unSubscribe();
    }
  },[])






  const authInfo = {
    user,
    createUser,
    logOut,
    signIn,
    handleGoogleSignIn,
    handleGithubSignIn,
    updateUser,
    loading,
    theme,
   setTheme,

  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;