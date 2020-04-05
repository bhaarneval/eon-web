import dummyImg from '../assets/concert.jpg';
export const constants = {
    HOME: "HOME",
    TICKET: "CLUSTER",
    EVENT: "EVENT",
}

//Validation regexp
export const URLVALIDATION = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
export const NUMBERSVALIDATION = /^\d+$/;
export const MATCH_ANYTHING = /.*?/;
export const EMAIL_VALIDATION = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const PHONE_VALIDATION = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
export const PASSWORD_VALIDATION = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/;

export const dummyList = [
    {
        name: "Food Festival",
        attendies: "2500+",
        date: "12-04-2020",
        eventImage: dummyImg
    },
    {
        name: "Technex",
        attendies: "2500+",
        date: "12-04-2020",
        eventImage: dummyImg
    },
    {
        name: "AON Fest",
        attendies: "2500+",
        date: "12-04-2020",
        eventImage: dummyImg
    },
    {
        name: "Cultural Festival",
        attendies: "2500+",
        date: "12-04-2020",
        eventImage: dummyImg
    },
    {
        name: "Finance Festival",
        attendies: "2500+",
        date: "12-04-2020",
        eventImage: dummyImg
    },
    {
        name: "Robotics",
        attendies: "250+",
        date: "12-04-2020",
        eventImage: dummyImg
    },
    {
        name: "Flee Festival",
        attendies: "400+",
        date: "12-04-2020",
        eventImage: dummyImg
    },
    {
        name: "Book Festival",
        attendies: "2000+",
        date: "12-04-2020",
        eventImage: dummyImg
    },
    {
        name: "Health and Fitness",
        attendies: "2500+",
        date: "12-04-2020",
        eventImage: dummyImg
    },
    {
        name: "Coding",
        attendies: "2500+",
        date: "12-04-2020",
        eventImage: dummyImg
    },
    {
        name: "Marathon",
        attendies: "200+",
        date: "12-04-2020",
        eventImage: dummyImg
    }

]