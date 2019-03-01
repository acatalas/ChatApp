import { User } from './user';
/**
 * Class that represents a message in a chat
 */
export class Message {
    message: string;
    createdAt: Date;
    sender: User;   //User that sent the message

    constructor({message, createdAt, sender}){
        this.message = message;
        this.createdAt = createdAt;
        this.sender = new User(sender);
    }
}
