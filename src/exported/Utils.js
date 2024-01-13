export const AuthStr = 'Bearer '.concat(localStorage.getItem("TOKEN"));
export class Utils {
     #Token = "";

     get getToken() {
        return this.#Token;
    }

    set setToken(value) {
        this.#Token = value;
    }

}