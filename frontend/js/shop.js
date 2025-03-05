"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  // Product List
  const products = [
    {
      name: "CLC Hoodie",
      price: 50,
      image: "assets/unisex-heavy-blend-hooded-sweatshirt.jpg"
    },
    {
      name: "CLC T-Shirt",
      price: 25,
      image: "assets/db72c4a8-5654-483c-b83e-f75a337f41d7.jpg"
    },
    {
      name: "CLC Mug",
      price: 15,
      image: "assets/black-mug-11oz-15oz.jpg"
    }
  ];

  function displayProducts() {
    const productList = document.getElementById("productList");
    if (!productList) {
      console.error("Error: Element with ID 'productList' not found.");
      return;
    }

    productList.innerHTML = products
      .map(
        (p, index) => `
        <div class="col-md-4 mb-3 text-center">
          <div class="card bg-dark text-white">
            <img src="${p.image}" class="card-img-top" alt="${p.name}">
            <div class="card-body">
              <h5 class="card-title">${p.name}</h5>
              <p class="card-text">${p.price} CLC</p>
              <button class="btn btn-custom" onclick="buyItem(${index})">Buy Now</button>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }

  // Web3 Purchase Function
  window.buyItem = async function (productIndex) {
    if (!window.ethereum) {
      alert("MetaMask is required to make a purchase!");
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

      const contractAddress = "0xYourContractAddress"; // Replace with deployed contract address
      const contractABI = [ /* Your Contract ABI Here */ ];
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      const product = products[productIndex];
      const priceInWei = web3.utils.toWei(product.price.toString(), "ether");

      await contract.methods.buyItem(product.name).send({ 
        from: accounts[0], 
        value: priceInWei 
      });

      alert(`Purchased ${product.name}!`);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Check the console for details.");
    }
  };

  displayProducts();
});
