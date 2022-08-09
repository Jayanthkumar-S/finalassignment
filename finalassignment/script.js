

let  apiData;
console.log(document.cookie);


function createClothingCardsDynamically(clothingCardObj) {
    console.log(clothingCardObj);

 
    var cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    var cardLink = document.createElement('a');
    cardDiv.appendChild(cardLink);
    cardLink.href = 'productdetails.html?' + clothingCardObj.id;
 

    var thumbnail = document.createElement('img');
    thumbnail.className = 'card-img';
    thumbnail.src = clothingCardObj.preview;
    thumbnail.style = 'width:100%';

    cardDiv.appendChild(thumbnail);
    cardLink.appendChild(thumbnail);




    var cardTitle = document.createElement('div');
    cardTitle.className = 'card-body';

    var title = document.createElement('h5');
    title.className = 'card-title';
    title.id = 'card-product-title';
    var titleText = document.createTextNode(clothingCardObj.name);
    title.appendChild(titleText);

    cardTitle.appendChild(title)

    var subTitle = document.createElement('P');
    subTitle.className = 'card-text';
    subTitle.id = 'card-brand';
    var subTitleText = document.createTextNode(clothingCardObj.brand);
    subTitle.appendChild(subTitleText);

    cardTitle.appendChild(subTitle);
    cardTitle.appendChild(subTitle);


    var sub1Title = document.createElement('p');
    sub1Title.className = 'card-text';
    sub1Title.id = 'card-price';
    var sub1TitleText = document.createTextNode('Rs :' +' '+ clothingCardObj.price);
    sub1Title.appendChild(sub1TitleText);

    cardTitle.appendChild(sub1Title);
    cardTitle.appendChild(sub1Title);
    cardLink.appendChild(cardTitle);

    return cardDiv;
}


function searchProduct(ev) {
    let val = ev.target.value;
    
    if (val && val.trim() != '') {
        apiData.filter((item) => {
        if (item.brand.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return (item.brand.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    }
    console.log("no data is comming")
}


var clothingCard = document.getElementById('clothing-container');


var accessoriesCard = document.getElementById('accessories-container');


var httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function() {
    if (this.readyState === 4) {
        if (this.status == 200) {
            apiData = JSON.parse(this.responseText);
            console.log('call was succesfull',apiData);
                if (document.cookie.indexOf(",counter=") >= 0) {
                    var counter = document.cookie.split(",")[1].split("=")[1];
                    document.getElementById("cart-badge").innerHTML = counter;
                }
            for (i = 0; i <  apiData.length; i++) {
                console.log( apiData[i].isAccessory);
                if (! apiData[i].isAccessory) {
                    clothingCard.appendChild(createClothingCardsDynamically( apiData[i]));
                } else {
                    accessoriesCard.appendChild(createClothingCardsDynamically( apiData[i]));
                }
            }
        }else console.log('Error in Api call');
    }
}

httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', 'true');
httpRequest.send();

  