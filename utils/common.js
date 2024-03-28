exports.calcTotalItems = (item)=>{
//     console.log(item);
     const totalItems = item.reduce((acc,currVal)=>{
           return acc+currVal.amount;
     },0);

     return totalItems;
};





