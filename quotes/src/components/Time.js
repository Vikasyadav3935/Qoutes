

export const Time=(decimalTime)=>{

  
    const minutes = Math.floor(decimalTime / 60);
    const seconds = Math.floor(decimalTime % 60);
const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
return formattedTime;
}