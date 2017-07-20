module.exports = class bakeryBundleCalc {                                                         
    constructor(items) {
        this.items = items
        this.cache = {}
    }
    /*  
        Calculate overall amount into certain bundle numbers
        @param {number} amount - overall amount that need to be analysed 
        return array
     */
    doDPCalc(amount) {            
        if (!amount || amount <= 0) return []
        if (this.cache[amount]) return this.cache[amount];
        let target = [], newTarget, newAmount;
        this.items.forEach(item => {
            newAmount = amount - item
            if (newAmount >= 0) {
                newTarget = this.doDPCalc(newAmount)
            }
            if (newAmount >= 0 && 
                 (newTarget.length < target.length - 1 || !target.length) && 
                 (newTarget.length || !newAmount)) {
                target = [item].concat(newTarget)
            } 
        })
        return (this.cache[amount] = target)
    }
    /*
        Counting duplcate elements from an array 
        @param {array} arr 
        return object
     */
    doReconsile(arr){
        const obj = {}
        if (!arr || arr.length <= 0) return []
        arr.forEach( item => {
            if (typeof obj[item] == 'number') {
                obj[item]++;
            } else {
                obj[item] = 1;
            }
        }); 
        return obj;    
    }
    /*
        Fixing javascript adding number's float bug
        @pramr {number} arg1 
        @param {number} arg2
        return number
     */
    accAdd(arg1,arg2){
        let r1,r2,m;
        try {
            r1 = arg1.toString().split(".")[1].length
        }catch(e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        }catch(e) {
            r2 = 0
        }
        m = Math.pow(10,Math.max(r1,r2))
        return (arg1 * m + arg2 * m) / m
    }

    /*
        Fixing javascript multiple number's float bug
        @pramr {number} arg1 
        @param {number} arg2
        return number
     */
    accMul(arg1,arg2){
        let m = 0,s1,s2;
        try {
            s1 = arg1.toString()
            m += s1.split(".")[1].length
        }catch(e){}
        try {
            s2 = arg2.toString()
            m += s2.split(".")[1].length
        }catch(e){}
        return Number(s1.replace(".","")) * Number(s2.replace(".","")) / Math.pow(10,m)
    }    
}