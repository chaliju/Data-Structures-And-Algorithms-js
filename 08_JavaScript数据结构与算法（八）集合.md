# JavaScript 数据结构与算法（八）集合

## 集合

几乎每种编程语言中，都有集合结构。集合比较常见的实现方式是**哈希表**，这里使用 JavaScript 的 Object 进行封装。

### 集合特点

- 集合通常是由一组**无序的**、**不能重复的**元素构成。

- 数学中常指的集合中的元素是可以重复的，但是计算机中集合的元素不能重复。

- **集合是特殊的数组**：
  - 特殊之处在于里面的元素没有顺序，也不能重复。
  - 没有顺序意味着**不能通过下标值进行访问**，不能重复意味着**相同的对象**在集合中**只会存在一份**。

### 封装集合

ES6 中的 `Set` 就是一个集合类，这里我们重新封装一个 `Set` 类，了解集合的底层实现。

#### 集合常见的操作

- `add(value)` ：向集合添加一个新的项。
- `remove(value)`： 从集合移除一个值。
- `has(value)` ：如果值在集合中，返回 `true`，否则返回` false`。
- `clear()` ：移除集合中的所有项。
- `size()`： 返回集合所包含元素的数量。与数组的 `length` 属性类似。
- `values()`： 返回一个包含集合中所有值的数组。
- 还有其他的方法，用的不多，这里不做封装。

#### 代码实现

- **实现has()方法**

`has()` 方法是用于判断集合中是否存在某数据。该方法接收一个参数 `value` 用于查找数据

这里先介绍一个JS中对象的内置方法： `hasOwnProperty()` 方法可以判断某属性是否为对象的自有属性，若是，则返回 `true` ；否则返回 `false`

所以实现思路就很简单了，直接将参数 `value` 传给 `hasOwnProperty()` 方法，并将其返回结果作为 `has()` 方法的返回结果即可

- **实现add()方法**

`add()` 方法是用于向集合中添加数据，并返回当前集合。该方法接收一个参数 `value` 用于存储

实现思路很简单，先通过我们封装的 `has()`方法 判断集合中是否存在该元素，若存在，则直接返回 `false` ；否则直接通过 `obj[key] = value` 的方式存储即可。这里我们是将参数 `value` 既作为 `key` 又作为 `value`

- **实现remove()方法**

`remove()` 方法就是用于删除集合中指定的元素。该方法接收一个参数 `value` 用于查找到对应的元素并删除

实现思路很简单，先通过 `has()` 方法判断集合中是否存在该元素，若不存在，则直接返回 `false` ，表示删除失败 ；否则，直接用关键字 `remove` 删除集合中对应的元素，并返回 `true` 表示删除成功

- **实现clear()方法**

`clear()` 方法时用于清空集合中的所有元素的。该方法无需传入参数

**实现思路：** 直接将 `this.items` 指向一个空的对象即可

- **实现size()方法**

`size()` 方法就是返回集合中的元素个数。该方法无需传入参数

这里先介绍一个JS中对象的内置方法： `keys()`方法可以接收一个对象参数，并返回该对象所有的键，存放在一个数组中并返回

**实现思路：** 通过 `keys()` 获取包含集合所有键的数组，并返回该数组的 `length` 即可

- **实现values()方法**

`values()` 方法是用于返回集合中的所有元素。该方法无需传入任何参数

**实现思路：** 直接将通过方法 `keys()` 获取到的数组返回即可

```js
// 封装集合类
function Set() {
    // 属性
    this.items = {}

    // 方法
    // 1.has()方法
    Set.prototype.has = function (value) {
        return this.items.hasOwnProperty(value)
    }

    // 2.add()
    Set.prototype.add = function (value) {
        // 1.判断当前集合中是否已经包含了该元素
        if (this.has(value)) {
            return false
        }

        // 2.将元素添加到集合中
        this.items[value] = value //表示该属性键和值都为value
        return true //表示添加成功
    }

    // 3.remove()方法
    Set.prototype.remove = function (value) {
        // 1.判断该集合中是否包含该元素
        if (!this.has(value)) {
            return false
        }

        // 2.将元素从属性中删除
        delete this.items[value]
        return true
    }

    // 4.clear()方法
    Set.prototype.clear = function () {
        this.items = {}
    }

    // 5.size()方法
    Set.prototype.size = function () {
        return Object.keys(this.items).length
    }

    // 6.获取集合中所有的值——values()方法
    Set.prototype.values = function () {
        return Object.keys(this.items)
    }
}
```

#### 代码测试

```js
// 1.创建Set类
var set = new Set();

// 2.添加元素
// add() 测试
set.add("abc");
set.add("abc");
set.add("123");
set.add("zxc");
console.log(set); //--> {items: {123: "123", abc: "abc", zxc: "zxc"}}

// has() 测试
console.log(set.has("123")); //--> true
console.log(set.has("456")); //--> false

// remove() 测试
set.remove("abc");
console.log(set); //--> {items: {123: "123", zxc: "zxc"}}

// size() 测试
console.log(set.size()); //--> 2

// values() 测试
console.log(set.values()); //--> ["123", "zxc"]

// clear() 测试
set.clear();
console.log(set.values()); //--> []
```

### 集合间的操作

- **并集**：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。
- **交集**：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。
- **差集**：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合。
- **子集**：验证一个给定集合是否是另一个集合的子集。

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.4utjffapm1w0.png)

#### 并集的实现

实现思路：创建集合C代表集合A和集合B的并集，先将集合`A`中的所有元素添加到集合`C`中，再遍历集合`B`，如果是集合`C`所没有的元素就把它添加到集合`C`中。

**实现思路：**

1. 先创建一个空的新集合 `newSet`
2. 通过 `values()` 方法获取到包含当前集合的所有元素的数组 `oldSetValue`，并对其进行遍历，将遍历到每一个元素都添加到 `newSet()` 中去
3. 再通过 `values()` 方法获取到包含 `otherSet` 的所有元素的数组 `otherSetValue`，并对其进行遍历，将遍历到每一个元素都添加到 `newSet()` 中去
4. 返回 `newSet`

在该实现过程中，我们是通过 `add()` 方法将两个集合中的所有元素添加到新的集合中的，因为 `add()` 方法中已经包含了检验元素的重复性部分，所以我们无需担心两个集合的元素是否会重复

```js
// 并集
Set.prototype.union = function(otherSet) {
    // this:集合对象A
    // otherSet:集合对象B
    //1.创建一个新的集合
    var unionSet = new Set()

    //2.将A集合中的所有元素添加到新集合中
    var values = this.values()
    // for(let i of values){
    //   unionSet.add(i)
    // }
    for(var i = 0;i < values.length;i++){
        unionSet.add(values[i])
    }

    //3.取出B集合中的元素,判断是否需要加到新集合中
    values = otherSet.values()
    /* 
    for(let i of values){
      //由于集合的add方法已经对重复的元素进行了判断,所以这里可以直接添加
      unionSet.add(i)
    }
     */
    for(let i = 0;i < values.length;i++){
        funionSet.add(values[i])    // add() 已经有重复判断
    }
    return unionSet
  }
```

**测试代码：**

```javascript
// 1.创建两个集合，且添加元素
var setA = new Set()
setA.add('abc')
setA.add('cba')
setA.add('nba')
var setB = new Set()
setB.add('aaa')
setB.add('abc')
setB.add('cba')

// 2.求两个集合的并集
unionSet = setA.union(setB)
console.log(unionSet)	// { items: { abc: 'abc', cba: 'cba', nba: 'nba', aaa: 'aaa' } }
```



#### 交集的实现

实现思路：遍历集合A，当取得的元素也存在于集合B时，就把该元素添加到另一个集合C中。

**实现思路：**

1. 先创建一个空的新集合 `newSet`
2. 通过 `values()` 方法获取到包含当前集合的所有元素的数组 `oldSetValue`，并对其进行遍历，判断每一个元素是否也存在于 `otherSet` 中，若不存在，则不做任何处理
3. 若存在，则将该元素添加到 `newSet` 中去
4. 返回 `newSet`

```js
// intersection() 求两个集合的交集
Set.prototype.intersection = function(orherSet) {
    // this:集合A
    // otherSet:集合B
    //1.创建新的集合
    var intersectionSet = new Set()

    //2.从A中取出一个元素，判断是否同时存在于集合B中，是则放入新集合中
    var values = this.values()
    for (let i = 0; i < values.length; i++) {
        let item = values[i]
        if (otherSet.has(item)) {
            intersectionSet.add(item)
        }
    }
    return intersectionSet
}
```

**测试代码：**

```javascript
intersectionSet = setA.intersection(setB)
console.log(intersectionSet)	// { items: { abc: 'abc', cba: 'cba' } }
```



#### 差集的实现

实现思路：遍历集合A，当取得的元素不存在于集合B时，就把该元素添加到另一个集合C中。

**实现思路：**

1. 先创建一个空的新集合 `newSet`
2. 通过 `values()` 方法获取到包含当前集合的所有元素的数组 `oldSetValue`，并对其进行遍历，判断每一个元素是否也存在于 `otherSet` 中，若存在，则不做任何处理
3. 若不存在，则将该元素添加到 `newSet` 中去
4. 返回 `newSet`

```js
// difference() 差集
Set.prototype.diffrence = function(otherSet) {
    //this:集合A
    //otherSet:集合B
    //1.创建新的集合
    var diffrenceSet = new Set()

    //2.取出A集合中的每一个元素，判断是否同时存在于B中，不存在则添加到新集合中
    var values = this.values()
    for (var i = 0; i < values.length; i++) {
        var item = values[i]
        if (!otherSet.has(item)) {
            diffrenceSet.add(item)
        }
    }
    return diffrenceSet
}
```

**测试代码:**

```javascript
diffrenceSet=setA.diffrence(setB)
console.log(diffrenceSet)	// { items: { nba: 'nba' } }
```

#### 子集的实现

实现思路：遍历集合A，当取得的元素中有一个不存在于集合B时，就说明集合A不是集合B的子集，返回false。

**实现思路：**

1. 先创建一个空的新集合 `newSet`
2. 通过 `values()` 方法获取到包含当前集合的所有元素的数组 `oldSetValue`，并对其进行遍历，判断每一个元素是否也存在于 `otherSet` 中，若不存在，则直接返回 `false`，表示当前集合不是 `otherSet` 的子集
3. 若所有元素遍历完后，该方法仍为返回任何值，此时直接返回 `true`，表示当前集合为 `otherSet` 的子集

```js
// subset() 子集
Set.prototype.subset = function (otherSet) {
    //this:集合A
    //otherSet：集合B
    //遍历集合A中的所有元素，如果发现，集合A中的元素，在集合B中不存在，那么放回false，如果遍历完整个集合A没有返回false，就返回true
    let values = this.values()
    for (let i = 0; i < values.length; i++) {
        let item = values[i]
        if (!otherSet.has(item)) {
            return false
        }
    }
    return true
}
```

测试代码：

```javascript
console.log(setA.subset(setB)) 	// false
```



