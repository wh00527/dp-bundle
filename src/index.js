const vsPrice = {3:'6.99',5:'8.99'},
      mbPrice = {2:'9.95', 5:'16.95',8:'24.95'},
      cfPrice = {3:'5.95', 5:'9.95',9:'16.99'},
      fs = require('fs'),
      path = require('path'),
      parse = require('csv-parse'),
      moment = require('moment')
      bakeryBundleCalc = require('../lib/calc'),
      streamWrite = fs.createWriteStream(path.join(__dirname,'../resource/output/'+new Date().toISOString().slice(0,10).replace(/-/g,"")+'.txt'),{
      	flags: 'a'
      });  

    //start calculate price detail and console log output
    fs.createReadStream(path.join(__dirname,'../resource/input/order.csv') )
      .pipe(parse({delimiter: ':'}))
      .on('data', function(row){
      	const allString = row.toString().split(',');
      	switch(allString[1]){
      		case 'VS5' :
				generateBundlePrice(allString[0],vsPrice,[3,5],allString[1]);
      			break;
      		case 'MB11':	
      			generateBundlePrice(allString[0],mbPrice,[2,5,8],allString[1]);
      			break;      			
      		default:
      			generateBundlePrice(allString[0],cfPrice,[3,5,9],allString[1]);
      	}
      })

    /*
      generate result into txt file and print out log into screen
    */
    function generateBundlePrice(sum,typePrice,bundleDetail,typeCode){
    	const bundleObj = new bakeryBundleCalc(bundleDetail),      					
      	      priceBundle = bundleObj.doDPCalc(sum),
      	      priceArray = bundleObj.doReconsile(priceBundle)      	      
      	      if( priceBundle.length < 1 ){
      	      	console.log('sorry your order input is not compatible with the bundle number');	
      	      }else{
      	      	let sumPrice = 0;
	      		Object.keys(priceArray).map( item => {
	      		  		let detailString = (priceArray[item] == 1 ? ' 1' : ' ' + priceArray[item]) + ' x ' + item + ' $' + typePrice[item]
	      		  		//print out result
	  					console.log( detailString )
						sumPrice =  bundleObj.accAdd( bundleObj.accMul(priceArray[item] , parseFloat(typePrice[item]) ) , sumPrice) 			
						streamWrite.write(moment().format('YYYY-MM-DD-H-m-s')+ ' :' +detailString+"\r\n")	
				});  
			  	//print out result
			  	console.log(sum + ' ' + typeCode + ' $' + sumPrice);
			  	streamWrite.write(moment().format('YYYY-MM-DD-H-mm-s')+' :' + sum + ' ' + typeCode + ' $' + sumPrice+"\r\n")	
			  	streamWrite.write(Array(50).join('-')+"\r\n")		
      	      }
      		  
    }  










