console.log("COPYWITHIN DEMO");


var array1 = ['a', 'b', 'c', 'd', 'e'];


console.log(array1, " values of array1");

var result= (copyWithin(array1, 0,3,4));
check(result, ["d", "b", "c", "d", "e"]);

var result=(copyWithin(array1, 2,3,4));
check(result, ["d", "b", "d", "d", "e"]);



/*solo hay el caso en que la variable es declarada y no definida*/
var x
try{
    console.log(copyWithin());
}catch(error){
    console.log(error)
}