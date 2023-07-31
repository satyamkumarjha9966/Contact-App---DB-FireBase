import Model from "./Model";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { db } from '../config/firebase';
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  // Yup Only Support Formik
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  number: Yup.string().required("Phone Number is Required")
})

const AddAndUpdateContact = ({isOpen, onClose, isUpdate, contact}) => {

  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, 'contacts');
      await addDoc(contactRef, contact);
      onClose();
      toast.success('Contact Added Successfully');
    } catch (error) {
      throw new Error("Something Wrong, Pls Try Again!");
    }
  }

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, 'contacts', id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success('Contact Updated Successfully');
    } catch (error) {
      throw new Error("Something Wrong, Pls Try Again!");
    }
  }

  return (
    <div>
      <Model isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
            ? {
            name: contact.name,
            email: contact.email,
            number: contact.number
              }
            : {
            name: '',
            email: '',
            number: ''
          }
        }
          onSubmit={(values) => {
            isUpdate ? 
            updateContact(values, contact.id) : 
            addContact(values);
          }}
        >
            <Form className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-bold">Name :</label>
                <Field name="name" className='border border-black h-10 p-1 rounded-md' />
                <div className="text-red-500 font-bold">
                  <ErrorMessage name="name" />
                </div>
                </div>
                <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-bold">E-mail :</label>
                <Field type='email' name="email" className='border border-black h-10 p-1 rounded-md' />
                <div className="text-red-500 font-bold">
                  <ErrorMessage name="email" />
                </div>
                </div>
                <div className="flex flex-col gap-2">
                <label htmlFor="number" className="font-bold">Phone Number :</label>
                <Field type="number" name="number" className='border border-black h-10 p-1 rounded-md' />
                <div className="text-red-500 font-bold">
                  <ErrorMessage name="number" />
                </div>
                </div >
                <button className="bg-orange-500 text-black px-3 py-1.5 border border-black rounded-lg mt-6 font-bold">{isUpdate ? "Update" : "Add"} Contact</button>
            </Form>
        </Formik>
      </Model>
    </div>
  );
};

export default AddAndUpdateContact;
