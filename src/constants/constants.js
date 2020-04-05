import dummyImg from '../assets/concert.jpg';
export const constants = {
    HOME: "HOME",
    CLUSTER: "CLUSTER",
    MONITOR: "MONITOR",
    DATABASE: "DATABASE",
    DOWNLOAD: "DOWNLOAD",
    ADD: "ADD",
    LOCK: "LOCK",
    LOGOUT: "LOGOUT",
    BACKGROUND: '#344067',
    STATE: "STATE",
    ENVIRONMENT: "ENVIRONMENT",
    NODES: "NODES",
    PRIMARY: "PRIMARY",
    VIEW_DETAILS: "VIEW DETAILS",
}

export const DASHBOARD = "Dashboard";

export const LIGHT_MODE = "Light mode theme";
export const DARK_MODE = "Dark mode theme";

export const EMAIL = "Email";
export const PASSWORD = "Password";
export const MY_ACCOUNT = "My account";
export const LOGOUT = "Logout";

export const CLUSTER_NAME = "Cluster Name";
export const NO_OF_NODES = "Number of nodes";
export const MYSQL_VERSION = "MYSQL Version";
export const MIGRATION_COMPLEXITY = "Migration Complexity";
export const MYSQL_CONNECTIONS = "MYSQL Connections";
export const DEPLOYED_CLUSTERS = "Deployed Clusters";
export const RUNNING_CLUSTERS = "Running Clusters";
export const ACTIVE_SESSIONS = "Active Sessions";
export const INSTANCES = "Instances";

export const NEXT = "NEXT";
export const SUBMIT = "Submit";

export const lightborder = "#EBEEF3";
export const veryDarkBlue = '#262C6F';

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
        type:"Cukltural"
    }

]