const timeSlot = (date, startHours, startminutes, endHours,endMinutes, interval) => {
    // date.setHours(startTime);
    let startDate = new Date(date);
    startDate.setHours(startHours);
    startDate.setMinutes(startminutes);
    // date.setHours(endTime);
    let endDate = new Date(date);
    endDate.setHours(endHours);
    endDate.setMinutes(endMinutes);
    console.log(startDate);
    console.log(endDate);
    let start = startDate.getTime();
    let end = endDate.getTime();
    var timeSlots = [];

    while (start < end) {
        timeSlots.push([new Date(start), new Date(start += interval * 60000)]);
    }
    return timeSlots;
}

export default timeSlot;