/**
 * Represents a registered user.
 */
export class User {
    firstName: string;
    lastName: string;
    photoUrl: string;

    //Constructor that accepts a first name, last name and the
    //URL of a photo that identifies the user
    constructor({ firstName, lastName, photoUrl }) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.photoUrl = photoUrl;
    }
}
