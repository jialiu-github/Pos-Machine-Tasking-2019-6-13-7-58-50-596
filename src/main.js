function findGoods(barcodes) {
    if (barcodes.some(b => !GOOD_REPOSITORY.find(g => g.id === b))){
        const unexistCode = barcodes.filter(b => !GOOD_REPOSITORY.find(g => g.id === b));
        throw new Error(`[ERROR]: unexist barcodes ${unexistCode.join(',')}`)
    }
    return barcodes.map(b => GOOD_REPOSITORY.find(i => i.id === b));
}

function calculateTotalAmount(goods){
    return goods.reduce((acc, current) => acc + Number(current.price), 0);
}

function cashier(barcodes){
    try{
        const goods = findGoods(barcodes);
        const totalAmount = calculateTotalAmount(goods);
        return formatToRecipt(goods, totalAmount);
    }
    catch(e) {
        return e.message;
    }
}

function formatToRecipt(goods, totalAmount){
    const header = buildHeader();
    const body = buildBody(goods);
    const footer = buildFooter(totalAmount);
    return header + body + footer;
}

function buildHeader(){
    return `
Receipt
------------------------------------------------------------`;
}

function buildBody(goods){
    const distictedGoods = goods.reduce((acc, good) => {
        if(acc.find(a => a.id === good.id)){
            return acc;
        }
        acc.push({...good, count: goods.filter(g => g.id === good.id).length});
        return acc;
    },[])
    return distictedGoods.reduce((acc, good) => acc + `
${good.name}${' '.repeat(32 - good.name.length)}${good.price}${' '.repeat(11 - good.price.toString().length)}${good.count}`, '');
}

function buildFooter(totalAmount){
    return `
------------------------------------------------------------
Price: ${totalAmount}
`;
}

const GOOD_REPOSITORY = 
[
    {"id": "0001", "name" : "Coca Cola", "price": 3},
    {"id": "0002", "name" : "Diet Coke", "price": 4},
    {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
    {"id": "0004", "name" : "Mountain Dew", "price": 6},
    {"id": "0005", "name" : "Dr Pepper", "price": 7},
    {"id": "0006", "name" : "Sprite", "price": 8},
    {"id": "0007", "name" : "Diet Pepsi", "price": 9},
    {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
    {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
    {"id": "0010", "name" : "Fanta", "price": 12}
];

module.exports = {
    findGoods,
    calculateTotalAmount,
    cashier
};