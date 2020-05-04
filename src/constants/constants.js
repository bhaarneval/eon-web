export const constants = {
    HOME: "HOME",
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
export const NAME_VALIDATION = /^[a-zA-Z ]+$/;
export const CARD_VALIDATION = /^[0-9]{16,16}$/;
export const WHITESPACE_VALIDATION = /^$|.*\S+.*/;

export const statusList = [
    {id : 0, type : 'upcoming'},
    {id : 1, type : 'completed'},
    {id : 2, type : 'cancelled'},
    {id : 3, type : 'All'},
]


export const feeTypeList = [
    {id : 0, type : 'paid'},
    {id : 1, type : 'free'},
    {id : 2, type : 'All'},
]

export const questionList = [
    {id : 0, question : 'How was the event?'},
    {id : 1, question : 'Did you face any issue?'},
    {id : 2, question : 'Was it helpful?'},
    {id : 3, question : 'Any other feedback?'},
]
