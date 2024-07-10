export const UseLocalStroageRemove = (key: string) => {
    if (typeof window !== undefined) {
     const res=  localStorage.removeItem(key);
     return JSON.parse(res!)
    }
  };
  
  
  