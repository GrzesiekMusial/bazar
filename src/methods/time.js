const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const getDate = (d) => {
    d = new Date(d);
    const day = d.getDay();
    const month = d.getDate();
    const year = d.getFullYear();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const formatted = `${hours}:${minutes} ${day}/${month}/${year}`;
    return formatted;
};

const getNamedDate = (d) => {
    const dayName = days[d.getDay()];
    const monthName = months[d.getMonth()];
    return { day: dayName, month: monthName };
};

export { getDate, getNamedDate };
