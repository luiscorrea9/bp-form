import React, {useState, useEffect} from 'react';
import {db} from "../firebase"
import { collection, addDoc, deleteDoc, doc, onSnapshot} from 'firebase/firestore';

const Formulario = () => {

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [location, setLocation] = useState('');
    const [lista, setLista] = useState([]);
    const [editingMode, setEditingMode] = useState(false); 
    const[id, setId] = useState('');

    

     
    useEffect(()=>{
      const obtenerDatos = async () => {
          try{
             await onSnapshot(collection(db, "formulario"), (query) =>{
               setLista(query.docs.map((doc) => ({...doc.data(),id:doc.id})))
             })
          }catch(error){
              console.log(error);
          }   
      } 
       obtenerDatos();  
    },[])


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


  const edit = item =>{
      setName(item.infoName);
      setLastname(item.infoLastname); 
      setAge(item.infoAge);
      setEmail(item.infoEmail);
      setPhone(item.infoPhone);
      setCountry(item.infoCountry);
      setLocation(item.infoLocation);
      setId(item.id);
      setEditingMode(true);

  } 

  const cancel = () =>{
    setEditingMode(false);
    setName("");
    setLastname("");
    setAge("");
    setEmail("");
    setPhone("");
    setCountry("");
    setLocation("");
    setId("");
    
  }
   

    return (
    <div className="container mt-5">
    <h1 className='text-center'>FORM</h1>
    <hr />
    <div className="flex-row">
      <div className="flex-large">
        <h2>
          {
            editingMode ? "Edit user" : "Add user"
                          
          }
        </h2>

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
          onChange={(e) => setCountry(e.target.value)}
          />

          <input type="text"
          className='form-control mb-2'
          placeholder='Location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          />

          <input type="number"
          className='form-control mb-2'
          placeholder='Phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          />
          
          {
            editingMode ? 
            (
            <><button className=" btn btn-warning btn-lg" type="submit">Editar</button>
            <button className=" btn btn-dark btn-lg mx-2" onClick={() =>cancel()}>Cancelar</button></> )
            : <button className=" btn btn-primary btn-lg" type="submit">Add</button>
          }
          
        
        
        
         
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
                  <button className='btn btn-danger btn-lg float-end mx-2'
                  onClick={() => eliminar(item.id)}>Eliminar</button>
                  <button className='btn btn-warning btn-lg float-end mx-2'
                  onClick={() => edit(item)}>Editar</button>
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