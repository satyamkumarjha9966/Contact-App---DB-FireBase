import Navbar from "./components/Navbar";
import { BiSearch } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import Card from "./components/Card";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contact, setContact] = useState([]);
  const { onClose, onOpen, isOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContact(contactsList);
          return contactsList;
        });
      } catch (error) {
        throw new Error("Something Went Wrong, Pls Try Again");
      }
    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactsList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filterContact = contactsList.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContact(filterContact);
      return filterContact;
    });
  }

  return (
    <>
      <div className="max-w-[400px] m-auto">

        <Navbar />

        <div className="flex relative items-center gap-2 mt-8 mb-8">
          <BiSearch className="text-white text-2xl font-extrabold absolute mx-2" />
          <input
            type="text"
            onChange={filterContacts}
            className="bg-transparent border rounded-lg h-10 flex-grow text-white pl-10 font-bold"
          />

          <AiFillPlusCircle
            onClick={onOpen}
            className="text-white text-[40px] cursor-pointer"
          />
          
        </div>
        <div className="flex flex-col gap-4">
          {contact.length <= 0 ? ( <NotFoundContact /> ) : 
          ( contact.map((contact) => (
                <Card key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <ToastContainer position="bottom-center" />
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default App;
