import React, {useState} from 'react';
import {db} from "../firebase"
import { collection, addDoc, deleteDoc, doc} from 'firebase/firestore';

const Formulario = () => {

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [location, setLocation] = useState('');
    const [lista, setLista] = useState([]);


   const saveList = async (e) => {
        e.preventDefault()
        try{
          const data = await addDoc(collection(db, "formulario"),{
              infoName: name,
              infoLastname: lastname,
              infoAge: age,
              infoEmail: email,
              infoPhone: phone,
              infoCountry: country,  
              infoLocation: location
          })

          setLista([
            ...lista,
            {infoName: name, infoLastname: lastname, infoAge: age, infoEmail: email, infoPhone: phone, infoCountry: country, infoLocation: location, id:data.id}
          ])
          setName("");
          setLastname("");
          setAge("");
          setEmail("");
          setPhone("");
          setCountry("");
          setLocation("");
          

        } catch(error){
          console.log(error);
        } 
   }

   const eliminar = async id =>{
    try{
         await deleteDoc(doc(db, "formulario", id))

    } catch(error){
      console.log(error);
    } 
   }
   

    return (
    <div className="container mt-5">
    <h1 className='text-center'>FORM</h1>
    <hr />
    <div className="flex-row">
      <div className="flex-large">
        <h2>Add user</h2>
        <form onSubmit={saveList}>

          <input type="text"
          className='form-control mb-2'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          />

          <input type="text"
          className='form-control mb-2'
          placeholder='Lastname'
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          />

          <input type="number"
          className='form-control mb-2'
          placeholder='Age'
          value={age}
          onChange={(e) => setAge(e.target.value)}
          />

          <input type="email"
          className='form-control mb-2'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          
          <input type="text"
          className='form-control mb-2'
          placeholder='Country'
          value={country}
          onChange={(e) => setPhone(e.target.value)}
          />

          <input type="text"
          className='form-control mb-2'
          placeholder='Location'
          value={location}
          onChange={(e) => setName(e.target.value)}
          />

          <input type="number"
          className='form-control mb-2'
          placeholder='Phone'
          value={phone}
          onChange={(e) => setName(e.target.value)}
          />
          
          
          
        
               
         <button className=" btn btn-primary btn-block" type="submit">Add</button>
         
        </form>

      </div>
      <div className="flex-large">
        <br />
        <h2>View users</h2>
        <ul className='list-group'>
          {
              lista.map(item => (
                <li key={item.id} className="list-group-item">
                  <span className='lead'>{item.infoName}-{item.infoLastname}-{item.infoAge}-{item.infoEmail}-{item.infoCountry}-{item.infoLocation}-{item.infoPhone}</span>
                  <button className='btn btn-danger btn-sm float-end mx-2'
                  onClick={() => eliminar(item.id)}>Eliminar</button>
                  <button className='btn btn-warning btn-sm float-end mx-2'>Editar</button>
                </li>
              ))

          }
        </ul>
      </div>
    </div>
  </div>
  );
}
 
export default Formulario;