import { HashMap } from "./apps/hashMap.js";
import { HashSet } from "./apps/hashSet.js";

const testHash = new HashMap();
const testSet = new HashSet();


testHash.set('Charles', 'A');
testHash.set('Charless', 'B');
testHash.set('Charlesss', 'C');
testHash.set('Fred', 'D');
testHash.set('Fredd', 'E');
testHash.set('Ervin', 'F');
testHash.set('Joshua', 'G');
testHash.set('Rene', 'H');
testHash.set('Christian', 'I');
testHash.set('Angelie', 'J');
testHash.set('Shaira', 'K');
testHash.set('Abegail', 'L');   
testHash.set('Rose', 'M');
testHash.set('Shane', 'N');

console.log(testHash);
console.log(testHash.entries())

testSet.set('Adam');
testSet.set('Adam');
testSet.set('Brian');
testSet.set('Chuck');
testSet.set('Dennis');
testSet.set('Elon');
testSet.set('Francis');

console.log(testSet);
console.log(testSet.keys());


