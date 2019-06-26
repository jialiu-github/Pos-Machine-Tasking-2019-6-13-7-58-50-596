// ## Task 1 should find cocal when the barcodes only include 0001
const {findGoods, calculateTotalAmount, cashier} = require('../src/main.js');

it('should find cola when the barcodes only include 0001', () => {
    const barcodes = ['0001'];
    const goods = findGoods(barcodes);

    const expected = {"id": "0001", "name" : "Coca Cola", "price": 3};
    expect(goods.length).toBe(1);
    const actual = goods[0];
    expect(actual.name).toBe(expected.name);
    expect(actual.price).toBe(expected.price);
})

it('should find two cola when the barcodes include two 0001', () => {
    const barcodes = ['0001','0001'];
    const goods = findGoods(barcodes);

    const expected = {"id": "0001", "name" : "Coca Cola", "price": 3};
    expect(goods.length).toBe(2);
})

// ## Task 2 the total amount shoud be 7 when the barcodes has one 001 and one 002
it('the total amount should be 7 when the barcodes has one 0001 and one 0002', () => {
    const cola = {"id": "0001", "name" : "Coca Cola", "price": 3};
    const coke = {"id": "0002", "name" : "Diet Coke", "price": 4};

    const totalAmount = calculateTotalAmount([cola, coke]);

    expect(totalAmount).toBe(7);
})

// ## Task 3 should only return a receipt with empty body and zero amount when has no goods and amount is zero

it('should only return a receipt with empty body and zero amount when has no goods and amount is zero', () => {
    const receipt = cashier([]);

    const expected = 
`
Receipt
------------------------------------------------------------
------------------------------------------------------------
Price: 0
`
    expect(receipt).toBe(expected);
})
// ## Task 4 should return correct price in body and totoal amount when there are two kinds of goods and each of them only has one
it('should return correct price in body and total amount when there are two kinds of goods and each of them only has one', () => {
    const receipt = cashier(['0001','0003']);

    const expected = 
`
Receipt
------------------------------------------------------------
Coca Cola                       3          1
Pepsi-Cola                      5          1
------------------------------------------------------------
Price: 8
`
    expect(receipt).toBe(expected);
})

// ## Task 5 should get correct goods count in receipt when the barcodes is not empty
it('should get correct goods count in receipt when the barcodes is not enmpty', () => {
    const receipt = cashier(['0001','0003','0001','0003']);

    const expected = 
`
Receipt
------------------------------------------------------------
Coca Cola                       3          2
Pepsi-Cola                      5          2
------------------------------------------------------------
Price: 16
`
    expect(receipt).toBe(expected);
})


// ## Task 6 should get error when input unexist barcodes

// ## Task 7 should return 6 when the barcodes has two 0001
it('should return 6 when the barcode has two 0001', () => {
    const cola = {"id": "0001", "name" : "Coca Cola", "price": 3};

    const totalAmount = calculateTotalAmount([cola, cola]);

    expect(totalAmount).toBe(6);
})
