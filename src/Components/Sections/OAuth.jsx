import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { db } from "../utils/Firebase";

const OAuth = () => {
  const onGoogleClick = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // Check if the user document already exists
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error); // Log the error for debugging
      toast.error("Could not sign in with Google"); // Show an error toast
    }
  };

  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="flex items-center justify-center w-full uppercase px-7 py-2 text-sm font-medium rounded border border-gray-300 bg-red-600 hover:bg-red-700 active:bg-red-900 text-white shadow-md hover:shadow-lg active:shadow-lg transition ease-in-out duration-300"
    >
      <FcGoogle className="text-2xl mr-2 bg-white rounded-full" /> Continue with
      Google
    </button>
  );
};

export default OAuth;
