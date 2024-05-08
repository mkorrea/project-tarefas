import './admin.css'
import { useState } from 'react'
import { auth } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'

export default function Admin() {
   const [tarefaInput, setTarefaInput] = useState('')

   function handleRegister(e){
      e.preventDefault()
      alert("asodj")
   }

   async function handleLogout(){
      await signOut(auth)
      // .then(()=>{
      //    navigate('/')
      // })
      // .catch((error)=>{
      //    console.log("erro ao sair:" + error)
      // })
   }

   return(
      <div className='admin-container'>
         <h1>Minhas Tarefas</h1>

         <form className='form' onSubmit={handleRegister}>
            <textarea
               placeholder='Digite sua tarefa...'
               value={tarefaInput}
               onChange={(e)=>setTarefaInput(e.target.value)}
            />

            <button type='submit' className='btn-registrar'>Registrar tarefa</button>
         </form>

         <section className='list'>
            <p>Estudar react</p>

            <div>
               <button>Editar</button>
               <button className='btn-concluir'>Concluir</button>
            </div>
         </section>

         <button className='btn-logout' onClick={handleLogout}>Sair</button>

      </div>
   )
}