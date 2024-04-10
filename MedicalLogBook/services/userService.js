import { db } from "../config/Firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { USER_COLLECTION } from "../constants";
import axiosInstance from "../api";

export const getAllUsersDataService = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, USER_COLLECTION));
    let userArr = [];
    querySnapshot.forEach((doc) => userArr.push(doc.data()));
    return userArr;
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificUserService = async (uid) => {
  try {
    const docRef = doc(db, USER_COLLECTION, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateSpecificDataService = async (uid, keyName, data) => {
  try {
    const docRef = doc(db, USER_COLLECTION, uid);

    let res = await updateDoc(docRef, {
      [`userDetails.${keyName}`]: arrayUnion(data),
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};
