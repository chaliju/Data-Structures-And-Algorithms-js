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

    // 集合间的操作
    // 一、并集
    Set.prototype.union = function (otherSet) {
        // this:集合对象A
        // otherSet:集合对象B
        //1.创建一个新的集合
        var unionSet = new Set()

        //2.将A集合中的所有元素添加到新集合中
        var values = this.values()
        // for(let i of values){
        //   unionSet.add(i)
        // }
        for (var i = 0; i < values.length; i++) {
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
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i]) // add() 已经有重复判断
        }
        return unionSet
    }

    // 二、交集
    Set.prototype.intersection = function (otherSet) {
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

    // 三、差集
    Set.prototype.diffrence = function (otherSet) {
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


    // 四、子集
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

}



/* // 1.创建Set类
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
console.log(set.values()); //--> [] */


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
console.log(unionSet)

// 3.求两个集合的交集
intersectionSet = setA.intersection(setB)
console.log(intersectionSet)

// 4.求两个集合的差集
diffrenceSet = setA.diffrence(setB)
console.log(diffrenceSet)

// 5.判断子集
console.log(setA.subset(setB))
