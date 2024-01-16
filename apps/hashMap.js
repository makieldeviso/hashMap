import { LinkedList } from "./linkedList.js";

class HashMap {
    constructor () {
        this.defaultSize = 16;
        this.buckets = [...new Array(this.defaultSize)]; // Note: this spread operator gives undefined indices content instead of empty
        this.contents = 0;
        this.size = 0;
        this.capacity = this.buckets.length;
        this.loadFactor = 0.75;
    }

    _resize () {
        const loadThresh = Math.floor(this.capacity * 0.75);

        // If current size reach threshold, increase capacity
        if (this.size >= loadThresh) {
            this.buckets = [...this.buckets, ...new Array(this.defaultSize)]
            this.capacity = this.buckets.length;
        } 
    }

    hash (value) {
        let hashCode = 0;
        const primeNum = 31;

        for (let i = 0; i < value.length; i++) {
            hashCode = hashCode * primeNum + value.charCodeAt(i);
        }

        return hashCode % this.buckets.length ;
       
    }

    set (key, value) {
        const index = this.hash(key);
        
        // If key exists, update old value
        if (this.buckets[index] && this.buckets[index].contains(key)) {
            const bucketList = this.buckets[index];
            bucketList.update(key, value);

        } else {
            // Check if index is empty then add new key value pair
            if (this.buckets[index] === undefined) {
                const bucketLinkedList = new LinkedList();
                bucketLinkedList.append(key, value);

                this.buckets[index] = bucketLinkedList;
                this.size++ // since a bucket is filled, log increase of size

            } else {
            // If same index/ hashCode is generated append new node to linkedList
                const bucketList = this.buckets[index];
                bucketList.append(key, value);
            }

            this.contents++; // Log increase of contents
            this._resize(); // Check capacity, execute resize if needed
        }
    }

    get ( key ) {
        const index = this.hash(key);
        const bucketList = this.buckets[index];

        if (!bucketList) {
            return null

        } else {
            return bucketList.getValue(key);
        }
    }

    has ( key ) {
        const index = this.hash(key);
        const bucketList = this.buckets[index];
        
        if (bucketList) {
            return bucketList.contains(key);
        }

        return false
    }

    remove ( key ) {
        const index = this.hash(key);
        const bucketList = this.buckets[index];

        if (bucketList) {
            const keyIndex = bucketList.find(key);
            bucketList.removeAt(keyIndex);

            // Check if linked list at this bucket is empty
            // Then remove linked list from table 
            if (bucketList['HEAD'] === null && bucketList['TAIL'] === null ) {
                this.buckets[index] = undefined;
                this.size--; // if latest remove empties a bucket, update size
            }

            this.contents--; // Log decrease of contents
            return true
        }

        return false
    }

    length () {
        return this.contents;
    }
    
    clear () {
        this.buckets = [...new Array(this.defaultSize)]; // Note: this spread operator gives undefined indices content instead of empty
        this.contents = 0;
        this.size = 0;
        this.capacity = this.buckets.length;
    }

    keys () {
        const buckets = this.buckets;
        let keysArr = [];
        for (let i = 0; i < buckets.length; i++) {
            if (buckets[i]) {
                const bucketListKeys = buckets[i].getKeys();
                keysArr.push(...bucketListKeys);
            }
        }
        
        return keysArr;
    }

    values () {
        const buckets = this.buckets;
        let valuesArr = [];
        for (let i = 0; i < buckets.length; i++) {
            if (buckets[i]) {
                const bucketListValues = buckets[i].getValues();
                valuesArr.push(...bucketListValues);
            }
        }
        
        return valuesArr;
    }

    entries () {
        const buckets = this.buckets;
        let entriesArr = [];
        for (let i = 0; i < buckets.length; i++) {
            if (buckets[i]) {
                const bucketListEntries = buckets[i].getEntries();
                entriesArr.push(...bucketListEntries);
            }
        }
        
        return entriesArr;
    }

}

export { HashMap }