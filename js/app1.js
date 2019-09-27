Vue.component('product', {
    props : {
        premium : {
            type: Boolean,
            required : true,
        }
    },
    template: `
<div class="product">
    <div class="product-img">
      <a v-bind:href="link">
      <img v-bind:src="image" alt="">
      </a>
    </div>
    <div v-for="(item , index) in variants"              
           :key="item.id"
           class="color"
           @mouseover="updatePhone(index)">
      {{item.color}}
    </div>
    <div class="product-info">
    <h1>{{title}}</h1>
      <p v-if="inStock > 5">In stock</p>
      <p v-else-if="inStock <= 5 && inStock > 0">Almost sold out!</p>
      <p v-else :class="{ decoration : !inStock}">Out of stock</p>
<p class="premium_price" :class="{price : !premium}"> Shipping : {{shipping}}</p>
      <p v-show ="show">Andoid better</p>
      <div class="list">
      <p v-for="item in variants"
         :key="item.details">{{updateDetails}}
      </p>
      </div>
     
      <div class="cart_block">
<button class="cart_btn_clear"
:disabled="!inStock"
:class="{ disabledBtn: !inStock }"
>Clear counter</button>
      <button class="cart_btn" 
              v-on:click="addToCart"                             
              :disabled="!inStock"
              :class="{ disabledBtn: !inStock }"
              >
        Add to Cart
      </button>
      </div>
<product-review></product-review>
    </div>

  </div>
`,
    data (){
        return {
            name: 'Iphone 7' ,
            brand : "Apple",
            img: 'https://hotline.ua/img/tx/157/157995082_s265.jpg' ,
            link: 'https://www.apple.com/',
            stockItems : 10,
            show: false ,
            selectedVariant : 0 ,
            variants : [
                {
                    color: 'white' ,
                    background: 'red' ,
                    variantImg : 'https://images-na.ssl-images-amazon.com/images/I/71wzjgNtzbL._SX569_.jpg',
                    id: 100,
                    variantQuantity: 0 ,
                    details: "Cam 20px IOS 12 App Store",
                },
                {
                    color: 'black',
                    background: 'lightgreen',
                    variantImg: 'https://hotline.ua/img/tx/157/157995082_s265.jpg',
                    id: 101,
                    variantQuantity: 10,
                    details: "Cam 21px IOS 12 App Store",
                }
            ],

        }
    },
    methods : {
        addToCart: function () {
            this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId)
        },
        clearCard : function() {
            this.$emit('clear-card')
        },
        updatePhone : function(index){
            this.selectedVariant = index
        },
    },
    computed: {
        title() {
            return this.brand + '  ' + this.name
        },
        image() {
            return this.variants[this.selectedVariant].variantImg
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        updateDetails() {
            return this.variants[this.selectedVariant].details

        },
        shipping(){
            if (this.premium){
                return "Free"
            }
            return 9.99
        }

    }

})

// Vue.component('product-review', {
//   template: `
// <div>
//   <input class="form-input" v-model="search" placeholder="name"/><br/>
//    <div>
//    <label class="form-check">
//      <input type="checkbox" value="1" class="form-check" v-model="searchMatches">1
//    </label>
//    </div>
//    <div>
//    <label class="form-check">
//      <input type="checkbox" value="2" class="form-check" v-model="searchMatches">2
//    </label>
//    </div>
//    <div>
//    <label class="form-check">
//      <input type="checkbox" value="3" class="form-check" v-model="searchMatches">3
//    </label>
//    </div>
//    <div>What we search:{{search}}</div>
//    <div> Matches: {{searchMatches}}</div>
// </div>
// `,
//   data() {
//     return {
//       search: '',
//       searchMatches : []
//     }
//   }
// })


var app = new Vue ({
    el: '#app',
    data : {
        premium : true ,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }
})

var headBlock = new Vue ({
    el: '#nav-bar',
    data: {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1024px-Apple_logo_black.svg.png',
    }
})