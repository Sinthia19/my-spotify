
  
  export const msToMinutesSecond = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = (ms % 60000) / 1000;
  
    return `${minutes}:${seconds <= 9 ? '0' : ''}${seconds.toFixed(0)}`;
  };
  
  export const stringToDate = (str: string) => {
    const [year, month, day] = str.split('-').map(Number);
  
    const date = new Date(+year, month - 1, +day).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  
    return date;
  };