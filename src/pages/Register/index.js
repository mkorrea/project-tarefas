import '../Home/home.css'

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {
   const [ email, setEmail ] = useState('')
   const [ password, setPassword ] = useState('')
   const navigate = useNavigate()

   async function handleRegister(event) {
      event.preventDefault() // prevenir que a página seja atualizada 
      if(email !== '' && password !== '') {
         await createUserWithEmailAndPassword(auth, email, password)
         .then(()=>{
            navigate('/admin', {replace: true})
         })
         .catch(()=>{
            console.error('Erro ao cadastrar!')
         })
         
      } else {
         alert('Preencha todos os campos!')
      }
   }
   
   return (
      <div className="home-container">
         <h1> Cadastre-se </h1>
         <span> Vamos criar sua conta! </span>
         
         <form onSubmit={handleRegister}>
            <input 
               type='text' 
               value={email}
               onChange={ (e) => setEmail(e.target.value) }
               placeholder='Digite seu email' />

            <input 
               type='text' 
               value={password}
               onChange={ (e) => setPassword(e.target.value) }
               placeholder='Digite sua senha'/>
               
            <button type='submit'> Cadastrar </button>
         </form>
         
         <span className='sem-conta-text'>Já possui uma conta ? <Link to='/'>Faça seu login!</Link></span>

      </div>
   );
 }
 