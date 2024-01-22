import { useContext } from "react";
import { SocketContext } from "../context/socketContext"; 

interface UseSocketDataStructure{
   sendMessage: (message:string)=>any 

}


export const useSocket =():UseSocketDataStructure=>{
     const state= useContext(SocketContext)
     
     if(!state) throw new Error("No is undefined!")
      
     return state
}

