
let proobj = new Promise(function(myresolve, myreject) {                //we give any name here as argument place of 'myresolve and myreject' .

    var a = 20, b= 10;
    var c= a/b;
    if(c!=0)
    {
        myresolve('Answer is right');
    }
    else 
    {
        myreject('given value is wrong for division');
    }
});



proobj.then(function(message) {
    console.log(message);
}).catch(function(error) {
    console.log(error);
});