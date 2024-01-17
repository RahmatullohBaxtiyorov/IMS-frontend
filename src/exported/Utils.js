import axios from "axios";


export class Utils {
    #Token = "";

    get getToken() {
        return this.#Token;
    }

    set setToken(value) {
        this.#Token = value;
    }

}