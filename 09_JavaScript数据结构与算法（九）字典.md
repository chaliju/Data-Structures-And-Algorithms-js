# JavaScript 数据结构与算法（九）字典

## 字典

### 字典特点

- 字典存储的是**键值对**，主要特点是**一一对应**。
- 比如保存一个人的信息
  - 数组形式：`[19，"Tom", 1.65]`，可通过下标值取出信息。
  - 字典形式：`{"age": 19, "name": "Tom", "height": 165}`，可以通过 `key` 取出 `value`。
- 此外，**在字典中 key 是不能重复且无序的，而 Value 可以重复**。

### 字典和映射的关系

- 有些编程语言中称这种**映射关系**为**字典**，如 Swift 中的 `Dictonary`，Python 中的 `dict`。
- 有些编程语言中称这种**映射关系**为 **Map**，比如 Java 中的 `HashMap` 和 `TreeMap` 等。

### 字典常见的操作

- `set(key,value)` 向字典中添加新元素。
- `remove(key)` 通过使用键值来从字典中移除键值对应的数据值。
- `has(key)` 如果某个键值存在于这个字典中，则返回 `true`，反之则返回 `false`。
- `get(key)` 通过键值查找特定的数值并返回。
- `clear()` 将这个字典中的所有元素全部删除。
- `size()` 返回字典所包含元素的数量。与数组的 `length` 属性类似。
- `keys()` 将字典所包含的所有键名以数组形式返回。
- `values()` 将字典所包含的所有数值以数组形式返回。

### 字典封装

#### 代码实现

```js
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
```

#### 代码测试

```js
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
```