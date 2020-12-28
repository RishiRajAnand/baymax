const timeSlot = (date, startTime, endTime, interval) => {
    date.setHours(startTime);
    let startDate = date;
    date.setHours(endTime);
    let endDate = date;
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