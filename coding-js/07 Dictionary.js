// 封装字典类
function Dictionary () {
    // 字典属性
    this.items = {}

    // 字典操作方法
    // 一.在字典中添加键值对
    Dictionary.prototype.set = function (key, value) {
        this.items[key] = value
    }

    // 二.判断字典中是否有某个key
    Dictionary.prototype.has = function (key) {
        return this.items.hasOwnProperty(key)
    }

    //三.从字典中移除元素
    Dictionary.prototype.remove = function (key) {
        //1.判断字典中是否有这个key
        if (!this.has(key)) return false

        //2.从字典中删除key
        delete this.items[key]
        return true
    }

    //四.根据key获取value
    Dictionary.prototype.get = function (key) {
        return this.has(key) ? this.items[key] : undefined
    }

    //五.获取所有keys
    Dictionary.prototype.keys = function () {
        return Object.keys(this.items)
    }

    //六.size方法
    Dictionary.prototype.size= function () {
        return this.keys().length
    }

    //七.clear方法
    Dictionary.prototype.clear = function () {
        this.items = {}
    }
}



// 测试代码
var dict = new Dictionary();

// set() 测试
dict.set("name", "XPoet");
dict.set("age", 18);
dict.set("email", "i@xpoet.cn");
console.log(dict); // {items: {name: "XPoet", age: 18, email: "i@xpoet.cn"}}

// has() 测试
console.log(dict.has("name")); //--> true
console.log(dict.has("address")); //--> false

// remove() 测试
dict.remove("name");
console.log(dict); // {age: 18, email: "i@xpoet.cn"}

// get() 测试
console.log(dict.get("age")); //--> 18

// keys() 测试
console.log(dict.keys()); //--> ["age", "email"]

// values() 测试
console.log(dict.get()); //--> [undefined]

// size() 测试
console.log(dict.size()); //--> 2