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