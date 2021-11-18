export interface User {
     name: string;
     email: string;
     password: string;
     hobbies: string;
  }

  interface Person {
    name: string;
    id: number;
    doStuff: () => void;
}

// implements Person says: You have to at least implement these things
// which are located on the person interface 
class employee implements Person {
    constructor(public name: string, public id: number){}

    doStuff () {console.log('Doing stuff')}
}

// interfaces can also describe variables and parameters
const p1: Person = {
    name: 'foo',
    id: 34,
    doStuff () {console.log('Doing stuff')}
}

  