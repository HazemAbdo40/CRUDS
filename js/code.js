


var productNameInput = document.getElementById('productNameInput');
var productPriceInput = document.getElementById('productPriceInput');
var productCategoryInput = document.getElementById('productCategoryInput');
var productDescInput = document.getElementById('productDescInput');
var btnAdd = document.getElementById('btnAdd');
var tableBody = document.getElementById('tableBody');
var searchInput = document.getElementById('searchInput');
var searchResult = document.getElementById('searchResult');
var productList;
var currentIndex = 0;
if (localStorage.getItem("myCategories") == null) {
   productList = [];
}
else {
   productList = JSON.parse(localStorage.getItem("myCategories"));
   displayProducts();
}
btnAdd.addEventListener('click', function () {
   if (btnAdd.innerHTML == 'Add Product') {
      addProduct()
   }
   else {
      saveUpdate();
   }
});
function addProduct() {
   var product =
   {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescInput.value
   }
   if (productNameInput.value == '' || productPriceInput.value == '' || productCategoryInput.value == '' || productDescInput.value == '')
    {
      document.getElementById('req').style.display = "block";
   }
   else {
      productList.push(product);
      localStorage.setItem('myCategories', JSON.stringify(productList));
      displayProducts();
      clearForm();
      document.getElementById('req').style.display = "none";
   }
}
function displayProducts() {
   var productContent = ``;
   for (var i = 0; i < productList.length; i++) {
      productContent +=
         `<tr>
       <td>${productList[i].name}</td>
       <td>${productList[i].price}</td>
       <td>${productList[i].category}</td>
       <td>${productList[i].desc}</td>
       <td><button  onclick='updateProduct(${i})' id='btnUpdate' class='btn btn-warning'>Update</button></td>
       <td><button onclick='deleteProduct(${i})' id='btnDelete' class='btn btn-danger'>Delete</button></td>
       </tr>`
   }
   tableBody.innerHTML = productContent;
}
function searchProduct(term) {

   var productContentSearch = ``;
   var productContentSearch2 = ``;
   var newTxt = ``;
   for (var i = 0; i < productList.length; i++) {
      if (productList[i].name.includes(term.trim()) == true) {
         productContentSearch +=
            `<tr>
       <td>${productList[i].name}</td>
       <td>${productList[i].price}</td>
       <td>${productList[i].category}</td>
       <td>${productList[i].desc}</td>
       <td><button onclick='updateProduct(${i})' id='btnUpdate' class='btn btn-warning'>Update</button></td>
       <td><button onclick='deleteProduct(${i})' id='btnDelete' class='btn btn-danger'>Delete</button></td>
       </tr>`
         newTxt = productList[i].name.replace(term, `<span style='color:red'>${term}</span>`);
         productContentSearch2 += `<div>${newTxt}</div>`;
      }
      tableBody.innerHTML = productContentSearch;

      if (searchInput.value == ``) {
         searchResult.innerHTML = ``;
      }
      else {
         searchResult.innerHTML = productContentSearch2;
      }
   }
}
searchInput.addEventListener('keyup' , function(){
   //onkeyup="searchProduct(this.value)" 
   searchProduct(this.value)
})
function deleteProduct(index) {
   productList.splice(index, 1);
   localStorage.setItem('myCategories', JSON.stringify(productList));
   displayProducts();
}
function updateProduct(index) {
   currentIndex = index;
   productNameInput.value = productList[index].name;
   productPriceInput.value = productList[index].price;
   productCategoryInput.value = productList[index].category;
   productDescInput.value = productList[index].desc;
   btnAdd.innerHTML = 'Update';
}
function saveUpdate() {
   let product =
   {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescInput.value
   }
   productList[currentIndex] = product;
   localStorage.setItem('myCategories', JSON.stringify(productList));
   displayProducts()
   clearForm();
   btnAdd.innerHTML = 'Add Product';
}
function clearForm() {
   productNameInput.value = "";
   productPriceInput.value = "";
   productCategoryInput.value = "";
   productDescInput.value = "";
}
