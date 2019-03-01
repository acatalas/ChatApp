import {AlertType} from './../enums/alert-type.enums';
/**
 * Represents an alert
 */
export class Alert{
    text: string;
    type: AlertType;

    //Default type value is Success
    constructor(text, type = AlertType.Success){
        this.text = text;
        this.type = type;
    }
}
