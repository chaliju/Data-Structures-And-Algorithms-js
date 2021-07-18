// 封装哈希表类
function hashTable() {
    // 属性
    this.storage = []; // 哈希表存储数据的变量
    this.count = 0; // //计算已经存储的元素个数
    //装填因子：loadFactor > 0.75时需要扩容；loadFactor < 0.25时需要减少容量
    this.limit = 7; // 哈希表长度（初始设为质数 7）

    // 方法
    // 哈希函数
    hashTable.prototype.hashFunc = function (str, size) {
        // 1.定义hashCode变量
        let hashCode = 0

        // 2.霍纳法则，计算hashCode的值
        // cats -> Unicode编码
        for (let i = 0; i < str.length; i++) {
            // str.charCodeAt(i)//获取某个字符对应的unicode编码
            hashCode = 37 * hashCode + str.charCodeAt(i)
        }

        // 3.取余操作
        let index = hashCode % size
        return index
    }


    // 插入&修改操作
    hashTable.prototype.put = function (key, value) {
        // 1.根据key获取对应的index
        let index = this.hashFunc(key, this.limit)

        // 2.根据index取出对应的bucket
        let bucket = this.storage[index]

        // 3.判断bucket是否为null
        if (bucket == null) {
            bucket = []
            this.storage[index] = bucket
        }

        // 4.判断是否修改数据
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (tuple[0] == key) {
                tuple[1] = value
                return //不用返回值，修改完 tuple 里数据，return 终止不再往下执行。
            }
        }

        // 5.进行添加操作
        bucket.push([key, value]) // bucket 存储元组 tuple，格式为 [key, value]
        this.count += 1

        // 6.判断是否需要扩容操作
        if (this.count > this.limit * 0.75) {
            let newSize = this.limit * 2
            let newPrime = this.getPrime(newSize)
            this.resize(newPrime)
        }
    }


    // 获取操作
    hashTable.prototype.get = function (key) {
        // 1.根据key获取对应的index
        let index = this.hashFunc(key, this.limit)

        // 2.根据index获取对应的bucket
        let bucket = this.storage[index]

        // 3.判断bucket是否等于null
        if (bucket == null) {
            return null
        }

        // 4.有bucket，那么就进行线性查找
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (tuple[0] == key) {
                // tuple[0]存储key，tuple[1]存储value
                return tuple[1]
            }
        }

        // 5.依然没有找到，那么直接返回null
        return null
    }


    // 删除操作
    hashTable.prototype.remove = function (key) {
        // 1.根据key获取对应的index
        let index = this.hashFunc(key, this.limit)

        // 2.根据index获取对应的bucket
        let bucket = this.storage[index]

        // 3.判断bucket是否为null
        if (bucket == null) {
            return null
        }

        // 4.有bucket，那么进行线性查找，并且删除
        for (let i = 0; i < bucket.length; i++) {
            let touple = bucket[i]
            if (touple[0] == key) {
                bucket.splice(i, 1)
                this.count -= 1
                return touple[1]
            }
        }
        // 5.依然没有找到，返回null
        return null

        // 6.缩小容量
        if (this.limit > 7 && this.count < this.limit * 0.25) {
            let newSize = Math.floor(this.limit / 2)
            let newPrime = this.getPrime(newSize)
            this.resize(newPrime)
        }
    }

    //判断哈希表是否为null
    hashTable.prototype.isEmpty = function () {
        return this.count == 0
    }

    //获取哈希表中元素的个数
    hashTable.prototype.size = function () {
        return this.count
    }


    // 哈希表扩容
    hashTable.prototype.resize = function (newLimit) {
        // 1.保存旧的数组内容
        let oldStorage = this.storage

        // 2.重置所有的属性
        this.storage = []
        this.count = 0
        this.limit = newLimit

        // 3.遍历oldStorage中所有的bucket
        for (let i = 0; i < oldStorage.length; i++) {
            // 3.1 取出对应的bucket
            let bucket = oldStorage[i]

            // 3.2 判断bucket是否为null
            if (bucket == null) {
                continue
            }

            // 3.3 bucket中有数据，那么取出数据，重新插入
            for (var j = 0; j < bucket.length; j++) {
                let tuple = bucket[j]
                this.put(tuple[0], tuple[1])
            }
        }
    }


    // 判断某个数字是否是质数
    hashTable.prototype.isPrime = function (num) {
        if (num <= 1) {
            return false
        }

        // 1.获取num的平方根:Math.sqrt(num)
        let temp = parseInt(Math.sqrt(num))

        // 2.循环判断
        for (let i = 2; i <= temp; i++) {
            if (num % i == 0) {
                return false
            }
        }
        return true
    }

    // 获取质数的方法,getPrime(num) 根据传入的 num获取最临近的质数
    hashTable.prototype.getPrime = function (num) {
        // 7*2=14,+1=15,+1=16,+1=17(质数)
        while (!this.isPrime(num)) {
            num++
        }
        return true
    }
}


// 测试代码
// 1.创建哈希表
let ht = new hashTable()

// 2.插入数据
ht.put('abc', 2)
ht.put('bcd', 5)
ht.put('nba', 1)
ht.put('mba', 3)
ht.put('cba', 7)
console.log(ht)

// 3.获取操作
console.log(ht.get('abc'));
console.log(ht.get('nba'));
console.log(ht.get('cba'));

// 4.删除操作
console.log(ht.remove('nba')); // 1
console.log(ht.get('nba')); // null

// 5.其他方法
console.log(ht.isEmpty()) //false
console.log(ht.size()) // 4