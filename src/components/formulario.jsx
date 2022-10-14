import React from 'react';

const Formulario = () => {
    return (
    <div className="container mt-5">
    <h1 className='text-center'>FORM</h1>
    <hr />
    <div className="flex-row">
      <div className="flex-large">
        <h2>Add user</h2>
        <form>
          <input type="text"
          className='form-control mb-2'
          placeholder='Name'/>

          <input type="text"
          className='form-control mb-2'
          placeholder='Lastname'/>

          <input type="number"
          className='form-control mb-2'
          placeholder='Age'/>

          <input type="email"
          className='form-control mb-2'
          placeholder='Email'/>
          
          <input type="number"
          className='form-control mb-2'
          placeholder='Phone'/>
          
        
               
         <button className=" btn btn-primary btn-block" type="submit">Add</button>
      
        </form>

      </div>
      <div className="flex-large">
        <h2>View users</h2>
        <ul className='list-group'>
          {


          }
        </ul>
      </div>
    </div>
  </div>
  );
}
 
export default Formulario;