export const DEFAULT_USER_ACCOUNT = {
    "firstName": null,
    "lastName": null,
    "email": null,
    "password": null,
    "phoneNumber": null,
    "role": null,
    "address": {
        "streetFirstLine": null,
        "streetSecondLine": null,
        "city": null,
        "state": null,
        "country": null,
        "zipCode": null
    }
}

export const DEFAULT_USER_ACCOUNT_SLICE = {
    isLogged: false,
    userDetails: DEFAULT_USER_ACCOUNT
};