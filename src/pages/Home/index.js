import './home.css'

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Home() {
   const [ email, setEmail ] = useState('')
   const [ password, setPassword ] = useState('')
   const navigate = useNavigate()

   async function handleLogin(event) {
      event.preventDefault() // prevenir que a página seja atualizada 
      if(email !== '' && password !== '') {
         await signInWithEmailAndPassword(auth, email, password)
         .then(()=> {
            navigate('/admin', {replace: true})
         })
         .catch(()=>{
            console.error("Erro ao realizar login!")
         })
      } else {
         alert('Preencha todos os campos!')
      }
   }
   
   return (
      <div className="home-container">
         <h1> Lista de Tarefas </h1>
         <span> Gerencie sua agenda de maneira organizada e fácil! </span>
         
         <form onSubmit={handleLogin}>
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
               
            <button type='submit'> Acessar </button>
         </form>
         
         <span className='sem-conta-text'>Não possui uma conta ? <Link to='/register'>Cadastre-se!</Link></span>

      </div>
   );
 }
 