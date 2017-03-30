function CustomerMenuChoice()
    {
        if (document.getElementById("customermenu").value == "Create A Customer")
            {
                document.getElementById("customercreation1").style.visibility = "visible";
                document.getElementById("orderupdate2").style.visibility = "hidden";
                document.getElementById("customerdelete3").style.visibility = "hidden";
            }
        else if (document.getElementById("customermenu").value == "Update Ship-To Address")
        {
            document.getElementById("customercreation1").style.visibility = "hidden";
            document.getElementById("orderupdate2").style.visibility = "visible";
            document.getElementById("customerdelete3").style.visibility = "hidden";
        }
        else if (document.getElementById("customermenu").value == "Delete A Customer")
        {
            document.getElementById("customercreation1").style.visibility = "hidden";
            document.getElementById("orderupdate2").style.visibility = "hidden";
            document.getElementById("customerdelete3").style.visibility = "visible";
        }
        
        else if (document.getElementById("customermenu").value == "Please Select An Option")
        {
            document.getElementById("customercreation1").style.visibility = "hidden";
            document.getElementById("orderupdate2").style.visibility = "hidden";
            document.getElementById("customerdelete3").style.visibility = "hidden";  
        }
    }

function CreateCustomer()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX Request Object
    
    //Create URL
    var url =  "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    
    //Collect customer data from web page
    var customerid = document.getElementById("custid").value;
    var customername = document.getElementById("custname").value;
    var customercity = document.getElementById("custcity").value;
    
    //Create the parameter string
     var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName":"' + customername + '","City":"' + customercity +'"}';
    
     
     //Checking for AJAx operation return
     objRequest.onreadystatechange = function()
     {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(result);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcustomer);
}

function OperationResult(output)
{
     if (output.WasSuccessful == 1)
     {
        document.getElementById("result").innerHTML = "The operation was successful!";
     }
     else
     {
        document.getElementById("result").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
     }
}

function UpdateOrderAddress()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX Request Object
    
    //Create URL
    var addressurl =  "https://student.business.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
    
    //Collect customer data from web page
    var orderident = document.getElementById("ordernum").value;
    var shippingaddress = document.getElementById("shiptoaddress").value;
    var shippingcity = document.getElementById("shiptocity").value;
    var shippingname = document.getElementById("shiptoname").value;
    var shippingpostal = document.getElementById("shiptopostal").value;
    
    //Create the parameter string
     var updatedaddress = '{"OrderID":"' + orderident + '","ShipAddress":"' + shippingaddress + '","ShipCity":"' + shippingcity +'","ShipName":"' + shippingname +'","ShipPostcode":"' + shippingpostal +'"}';
    
     
     //Checking for AJAx operation return
     objRequest.onreadystatechange = function()
     {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            AddressOperationResult(result);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", addressurl, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(updatedaddress);
}

function AddressOperationResult(output)
{
     if (output == 1)
     {
        document.getElementById("addresult").innerHTML = "The operation was successful!";
     }
     
     else if (output == 0)
     {
        document.getElementById("addresult").innerHTML = "Operation failed with an unspecified error";
     }
     
     else if (output == -2)
     {
        document.getElementById("addresult").innerHTML = "Operation failed because the data string supplied could not be deserialized into the service object";
     }
     
     else if (output == -3)
     {
        document.getElementById("addresult").innerHTML = "Operation failed because a record with the supplied Order ID could not be found";
     }
     
}

function DelCustomer()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX Request Object
    
    //Create URL & Query string
    var customerdelurl =  "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
    customerdelurl += document.getElementById("custident").value; //Query String
    
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var customerdeloutput = JSON.parse(objRequest.responseText);
            GenerateCustomerDelOutput(customerdeloutput);
        }
    }
    
    //Initiate the server request
    objRequest.open("GET", customerdelurl, true); //Open connection
    objRequest.send(); //Send data
}

function GenerateCustomerDelOutput(result)
{
    
    if (result.DeleteCustomerResult.WasSuccessful  == 1)
     {
        document.getElementById("delresult").innerHTML = "Operation completed successfully";
     }
     else
     {
        document.getElementById("delresult").innerHTML = "Operation failed – Error Message included" + "<br>" + result.Exception;
     }

     
}