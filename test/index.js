const bakeryBundleCalc = require("../lib/calc"),
      chai  = require("chai"),
      expect = chai.expect;


describe('bundleObj', () => {

    describe('Constructor', () => {

        it('should be created with two properties: items, cache', () => {
            let bundleObj = new bakeryBundleCalc();
            expect(bundleObj).to.have.property('items');
            expect(bundleObj).to.have.property('cache');            
        });

        it('cache should have empty object in default', () => {
            let bundleObj = new bakeryBundleCalc();            
            expect(Object.keys(bundleObj.cache).length ).to.equal(0);
            expect(typeof bundleObj.cache ).to.not.equal('undefined');
        });
    });

    describe('accAdd', () => {

        it('should return 3', () => {
            let bundleObj = new bakeryBundleCalc();
            expect(bundleObj.accAdd(1,2)).to.equal(3)
        });

        it('should return NaN with only one argument provided', () => {
            let bundleObj = new bakeryBundleCalc();            
            expect(isNaN(bundleObj.accAdd(1))).to.equal(true)
        });
    });

    describe('accMul', () => {
    	
        it('should return 15', () => {
            let bundleObj = new bakeryBundleCalc();
            expect(bundleObj.accMul(3,5)).to.equal(15)
        });
    });

    describe('doDPCalc', () => {

        it('should return empty array when input number is not compatible', () => {
            let bundleObj = new bakeryBundleCalc([2,5]),
            	priceBundle = bundleObj.doDPCalc(0)    
            expect(priceBundle.length).to.equal(0)	
        });

        it('should return return 4 elements', () => {
            let bundleObj = new bakeryBundleCalc([2,5]),
            	priceBundle = bundleObj.doDPCalc(14)            
            expect(priceBundle.length).to.equal(4)
        });
    });

    describe('doReconsile', () => {

        it('should return empty array when input number is not compatible', () => {
            let bundleObj = new bakeryBundleCalc(),
            	priceBundle = bundleObj.doDPCalc(0)    
            	priceArray = bundleObj.doReconsile(priceBundle);            
            expect(Object.keys(priceArray).length).to.equal(0)	
        });

        it('should return return 2 elements after analysing the array', () => {
            let bundleObj = new bakeryBundleCalc([2,2,5]),
            	priceBundle = bundleObj.doDPCalc(14) ,
            	priceArray = bundleObj.doReconsile(priceBundle);            
            expect(Object.keys(priceArray).length).to.equal(2)
        });
    });
});