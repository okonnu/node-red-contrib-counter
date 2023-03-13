
const { readFile, appendFile, writeFile, existsSync } = require('fs');

class CSVHelper {
    prev = { }

     constructor(fileName, datta) {
        this.fileName = fileName;

        //if file not exist create
        if (!existsSync(fileName)) {
             this.createAndAppend(datta)
            console.log(`File ${fileName} created!`);
        } else {
           this.prev = this.readRecord(-1) 
        }

    }

    convertObjectToCSV(obj) {
        const headers = Object.keys(obj);
        const values = Object.values(obj);
        const csvData = [headers.join(','), values.join(',')];
        return csvData;
      }

      convertCSVToObject(headers, values) {
        headers = headers.split(',');
        values = values.split(',');
        let obj = {}
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = values[j];
          }
          console.log(`convertCSVToObject: ${values}`)
        return obj;
      }
      
    
    async readRecord(index) {
        const headers = await this.getLineOfCSV(0)
        const values = await this.getLineOfCSV(index)
        return this.convertCSVToObject(headers,values)
    }

     getLineOfCSV(index) {
        return new Promise((resolve, reject) => {
          readFile(this.fileName, 'utf-8', (err, data) => {
            if (err) {
              reject(err);
              return;
            }
            const lines = data.split('\n');
            if (index < 0) {
                resolve(lines[lines.length - 1]);
            }
            resolve(lines[index]);
          });
        });
      }

    appendToCSV(data) {
      const str = `\n ${this.convertObjectToCSV(data)[1]}`
      console.log("appended to file!")
        return new Promise((resolve, reject) => {
            appendFile(this.fileName, str, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }

    createAndAppend(data) {
      const str = this.convertObjectToCSV(data)[0]
      console.log("created new file!")
        return new Promise((resolve, reject) => {
            writeFile(this.fileName, str, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }

 

    
}

module.exports = CSVHelper;