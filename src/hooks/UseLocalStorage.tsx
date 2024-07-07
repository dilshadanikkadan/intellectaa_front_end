export const UseLocalStorage = (key: string, value: any) => {
  if (typeof window !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};


export const UseLocalStroageValue = (key: string) => {
    if (typeof window !== undefined) {
     const res=  localStorage.getItem(key);
     return JSON.parse(res!)
    }
  };
  
  
  