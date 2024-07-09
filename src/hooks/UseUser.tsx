import { currentUserHelper } from "@/helpers/api/auth/authApiHelper"
import { useUserStore } from "@/store/storeProviders/UseUserStore"

export const useUser =async ()=>{
    const userExist = useUserStore.getState().user
    try {
        const res =   await currentUserHelper({
            email:userExist?.email
          })

          return res?.payload
    } catch (error) {
        
    }
}