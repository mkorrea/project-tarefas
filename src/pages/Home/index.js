import './home.css'

import { useState } from 'react';
import { Link } from 'react-router-dom'

export default function Home() {
   const [ email, setEmail ] = useState('')
   const [ password, setPassword ] = useState('')

   function handleLogin(event) {
      event.preventDefault() // prevenir que a página seja atualizada 
      if(email !== '' && password !== '') {
         alert('bem vindo')
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
               placeholder='Digite sua senha'
               autoComplete={false}/>
               
            <button type='submit'> Acessar </button>
         </form>
         
         <span className='sem-conta-text'>Não possui uma conta ? <Link to='/register'>Cadastre-se!</Link></span>

      </div>
   );
 }
 