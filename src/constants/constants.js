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
export const ACCOUNT_VALIDATION = /[0-9]{9,18}/

export const PASSWORD_VALIDATION = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/;

export const dummyList = [
    {
        name: "Food Festival",
        attendies: "2500+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Bengaluru",
        type:"Cultural",
        fees: 200,
        ifSubscribed: true
    },
    {
        name: "Technex",
        attendies: "2500+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Lucknow",
        type:"Tech",
        fees: 200,
    },
    {
        name: "AON Fest",
        attendies: "2500+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Delhi",
        type:"Fashion",
        fees: 200,
        ifSubscribed: true

    },
    {
        name: "Cultural Festival",
        attendies: "2500+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Patna",
        type:"Cultural",
        fees: 200,
    },
    {
        name: "Finance Festival",
        attendies: "2500+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Nagpur",
        type:"Tech",
        fees: 200,
        ifSubscribed: true
    },
    {
        name: "Robotics",
        attendies: "250+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Lucknow",
        type:"Tech",
        fees: 200,
    },
    {
        name: "Flee Festival",
        attendies: "400+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Jaipur",
        type:"Cultural",
        fees: 200,
    },
    {
        name: "Book Festival",
        attendies: "2000+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Jaipur",
        type:"Cultural",
        fees: 200,
    },
    {
        name: "Health and Fitness",
        attendies: "2500+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Jalandhar",
        type:"Fashion",
        fees: 200,
    },
    {
        name: "Coding",
        attendies: "2500+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Silchar",
        type:"Tech",
        fees: 200,
        ifSubscribed: true
    },
    {
        name: "Marathon",
        attendies: "200+",
        eventDate: "12-04-2020",
        eventImage: dummyImg,
        eventLocation:"Hyderabad",
        type:"Cultural",
        fees: 200,
        ifSubscribed: true
    }

];
export const updateEventDummy = {
         name: "Technnex",
         external_links: "www.technex.com",
         location: "Bengaluru",
         date: "24-03-2020",
         time:"12:05 AM",
         subscription_fee: 200,
         event_type: 2,
         description: "dummy data",
         no_of_tickets: 1200,
         images: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
}