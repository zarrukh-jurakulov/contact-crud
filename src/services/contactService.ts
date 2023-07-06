import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  // limit,
  // orderBy,
  query,
  // startAfter,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { ContactForm, ContactType } from "../types/contactTypes";

const fetchContacts = async () =>
  // indexOfFirstItem: number,
  // datasPerPage: number
  {
    try {
      const contactsRef = collection(db, "contacts");
      const queryRef = query(
        contactsRef
        // orderBy("name"),
        // limit(datasPerPage),
        // startAfter(indexOfFirstItem * datasPerPage)
      );

      const querySnapshot = await getDocs(queryRef);
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return newData;
    } catch (error) {
      console.log("Get Contact Error =>", error);
      throw error;
    }
  };

const fetchContactsCount = async () => {
  const coll = collection(db, "contacts");
  const snapshot = await getCountFromServer(coll);

  return snapshot.data();
};

const fetchContactById = async (id: string) => {
  try {
    const d = await getDoc(doc(db, "contacts", id));

    return d.data();
  } catch (error) {
    console.log(error);
  }
};

const createContact = async (data: ContactForm) => {
  try {
    const docRef = await addDoc(collection(db, "contacts"), data);
    return docRef;
  } catch (error) {
    console.log("Create Contact Error =>", error);
  }
};

const updateContact = async (data: ContactType | any) => {
  try {
    const req = await updateDoc(doc(db, "contacts", data.id), data);
    return req;
  } catch (error) {
    console.log("Update Contact Error => ", error);
  }
};

const deleteContact = async (id: string) => {
  try {
    return await deleteDoc(doc(db, "contacts", id));
  } catch (error) {
    console.log("Delete Contact Error => ", error);
  }
};

export {
  fetchContacts,
  fetchContactsCount,
  fetchContactById,
  createContact,
  updateContact,
  deleteContact,
};
