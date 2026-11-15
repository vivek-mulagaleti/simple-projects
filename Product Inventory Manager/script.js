 const productsList=[];
        
        //add products to inventory
        function addProduct(){
            const productName=document.querySelector('#productName').value;
            const productPrice=Number(document.querySelector('#price').value);
            const productQuantity=Number(document.querySelector('#quantity').value);

            const total=productPrice*productQuantity;

            productsList.push({
                productName: productName,
                productPrice: productPrice,
                productQuantity: productQuantity,
                totalValue:total
            });

            document.querySelector('#productName').value='';
            document.querySelector('#price').value='';
            document.querySelector('#quantity').value='';


            displayProducts();
        }

        //display products
        function displayProducts(){
            let list=''
            const showProductList=document.querySelector('.js-products');
            const showTotalProducts=document.querySelector('.total')
            productsList.forEach((product,index)=>{
                list+=`
                    <div class="product-card">
                        <h3>${product.productName}</h3>
                        <div class="product-info">
                            <div>
                                <p>Price</p>
                                <h3>₹${product.productPrice}</h3>
                            </div>
                            <div>
                                <p>Availability</p>
                                <h3 class="stock">${product.productQuantity} in Stock</h3>
                            </div>
                        </div>
                        <button onclick="deleteProduct(${index});">Delete</button>
                    </div>
                `
            });


            //calculate total inventoryValue and display
            const inventoryValue=productsList.reduce((sum,product)=>{
                return sum+product.totalValue;
            },0);


            //display in page
            document.querySelector('.totalValue').innerHTML=inventoryValue;
            showTotalProducts.innerHTML=productsList.length;
            showProductList.innerHTML=list;
        }


        function deleteProduct(index){
            productsList.splice(index,1);
            displayProducts();
        }


        function search(){
            let list='';
            const searchItem=document.querySelector('#searchItem').value;
            const searchResult=productsList.filter((product)=>{
                return product.productName===searchItem;
            });

            document.querySelector('#searchItem').value='';

            searchResult.forEach((product,index)=>{
                list+=`
                    <div class="product-card">
                        <h3>${product.productName}</h3>
                        <div class="product-info">
                            <div>
                                <p>Price</p>
                                <h3>₹${product.productPrice}</h3>
                            </div>
                            <div>
                                <p>Availability</p>
                                <h3 class="stock">${product.productQuantity} in Stock</h3>
                            </div>
                        </div>
                        <button onclick="deleteProduct(${productsList.indexOf(product)});">Delete</button>
                    </div>
                `
            });

            if(searchResult.length===0){
                document.querySelector('.js-products').innerHTML=`<h2>No Product Found</h2>`
            }else{
            document.querySelector('.js-products').innerHTML=list;
            }
        }
