
class Node {
    constructor (key, value) {
        this.key = key;
        this.value = value;
        this.nextNode = null;
    }
}

class LinkedList {
    constructor () {
        this['HEAD'] = null;
        this['TAIL'] = null;
    }

    append (key, value) {

        if (this.size() === 0)  {
            this['HEAD'] = new Node(key, value);

        } else if (this.size() > 0) {
            // Create new Node;
            const newNode = new Node(key, value);

            if (this.size() === 1) {
                this['HEAD'].nextNode = newNode;
                this['TAIL'] = newNode;

            } else {
                // Reassign values for current tail
                const currentTail = this['TAIL'];
                currentTail.nextNode = newNode;

                // Reassign tail of linked list to new Node
                this['TAIL'] = newNode;
            }
        } 

    }   

    prepend( key, value ) {
        const currentHead = this['HEAD'];
        
        this['HEAD'] = new Node(key, value);
        this['HEAD'].nextNode = currentHead;
    }

    update ( key, value ) {

        const updateValue = function (head, reqKey) {
            if (!head) return;

            if (head.key === reqKey) {
                head.value = value;
                return
            };

            return updateValue(head.nextNode, reqKey);
        }

        return updateValue(this['HEAD'], key);
    }

    getValue ( key ) {

        const updateValue = function (head, reqKey) {
            if (!head) return;

            if (head.key === reqKey) {
                return head.value;
            };

            return updateValue(head.nextNode, reqKey);
        }

        return updateValue(this['HEAD'], key);
    }

    getKeys () {
        const getKeys = function (head, keyArray ) {
            if (head === undefined) return [];

            if (head === null) {
                return [...keyArray]
            }

            return getKeys(head.nextNode, [...keyArray, head.key])
        }

        return getKeys(this['HEAD'], [])
    }

    getValues () {
        const getValues = function (head, valuesArray ) {
            if (head === undefined) return [];

            if (head === null) {
                return [...valuesArray]
            }

            return getValues(head.nextNode, [...valuesArray, head.value])
        }

        return getValues(this['HEAD'], [])
    }

    getEntries () {
        const getValues = function (head, valuesArray ) {
            if (head === undefined) return [];

            if (head === null) {
                return [...valuesArray]
            }

            return getValues(head.nextNode, [...valuesArray, [head.key, head.value]])
        }

        return getValues(this['HEAD'], [])
    }

    size() {
        const countSize = function (head, count ) {
            if (head === undefined) return 0

            if (head === null) return count
            
            return countSize(head.nextNode, count + 1);
        }

        return countSize(this['HEAD'], 0);
    }

    head () {
        return this['HEAD'];
    }

    tail () {
        return this['TAIL'];
    }

    at ( index ) {
        const getNodeAt = function (head, reqIndex) {
            if (!head) return null

            if (reqIndex === 0) return head

            return getNodeAt(head.nextNode, reqIndex - 1);
        }

        return getNodeAt(this['HEAD'], index);
    }

    pop () {
        if (this.size() === 0) {
            throw `Linked List has no nodes`

        } else if (this.size() === 1) {
            this['HEAD'] = null

        } else if (this.size() === 2) {
            this['HEAD'].nextNode = null;
            this['TAIL'] = null;

        } else {
            const secondLast = this.at(this.size() - 2);
            secondLast.nextNode = null;

            this['TAIL'] = secondLast;
        }
    }
       
    contains ( key ) {

        const checkValue = function (head, reqKey) {
            if (!head) return false;

            if (head.key === reqKey) return true;

            return checkValue(head.nextNode, reqKey);
        }

        return checkValue(this['HEAD'], key);
    }

    find ( key )  {

        const getIndex = function (head, reqKey, index) {
            if (!head) return null;

            if (head.key === reqKey) return index;

            return getIndex(head.nextNode, reqKey, index + 1);
        }

        return getIndex(this['HEAD'], key, 0);
    }

    toString () {

        const string = function (head) {
            let resultString;
            let current = head

            if (!head) return 'null';

            while (current !== null) {
                if (resultString === undefined) {
                    resultString = `(${current.value})`;

                } else {
                    resultString = `${resultString} -> (${current.value})`;
                }

                current = current.nextNode;
            }

            resultString = `${resultString} -> null`;

            return resultString
        }

        return string(this['HEAD']);
    }

    insertAt ( value, index ) {
        const size = this.size();
        if (index > size) {
           
            let indexText;
            if (size === 0) {
                indexText = ','

            } else if (size === 1) {
                indexText = ` (index 0),`
                
            } else {
                indexText = ` (0 - ${size - 1} indices),`
            }

            throw `Linked List current size is ${size}${indexText} can't insert new node at index ${index}.`;
        }

        //  if index is 0, execute prepend method
        if (index === 0) {
            this.prepend(value);
        
        //  if required index is equal to last index + 1 or size
        } else if (size === index) {
            this.append(value);

        } else {
            const getNodeAt = function (head, reqIndex) {
                if (!head) return null
                if (reqIndex === 0) return head

                return getNodeAt(head.nextNode, reqIndex - 1);
            }

            // Executes getNodeAt to get node at required index
            const nodeAtIndex = getNodeAt(this['HEAD'], index);
            
            // Executes getNodeAt to get node at currently before required index  
            const nodeAtPreIndex = getNodeAt(this['HEAD'], index - 1);

            // Create New Node, then reassign values to Nodes
            const newNode = new Node(value);

            // Change Node at pre index nextNode value to new Node
            nodeAtPreIndex.nextNode = newNode;

            // Assign new Node's next Node to nodeAtIndex
            newNode.nextNode = nodeAtIndex
        }
    }

    removeAt ( index ) {
        const size = this.size();
        if (size <= index) {

            let indexText;
            if (size === 0) {
                indexText = ','

            } else if (size === 1) {
                indexText = ` (index 0),`
                
            } else {
                indexText = ` (0 - ${size - 1} indices),`
            }

            throw `Linked List current size is ${size}${indexText} can't remove null node at index ${index}.`;
        }

        // Reusable function
        const getNodeAt = function (head, reqIndex) {
                if (!head) return null
                if (reqIndex === 0) return head

                return getNodeAt(head.nextNode, reqIndex - 1);
            }

        // if index is 0, reassign head to nextNode
        if (index === 0) {
            const currentHead = this['HEAD'];
            const newHead = currentHead.nextNode;

            this['HEAD'] = newHead;

        } else if (size - 1 === index) {

            // Execute getNodeAt() to get node before the TAIL
            const nodeAtPreTail =  getNodeAt(this['HEAD'], index - 1);
            
            // Reassign nodeAtPreTail as new tail and its nextNode to null
            this['TAIL'] = nodeAtPreTail;
            this['TAIL'].nextNode = null;

        } else {
            // Get node before required node at index
            const nodeAtPreIndex = getNodeAt(this['HEAD'], index - 1);

            // Get node after required node at index
            const nodeAtPostIndex = getNodeAt(this['HEAD'], index + 1);

            // Reassign nodeAtPreIndex's nextNode to nodeAtPostIndex
            nodeAtPreIndex.nextNode = nodeAtPostIndex;
        }

        // Check current size then remove
        if (this.size() === 1) {
            this['TAIL'] = null
        }
    }
}

export {Node, LinkedList}










