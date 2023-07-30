import Navbar from "./components/Navbar";
import { BiSearch } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';
import Card from "./components/Card";

const App = () => {

  const [contact, setContact] = useState([]);
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, 'contacts')
        const contactsSnapshot = await getDocs(contactsRef);
        const contactsList = contactsSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        });
        setContact(contactsList);
      } catch (error) {
        throw new Error("Something Went Wrong, Pls Try Again");
      }
    }
    getContacts();
  }, [])

  return (
    <div className="max-w-[400px] m-auto">
      <Navbar />

      <div className="flex relative items-center gap-2 mt-8 mb-8">
        <BiSearch className="text-white text-2xl font-extrabold absolute mx-2" />
        <input type="text" className="bg-transparent border rounded-lg h-10 flex-grow text-white pl-10 font-bold" />
        <AiFillPlusCircle className="text-white text-[40px] cursor-pointer" />
      </div>

      <Card contact={contact} />

    </div>
  )
}

export default App;