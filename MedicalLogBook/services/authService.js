import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../config/Firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { USER_COLLECTION } from "../constants";
import { userSchema } from "../schema/userSchema";
import { getSpecificUserService } from "./userService";

export const signUpWithFirebase = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed up
    const userId = userCredential.user.uid;

    let updatedObj = {
      ...userSchema,
      authDetails: {
        ...userSchema.authDetails,
        email: email,
        userId: userId,
      },
    };

    await setDoc(doc(db, USER_COLLECTION, userId), updatedObj);

    return updatedObj;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
    // return { errorCode, errorMessage };
  }
};

export const signInWithFirebase = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed up
    const userId = userCredential.user.uid;

    let result = await getSpecificUserService(userId);

    return result;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
  }
};
