import { useState, useEffect } from "react"
import { auth } from '../firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

export default function Private({ children }) {
   const [loading, setLoading] = useState(true)
   const [signed, setSigned] = useState(false)

   useEffect(()=>{
      async function checkLogin(){
         const unsub = onAuthStateChanged(auth, (user)=>{
            // ficar verificando se tem usuario logado 
            if(user){
               // estiver logado
               const userData = {
                  uid: user.uid,
                  email: user.email
               }
               localStorage.setItem( '@userDetail', JSON.stringify(userData))

               setLoading(false)
               setSigned(true)
            } else {
               //não estiver logado
               setLoading(false)
               setSigned(false)
            }
         })
      }
      checkLogin()
   }, [])

   if(loading){
      return(
         <div></div>
      )
   }

   if(!signed) {
      return <Navigate to='/'/>
   }
   
   return children
}