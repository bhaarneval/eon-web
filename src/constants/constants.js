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
export const ACCOUNT_VALIDATION = "[0-9]{9,18}"

export const PASSWORD_VALIDATION = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/;

export const dummyList = [
    {
        name: "Food Festival",
        attendies: "2500+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Bengaluru",
        type:"Cultural"
    },
    {
        name: "Technex",
        attendies: "2500+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Lucknow",
        type:"Tech"
    },
    {
        name: "AON Fest",
        attendies: "2500+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Delhi",
        type:"Fashion"

    },
    {
        name: "Cultural Festival",
        attendies: "2500+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Patna",
        type:"Cultural"
    },
    {
        name: "Finance Festival",
        attendies: "2500+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Nagpur",
        type:"Tech"
    },
    {
        name: "Robotics",
        attendies: "250+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Lucknow",
        type:"Tech"
    },
    {
        name: "Flee Festival",
        attendies: "400+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Jaipur",
        type:"Cultural"
    },
    {
        name: "Book Festival",
        attendies: "2000+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Jaipur",
        type:"Cultural"
    },
    {
        name: "Health and Fitness",
        attendies: "2500+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Jalandhar",
        type:"Fashion"
    },
    {
        name: "Coding",
        attendies: "2500+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Silchar",
        type:"Tech"
    },
    {
        name: "Marathon",
        attendies: "200+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Hyderabad",
        type:"Cultural"
    }

];
export const updateEventDummy = {
         eventName: "Technnex",
         url: "www.technex.com",
         eventLocation: "Bengaluru",
         eventDate: "24-03-2020",
         fees: 200,
         type: "cultural",
         isChargeable: true,
         description: "dummy data",
         capacity: 1200,
         eventImage: null
}