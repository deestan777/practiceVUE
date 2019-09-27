Vue.component('product', {

    template: `

<div class="product">
<div class="product-image">
    <img v-bind:src="image" />
</div>
<h1>
    {{ title }}
</h1>
<p v-show="inStock">in stock</p>
<p v-show="!inStock" :style="styleObject">out of stock</p>
<p v-if="inventory<=10 && inventory >0">
    almost sold out
</p>

<ul>
    <li v-for="detail in details">
        {{ detail }}
    </li>
</ul>

<div class="color-switcher">
    <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box"
        :style="{backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)">
    </div>
</div>

<div class="size-wrapper">
    <div class="size" v-for="size in sizes" :key="size.sizeId" v-show="inStock">

        <input type="radio" name="size">
        {{ size.sizeValue }}
        </input>

    </div>
</div>
<span v-if="inSale == true">
    on sale
</span>
<span v-else-if="inSale == false">
    Not on sale
</span>
<button v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Add to Cart</button>
<button v-on:click="incrementCart" v-if="cart > 0" :disabled="cart<=0">
    Increment Cart
</button>
</div>
`,


    data() {
        return {
            /* css */
            classObject: {
                activeClass: 'active',
                errorClass: 'text-danger',
                disabledClass: 'disabled-item'
            },
            styleObject: {
                color: 'red',
                fontSize: '15px'
            },
            styleObject1: {
                color: 'green',
                fontSize: '13px'
            },
            styleObject2: {
                color: 'yellow',
                fontSize: '13px'
            },
            /* /css */



            /* products */
            brand: 'Nike',
            product: 'Shoes',
            selectedVariant: 0,
            inventory: 100,
            details: [
                "80% cotton",
                "20% polyester",
                "Gender-neutral"
            ],
            variants: [{
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "img/products/0.jpg",
                    variantQuantity: 10,
                    inSale: false
                },
                {
                    variantId: 2235,
                    variantColor: "yellow",
                    variantImage: "img/products/01.jpg",
                    variantQuantity: 0,
                    inSale: false
                },
                {
                    variantId: 2236,
                    variantColor: "red",
                    variantImage: "img/products/02.jpg",
                    variantQuantity: 5,
                    inSale: true
                }
            ],
            sizes: [{
                sizeId: 2236,
                sizeValue: "41"
            }, {
                sizeId: 2237,
                sizeValue: "42"
            }, {
                sizeId: 2238,
                sizeValue: "43"
            }]
            /* /products */


        }
    },

    methods: {
        addToCart() {
            this.$emit('add-to-cart')
        },

        updateProduct(index) {
            this.selectedVariant = index
        }

    },

    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        onSale() {
            return this.variants[this.selectedVariant].inSale
        }
    }

})

/*
Vue.component('cart', {
    template: `



`
})
*/

var app = new Vue({
    el: '#app',
    data: {
        cart: 0
    },
    methods: {
        updateCart(){
            this.cart +=1
        }
    }
})