function calculate(){

    var city = $('#city').val();
    var yearOfPurchase = $('#yearOfPurchase').val();
    var fuelType = $('#fuelType').val();
    var transmission = $('#transmission').val();
    var ownerType = $('#ownerType').val();
    var seats = $('#seats').val();

    var kilometersDriven = $('#kilometersDriven').val();
    var mileage = $('#mileage').val();
    var engine = $('#engine').val();
    var power = $('#power').val();
    var originalPriceDetail = $('#originalPriceDetail').val();
    var originalPrice = $('#originalPrice').val();

    if(kilometersDriven == "" || mileage == "" || engine == "" || power == "" || (originalPriceDetail == "1" && originalPrice == "")){
        newAlert("Mandatory fields cannot be empty!!!", "Warning", "warning");
    }
    else if(mileage<=0 || mileage>999){
        newAlert("Mileage should be in range 1-999 kmpl", "Warning", "warning");
    }
    else if(engine<=0 || engine>99999){
        newAlert("Engine capacity should be in range 1-99999 CC", "Warning", "warning");
    }
    else if(parseInt(power)<=0 || parseInt(power)>99999){
        newAlert("Power should be in range 1-99999 bhp", "Warning", "warning");
    }
    else if( originalPriceDetail == "1" && (parseInt(originalPrice)<=999 || parseInt(originalPrice)>999999999)){
        newAlert("Original Price should be in range of INR 1000-999999999", "Warning", "warning");
    }
    else{
        var object = {
            'city' : city,
            'yearOfPurchase' : yearOfPurchase,
            'fuelType' : fuelType,
            'transmission' : transmission,
            'ownerType' : ownerType,
            'seats' : seats,
            'kilometersDriven' : kilometersDriven,
            'mileage' : mileage,
            'engine' : engine,
            'power' : power,
            'originalPriceDetail' : originalPriceDetail,
            'originalPrice' : originalPrice
        };

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/predict', true);
        $('#calculatedPrice').html("Predicting Price...");
        xhr.onreadystatechange = function(){
            if(xhr.readyState == XMLHttpRequest.DONE){
                $('#calculatedPrice').html("Prediction : INR " + xhr.responseText);
            }
        }
        xhr.onload = function(){};
        xhr.send(JSON.stringify(object));
    }
}

function originalPriceDetailChange(){
    if(parseInt($('#originalPriceDetail').val()) == 0) $('#hiddenOriginalPrice').hide();
    else $('#hiddenOriginalPrice').show();
}