import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  
  
  
  
  export class DateTimeService {

    getStringDateFromSQLStringDateTime(dateTime:string):string{
        //dateTimeFormat : YYYY-MM-DD hh:mm:ss (sql)
        return dateTime.substring(0,9);
    }

    getStringTimeFromSQLStringDateTime(dateTime:string):string{
        //dateTimeFormat : YYYY-MM-DD hh:mm:ss (sql)
        return dateTime.substring(11,18);
    }


    formatDateToTimeInput(date: Date):string{
        // return string "hh:mm:ss"
        let h = this.pad(date.getHours());
        let m = this.pad(date.getMinutes());
        let s = this.pad(date.getSeconds());
        console.log("time : " + h + ":" + m + ":" + s);
        return (h + ":" + m + ":" + s);
        
    }
    formatDateToDateInput(date: Date):string{
        // return string "YYYY-MM-DD"
        let d = this.pad(date.getDate());
        let m = this.pad(date.getMonth());
        let y = date.getFullYear().toString();
        return (y + "-" + m + "-" + d);
    }
    pad(n:number):string{
        return (n<10 ? '0' + n.toString() : n.toString());
    }

  }