let axios = require('axios')
// axios({
//     method: 'get',
//     url: 'https://financialmodelingprep.com/api/v3/stock/list?apikey=e4c3802b17d8e6960e1ea266d24d68d6',
//     responseType: 'stream'
//   })
//     .then(function (response) {
//       console.log(response);
//     });
let stockList = "AAPL,MSFT,AMZN,GOOGL,TSLA,FB,BABA,TSM,V,JNJ,JPM,WMT,NVDA,PYPL,DIS,MA,GME,PG,UNH,HD,BAC,INTC,ASML,NFLX,CMCSA,PDD,ADBE,ABT,TM,VZ,NKE,CRM,KO,XOM,NVS,T,TMO,CSCO,LLY,AVGO,PFE,MRK,ORCL,PEP,ABBV,CVX,SHOP,DHR,ACN,QCOM";
let apiKey = "e4c3802b17d8e6960e1ea266d24d68d6";


axios.get(`https://financialmodelingprep.com/api/v3/quote/${stockList}?apikey=${apiKey}`).then(function (response) {
let stockNameArray = [];
let stockSymbolArray = [];
let stockPriceArray = [];
let stockObj = {
  name: [],
  symbol: [],
  price: []
}
for (let i = 0; i < response.data.length; i++) {
          
          stockNameArray.push(response.data[i].name);
          stockSymbolArray.push(response.data[i].symbol);
          stockPriceArray.push(response.data[i].price);
          
        }    
        // stockObj.name.push(stockNameArray)
				// stockObj.symbol.push(stockSymbolArray)
				// stockObj.price.push(stockPriceArray)
				// console.log(stockObj);
        console.log(response.data);

  })

  

// const https = require('https')

// const options = {
//   hostname: 'financialmodelingprep.com',
//   port: 443,
//   path: '/api/v3/quote-short/AAPL?apikey=e4c3802b17d8e6960e1ea266d24d68d6',
//   method: 'GET'
// }

// const req = https.request(options, (res) => {
//   res.on('data', (d) => {
//     process.stdout.write(d)
//   })
// })

// req.on('error', (error) => {
//   console.error(error)
// })

// req.end()

// https://financialmodelingprep.com/api/v3/stock/list?apikey=e4c3802b17d8e6960e1ea266d24d68d6
