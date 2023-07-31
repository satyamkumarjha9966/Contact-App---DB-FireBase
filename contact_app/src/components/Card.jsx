import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";

function Card({ contact }) {
  const { onClose, onOpen, isOpen } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success('Contact Deleted Successfully');
    } catch (error) {
      throw new Error("Something Wrong, Pls Try Again!");
    }
  };

  return (
    <div key={contact.id}
    className="flex items-center justify-around rounded-lg bg-orange-500 p-2">
      <div className="flex items-center gap-4">
        <HiOutlineUserCircle className="text-4xl font-bold" />
        <div className="text-white">
          <h1 className="text-xl font-medium">{contact.name}</h1>
          <p className="text-sm">{contact.email}</p>
          <p className="text-sm">{contact.number}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <RiEditCircleLine
          onClick={onOpen}
          className="text-4xl font-bold text-[#008000] cursor-pointer"
        />
        <IoMdTrash
          onClick={() => deleteContact(contact.id)}
          className="text-4xl font-bold text-[#FF0000] cursor-pointer"
        />
      </div>
      <AddAndUpdateContact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
}

export default Card;
