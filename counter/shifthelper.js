class ShiftHelper {
    constructor(date) {
      this.date = new Date(date);
    }
  
    getShiftName() {
      const hours = this.date.getHours();
      const year = this.date.getFullYear();
      const month = this.date.getMonth() + 1;
      const day = this.date.getDate();
      let shift = '';
  
      if (hours >= 6 && hours < 14) {
        shift = 'Shift1';
      } else if (hours >= 14 && hours < 22) {
        shift = 'Shift2';
      } else {
        shift = 'Shift3';
      }
  
      return `${year}-${month}-${day}-${shift}`;
    }

    currentShiftName(){
        this.date = new Date();
        return this.getShiftName();
    }
  }

  module.exports = ShiftHelper;
  
