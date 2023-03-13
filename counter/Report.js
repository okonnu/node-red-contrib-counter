
const CSVHelper = require('./csvhelper.js')
const ShiftHelper = require('./shifthelper.js')

class Report{
    datta = { totalCans : 0,
        
        tStamp : Date.now(),
        shiftName : new ShiftHelper().currentShiftName(),
        _team : "Team A",
        _targetCansPerSec : 4,
        _manning : 4,
        _machineCycle: 5,

        duration : 0,
        cansPerSec : 0,

        totalCans: 0,
        expextedTotalCans:0,
        throughput:0,
        efficiency:0,
        laborProductivity:0,
        machineUtilization:0,
        
    }

    csv = new CSVHelper(`/root/db/${this.datta.shiftName}.csv`,this.datta)

    
    constructor(){
        this.restore()
    }

    restore = async () =>{
        const prev = await this.csv.prev
        

        if (prev.cansPerSec > 0) {
            console.log("restoring previous")
        this.datta._team = prev._team
        this.datta._targetCansPerSec = parseInt(prev._targetCansPerSec)
        this.datta._manning = parseInt(prev._manning)
        this.datta._machineCycle = parseInt(prev._machineCycle)
        this.datta.duration = parseInt(prev.duration) + this.datta.duration
        this.datta.cansPerSec = parseInt(prev.cansPerSec) + this.datta.cansPerSec
        } else {
            console.log("previously ....")
            console.log(prev)
        }
    }

    genReport = () =>{
        this.datta.duration++
        this.setTotalCans()
        this.setExpectedTotalCans()
        this.setThroughput()
        this.setEfficiency()
        this.setLaborProductivity()
        this.setMachineUtilization()

        this.csv.appendToCSV(this.datta)
        return this.datta
    }
    config = (team, targetCansPerSec, manning, machineCycle) =>{
        this._setTeam(team)
        this._setTargetCansPerSec(targetCansPerSec)
        this._setManning(manning)
        this._setMachineCycle(machineCycle)
    }

    _setTeam = (team) =>{
        this.datta._team = team
    }
    _setTargetCansPerSec = (targetCansPerSec) =>{
        this.datta._targetCansPerSec = targetCansPerSec
    }
    _setManning = (manning) =>{
        this.datta._manning = manning
    }
    _setMachineCycle = (machineCycle) =>{
        this.datta._machineCycle = machineCycle
    }


    setTotalCans = () =>{
        this.datta.totalCans = this.datta.cansPerSec + this.datta.totalCans
    }

    setExpectedTotalCans = () =>{
        this.datta.expextedTotalCans = this.datta._targetCansPerSec * this.datta.duration
    }

    setThroughput = () =>{
        this.datta.throughput = (this.datta.totalCans / this.datta.duration)
    }
    setEfficiency = () =>{
        this.datta.efficiency = (this.datta.totalCans / this.datta.expextedTotalCans * 100)
    }
    setLaborProductivity = () =>{
        this.datta.laborProductivity = (this.datta.throughput / this.datta._manning)
    }
    setMachineUtilization = () =>{
        this.datta.machineUtilization = (this.datta.throughput / this.datta._machineCycle * 100)
    }

}

module.exports = Report;