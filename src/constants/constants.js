export const constants = {
    HOME: "HOME",
    TICKET: "CLUSTER",
    EVENT: "EVENT",
}

//Validation regexp
export const URLVALIDATION = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
export const NUMBERSVALIDATION = /^\d+$/;
export const MATCH_ANYTHING = /.*?/;
export const EMAIL_VALIDATION = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const PHONE_VALIDATION = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
export const ACCOUNT_VALIDATION = /[0-9]{9,18}/
export const PASSWORD_VALIDATION =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

export const statusList = [
    {id : 0, type : 'upcoming'},
    {id : 1, type : 'completed'},
    {id : 2, type : 'cancelled'},
]


export const feeTypeList = [
    {id : 0, type : 'paid'},
    {id : 1, type : 'free'},
]