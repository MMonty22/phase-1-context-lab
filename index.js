/* Your Code Here */
function createEmployeeRecord (recordArray) {
    const employeeRecords = {
        firstName: recordArray[0],
        familyName: recordArray[1],
        title: recordArray[2],
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecords
}

function createEmployeeRecords (recordArray) {
    return recordArray.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent (dateStamp) {
    //console.log('this', this)
    let dateTimeArray = dateStamp.split(' ')
    let timeInRecord = {
        type: 'TimeIn',
        hour: parseInt(dateTimeArray[1], 10),
        date: dateTimeArray[0]
    }
    this.timeInEvents.push(timeInRecord)
    return this
}

function createTimeOutEvent (dateStamp) {
    //console.log('this', this)
    let dateTimeArray = dateStamp.split(' ')
    let timeOutRecord = {
        type: 'TimeOut',
        hour: parseInt(dateTimeArray[1], 10),
        date: dateTimeArray[0]
    }
    this.timeOutEvents.push(timeOutRecord)
    return this
}

function hoursWorkedOnDate (dateStamp) {
    const timeIn = this.timeInEvents.find(element => element.date === dateStamp)
    ///console.log('this', this.timeInEvents)
    const timeOut = this.timeOutEvents.find(element => element.date === dateStamp)
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate (dateStamp) {
    //console.log('this',this)
    return this.payPerHour * hoursWorkedOnDate.call(this, dateStamp)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName (employees, firstNameStr) {
    //console.log('employees', employees)
    return employees.find(element => element.firstName === firstNameStr)
}

function calculatePayroll (employeeRecords) {
    return employeeRecords.map(employee => allWagesFor.call(employee)).reduce((currentValue, total) => currentValue + total)
}
