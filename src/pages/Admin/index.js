import './admin.css'
import { useState, useEffect } from 'react'
import { auth, db } from '../../firebaseConnection'
import { 
   addDoc,
   collection,
   onSnapshot,
   query,
   where,
   orderBy,
   doc,
   deleteDoc,
   updateDoc
 } from 'firebase/firestore'
import { signOut } from 'firebase/auth'

export default function Admin() {
   const [tarefaInput, setTarefaInput] = useState('')
   const [user, setUser] = useState({})
   const [edit, setEdit] = useState({})

   const [tarefas, setTarefas] = useState([])

   useEffect(()=>{
      async function loadTarefas() {
         const userDetail = localStorage.getItem("@userDetail")
         setUser(JSON.parse(userDetail))
      
         if(userDetail) {
            const data = JSON.parse(userDetail)

            const tarefasRef = collection(db, 'tarefas')
            const q = query(tarefasRef, orderBy('created', 'desc'), where('userUid', '==', data?.uid))

            const unsub = onSnapshot(q, (snapshot)=>{
               let lista = []

               snapshot.forEach((doc)=>{
                  lista.push({
                     id: doc.id,
                     tarefa: doc.data().tarefa,
                     userUid: doc.data().userUid
                  })
               })
               setTarefas(lista)
            })
         }

   }
      loadTarefas()
   }, [])

   async function handleRegister(e){
      e.preventDefault()
      if(tarefaInput === '') {
         alert('Digite sua tarefa...')
         return;
      }

      if(edit?.id) {
         handleUpdateTarefa()
         return
      }

      await addDoc(collection(db, 'tarefas'), {
         tarefa: tarefaInput,
         created: new Date(),
         userUid: user?.uid
      })
               // "?" para que caso a informação venha vazio, a aplicação não dê crash
         .then(()=>{
            console.log('Tarefa registrada')
            setTarefaInput('')
         })
         .catch((error)=>{
            console.log('erro ao registrar tarefa' + error)
         })
      
      
   }

   async function handleLogout(){
      await signOut(auth)
   }


   async function deletarTarefa(id) {
      const docRef = doc(db, 'tarefas', id)
      await deleteDoc(docRef)
   }

   function editTarefa(item) {
      setTarefaInput(item.tarefa)
      setEdit(item)
   }

   async function handleUpdateTarefa() {
      const docRef = doc(db, 'tarefas', edit?.id)
      await updateDoc(docRef, {
         tarefa: tarefaInput
      })
      .then(()=>{
         setTarefaInput('')
         setEdit({})
      })
      .catch(()=>{
         console.log('erro ao editar')
         setTarefaInput('')
         setEdit({})
      })
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

            <button type='submit' className='btn-registrar'> { Object.keys(edit).length > 0 ? 'Editar tarefa' : 'Registrar Tarefa' } </button>
         </form>

         {tarefas.map((item)=> (
            <section key={item.id} className='list'>
            <p>{item.tarefa}</p>

            <div>
               <button onClick={()=> editTarefa(item)}>Editar</button>
               <button onClick={()=> deletarTarefa(item.id)} className='btn-concluir'>Concluir</button>
            </div>
         </section>
         ))}

         <button className='btn-logout' onClick={handleLogout}>Sair</button>

      </div>
   )
}