import { useUserStore } from "@/store/storeProviders/UseUserStore"


export const useCurrentUser=()=>{
   const user = useUserStore.getState().user;

   return user
}