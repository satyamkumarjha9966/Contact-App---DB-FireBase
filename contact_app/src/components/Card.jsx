import { HiOutlineUserCircle } from 'react-icons/hi';
import { IoMdTrash } from 'react-icons/io';
import { RiEditCircleLine } from 'react-icons/ri';

function Card({contact}) {
  return (
    <div className='flex  flex-col gap-4'>
        {
          contact.map(({name, id, email, number}) => (
            <div key={id} className="bg-orange-500 flex justify-between items-center p-2 rounded-lg">
              <div className="flex items-center gap-4">
                <HiOutlineUserCircle className="text-4xl font-bold" />
                <div className="text-white">
                  <h1 className="text-xl font-medium">{name}</h1>
                  <p className="text-sm">{email}</p>
                  <p className="text-sm">{number}</p>
                </div>
              </div>
                <div className="flex gap-4">
                  <RiEditCircleLine className="text-4xl font-bold text-[#008000] cursor-pointer" />
                  <IoMdTrash className="text-4xl font-bold text-[#FF0000] cursor-pointer" />
                </div>
            </div>
          ))
        }
    </div>
  )
}

export default Card