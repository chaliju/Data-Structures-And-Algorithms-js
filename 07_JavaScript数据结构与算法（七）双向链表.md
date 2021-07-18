# JavaScript 数据结构与算法（七）双向链表

## 单向链表和双向链表

### 单向链表

- 只能从头遍历到尾或者从尾遍历到头（一般从头到尾）。
- 链表相连的过程是单向的，实现原理是上一个节点中有指向下一个节点的引用。
- 单向链表有一个比较明显的缺点：可以轻松到达下一个节点，但回到前一个节点很难，在实际开发中, 经常会遇到需要回到上一个节点的情况。

### 双向链表

- 既可以**从头遍历到尾**，也可以**从尾遍历到头**。
- 链表相连的过程是**双向**的。实现原理是一个节点**既有向前连接的引用**，也有一个**向后连接的引用**。
- 双向链表可以有效的解决单向链表存在的问题。
- 双向链表缺点：
  - 每次在**插入或删除**某个节点时，都需要处理四个引用，而不是两个，实现起来会困难些。
  - 相对于单向链表，所占**内存空间更大**一些。
  - 但是，相对于双向链表的便利性而言，这些缺点微不足道。

## 双向链表结构

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.3xy769h90v20.png)

- 双向链表不仅有 head 指针指向第一个节点，而且有 tail 指针指向最后一个节点。
- 每一个节点由三部分组成：item 储存数据、prev 指向前一个节点、next 指向后一个节点。
- 双向链表的第一个节点的 prev 指向 null。
- 双向链表的最后一个节点的 next 指向 null。

## 双向链表常见的操作

- `append(element)` ：向链表尾部追加一个新元素。
- `insert(position, element)` ：向链表的指定位置插入一个新元素。
- `getElement(position)` ：获取指定位置的元素。
- `indexOf(element)` ：返回元素在链表中的索引。如果链表中没有该元素就返回 -1。
- `update(position, element)` ：修改指定位置上的元素。
- `removeAt(position)` ：从链表中的删除指定位置的元素。
- `remove(element)` ：从链表删除指定的元素。
- `isEmpty()` ：如果链表中不包含任何元素，返回 `trun`，如果链表长度大于 0 则返回 `false`。
- `size()` ：返回链表包含的元素个数，与数组的 `length` 属性类似。
- `toString()` ：由于链表项使用了 Node 类，就需要重写继承自 JavaScript 对象默认的 `toString` 方法，让其只输出元素的值。
- `forwardString()` ：返回正向遍历节点字符串形式。
- `backwordString()` ：返回反向遍历的节点的字符串形式。

## 双向链表的封装

### 创建双向链表类 DoublyLinkedList

- 首先创建一个大的构造函数，用于存放双向链表的一些属性和方法。
- 双向链表的每一个元素都有三个属性，即`prev` 、`item` 和 `next`，分别表示该元素的前一个元素是谁 、存储着该元素的值和该元素的后一个元素是谁。所以我们就在双向链表的构造函数内部创建一个内部构造函数用于之后创建元素的实例对象。

```js
function DoublyLinkedList() {
    // 属性
    this.head = null
    this.tail = null
    this.length = 0
    
    // 内部类：双向链表的节点类，用于之后创建元素的实例对象
    function Node(data) {
        this.data = data
        this.prev = null
        this.next = null
    }
}
```

### append(element)

#### 代码实现

**实现思路：**

1. 创建新元素的实例对象 `newNode`
2. 判断双向链表内有无元素，若没有元素，则将属性 `head` 和 属性 `tail` 都指向 `newNode`，最后属性 `length + 1`
3. 若双向链表中有元素了，则因为双向链表内多了一个指针 `tail`，所以我们要实现 `append()`方法也就方便了很多，只需要将 `tail` 指向 `newNode`，然后将原本的末尾元素 `old_node` 的 `next` 指向 `newNode`，并将 `newNode` 的 `prev`属性指向 `old_node`即可，然后属性 `length + 1`

```js
// append(element) 往双向链表尾部追加一个新的元素
DoublyLinkedList.prototype.append = function (data) {
    //1.根据data创建新节点
    let newNode = new Node(data)

    //2.添加节点
    //2.1 添加的是第一个节点
    if (this.length == 0) {
        this.tail = newNode
        this.head = newNode
        //2.2 添加的不是第一个节点
    } else {
        newNode.prev = this.tail
        this.tail.next = newNode
        this.tail = newNode
    }

    //3.length+1
    this.length += 1
}
```

**过程详解：**

添加节点时分为多种情况：

- 情况1：添加的是第一个节点：只需要让head和tail都指向新节点即可；

  ![image-20210519183404709](C:\Users\chaliju\AppData\Roaming\Typora\typora-user-images\image-20210519183404709.png)

- 情况2：添加的不是第一个节点，如下图所示：只需要改变相关引用的指向即可。

  - 通过：newNode.prev = this.tail：建立指向1；
  - 通过：this.tail.next = newNode：建立指向2；
  - 通过：this.tail = newNode：建立指向3

  要注意改变变量指向的顺序，最后修改tail指向，这样未修改前tail始终指向原链表的最后一个节点。

![image-20210519183436831](C:\Users\chaliju\AppData\Roaming\Typora\typora-user-images\image-20210519183436831.png)

![image-20210519183517071](C:\Users\chaliju\AppData\Roaming\Typora\typora-user-images\image-20210519183517071.png)

#### 测试代码

```javascript
// 创建双向链表
var list = new DoublyLinkedList()

// 1.测试append()方法
list.append('abc')
list.append('def')
list.append('nba')
console.log(list)
```

### toString()方法汇总

#### 代码实现

```javascript
// 2.将链表转换为字符串形式
// 2-1 toString()方法
DoublyLinkedList.prototype.toString = function () {
    return this.backwardString()
}

// 2-2 forwardString()方法 链表数据从前往后以字符串形式返回
DoublyLinkedList.prototype.forwardString = function () {
    // 1.定义变量
    var current = this.tail
    var resultString = ""

    // 2.依次向前遍历，获取每一个节点
    while (current) {
        resultString += current.data + "--"
        current = current.prev
    }
    return resultString
}

// 2-3 backwardString()方法 链表数据从后往前以字符串形式返回
DoublyLinkedList.prototype.backwardString = function () {
    // 1.定义变量
    var current = this.head
    var resultString = ""

    // 2.依次向后遍历，获取每一个节点
    while (current) {
        resultString += current.data + "--"
        current = current.next
    }
    return resultString
}
```

**过程详解：**

三种获取字符串的方法：**toString（）**、**forwardString（）**、**backwardString（）**实现原理相似，仅以backWardString方法为例：

- 定义current变量记录当前指向的节点。首先让current指向第一个节点，然后通过 current = current.next 依次向后遍历。在while循环中以(current)作为条件遍历链表，只要current ！=  null就一直遍历，由此可获取链表所有节点的数据。

![image-20210519184022408](C:\Users\chaliju\AppData\Roaming\Typora\typora-user-images\image-20210519184022408.png)

#### 测试代码

```javascript
console.log(list.toString())
console.log(list.backwardString())
console.log(list.forwardString())
```

### insert(position, element)

`insert()`方法就是在指定的索引位置插入元素。一共需要传入两个参数，第一个是 `position`，表示需要插入元素的位置；第二个参数是 `item`，表示元素的值

#### 代码实现

**实现思路：**

1. 创建新的元素实例对象 `node`
2. 判断指定的索引位置 `position` 是否越界，即是否小于0，或者大于双向链表的长度。若越界了，则直接返回false
3. 判断 `position` 是否为0。若为0，则直接将双向链表原本的第一个元素 ，也就是 `head`所对应的元素 `old_node` 赋值给 `node`的 `next`属性，再将 `node` 赋值给 `old_node` 的 `prev` 属性，然后将 `node`赋值给 `head`，表示现在链表的第一个元素为 `node`
4. 若 `position` 不为0，则遍历双向链表，同时记录遍历的索引 `index` 、遍历的上一个元素 `prev` 和在 `index`索引位置上的元素 `current`，当 `index == position`时，将 `node`赋值给 `prev`的 `next`属性，将 `current` 赋值给 `node`的 `next`属性，再将 `prev` 赋值给 `node` 的 `prev` 属性，最后将 `node` 赋值给 `current` 的 `prev` 属性
5. 属性 `length + 1`

```js
// 3.insert()方法
DoublyLinkedList.prototype.insert = function (position, data) {
    // 1.越界判断
    if (position < 0 || position > this.length) return false

    // 2.根据data创建新的节点
    var newNode = new Node(data)

    // 3.判断原来的链表是否为空
    if (this.length == 0) {
        this.head = newNode;
        this.tail = newNode;
    } else {
        // 3.1 position == 0
        if (position == 0) { // 在第 0 个位置插入
            this.head.prev = newNode
            newNode.next = this.head
            this.head = newNode
            // 3.2 position == this.length
        } else if (position == this.length) { // 在最后一个位置插入
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
            // 3.3 其他情况
        } else {
            // 在 0 ~ this.length 位置中间插入
            var current = this.head
            var index = 0

            while (index++ < position) {
                current = current.next
            }

            // 修改指针
            newNode.next = current
            newNode.prev = current.prev
            current.prev.next = newNode
            current.prev = newNode
        }
    }
    // 4.length+1
    this.length += 1

    return true
    // 返回true表示插入成功
}
```

**过程详解：**

插入节点可分为多种情况：

**当原链表为空时**：

- 情况1：插入的新节点是链表的第一个节点；只需要让head和tail都指向newNode即可。

![image-20210519184543384](C:\Users\chaliju\AppData\Roaming\Typora\typora-user-images\image-20210519184543384.png)

**当原链表不为空时**：

- 情况2：当position == 0，即在链表的首部添加节点：如下图所示：

![image-20210519184612808](C:\Users\chaliju\AppData\Roaming\Typora\typora-user-images\image-20210519184612808.png)

首先，通过：this.head.prev = newNode，改变指向1；

然后，通过：newNode.next = this.head，改变指向2；

最后，通过：this.head = newNode，改变指向3；

![image-20200228110014565](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/11.png)

- 情况3：position == this.length，即在链表的尾部添加节点，如下图所示：

![image-20200228105207102](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/12.png)

首先，通过：this.tail.next = newNode，改变指向1；（注意这里使用this.tail指向原链表最后一个节点，而不是this.head。因为当length>1时，this.head != this.tail。）

然后，通过：newNode.prev = this.tail，改变指向2；

最后，通过：this.tail = newNode，改变指向3；

![image-20200228110745214](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/13.png)

- 情况4：0 < position < this.length，即在链表的中间插入新节点，假设在position = 1的位置插入，如下图所示：

![image-20200228112941682](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/14.png)

首先，需要定义变量current按照之前的思路，通过while循环找到position位置的后一个节点，循环结束后index = position

![image-20200228113257650](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/15.png)

如下图所示：当position =  1时，current就指向了Node2。这样操作current就等同于间接地操作Node2，还可以通过current.prev间接获取Node1。得到了newNode的前一个节点和后一个节点就可以通过改变它们的prev和next变量的指向来插入newNode了。

![image-20200228120701923](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/16.png)

通过：newNode.next = current，改变指向1；

通过：newNode.prev = current.prev，改变指向2；

通过：current.prev.next = newNode，改变指向3；

> 注意必须最后才修改current.prev的指向，不然就无法通过current.prev获取需要操作的Node1了。

通过：current.prev = newNode，改变指向4；

![image-20200228124931441](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/17.png)

#### 测试代码

```javascript
list.insert(0, 'aaa')
list.insert(4, 'bbb')
list.insert(2, 'ccc')
console.log(list.toString()) // aaa--abc--ccc--def--nba--bbb--
```

### get(position)

`get()`方法就是获取对应位置上的元素。需要传入一个参数，即 `position`，表示需要获取元素的索引

#### 代码实现

**实现思路：**

1. 判断 `position` 是否越界。若越界，则直接返回false
2. 遍历链表，同时记录当前索引 `index`，当 `index == position`时，返回当前位置上的元素

```javascript
DoublyLinkedList.prototype.get = function (position) {
    // 1.越界判断
    if (position < 0 || position >= this.length) return null

    /* 
    // 这种方法效率较低
    // 2.获取元素
    var current = this.head
    var index = 0

    while (index++ < position) {
        current = current.next
    }
    return current.data */

    //2.获取元素
    let current = null
    let index = 0
    //this.length / 2 > position:从头开始遍历
    if ((this.length / 2) > position) {
      current = this.head
      while(index++ < position){
      current = current.next
    }
    //this.length / 2 =< position:从尾开始遍历
    }else{
      current = this.tail
      index = this.length - 1
      while(index-- > position){
      current = current.prev
    }
    }
    return current.data
}
```

**过程详解：**

定义两个变量current和index，按照之前的思路通过while循环遍历分别获取当前节点和对应的索引值index，直到找到需要获取的position位置s后的一个节点，此时index = pos =x，然后return current.data即可。

如果链表的节点数量很多时，这种查找方式效率不高，改进方法为：

> 一定要通过this.length来获取链表的节点数否则就会报错。

- 当this.length / 2 > position：从头（head）开始遍历；
- 当this.length / 2 < position：从尾（tail）开始遍历；

![image-20200228144005347](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/20.png)

#### 测试代码

```javascript
console.log(list.get(0))	// aaa
console.log(list.get(3))	// def
console.log(list.get(5))	// bbb
```

### indexOf()

`indexOf()`方法就跟数组的一样，获取某元素在双向链表中的索引值，若双向链表中不存在该元素，则返回 `-1`。

#### 代码实现

```javascript
// 5.indexOf()方法
DoublyLinkedList.prototype.indexOf = function(data){
    // 1.定义变量
    let current = this.head
    let index = 0

    // 2.遍历链表，查找与data相同的节点
    while(current){
        if (current.data == data) {
        return index
        }
        current = current.next
        index += 1
    }
    return -1
}
```

**过程详解：**

以（current）作为条件，通过while循环遍历链表中的所有节点（停止条件为current = null）。在遍历每个节点时将current指向的当前节点的data和传入的data进行比较即可。

#### 测试代码

```javascript
console.log(list.indexOf('aaa'))	// 0
console.log(list.indexOf('nba'))	// 4
console.log(list.indexOf('ddd'))	// -1
```

### update(position, data)

`update()`方法就是用于修改双向链表中某位置上的元素的值。因此该方法需要传入两个参数，第一个参数是 `position`，表示需要修改的元素的索引；第二个参数是 `NewItem`，表示修改后的值

#### 代码实现

```js
// 6.update()方法
DoublyLinkedList.prototype.update = function (position,newData) {
    // 1.越届判断
    if (position < 0 || position >= this.length) return false

    /* 
    // 2.寻找正确的节点
    var current = this.head
    var index = 0
    while (index++ < position) {
        current = current.next
    }  */

    // 更高效的方法
    //2.寻找正确的节点
    let current = this.head
    let index = 0
    //this.length / 2 > position:从头开始遍历
    if (this.length / 2 > position) {
        while(index++ < position){
        current = current.next
    }
    //this.length / 2 =< position:从尾开始遍历
    }else{
        current = this.tail
        index = this.length - 1
        while (index -- > position) {
            current = current.prev
        }
    }

    // 3.修改找到节点的date信息
    current.data = newData
    return true
}
```

**过程详解：**

以（index++ < position）为条件，通过while循环遍历链表中的节点（停止条件为index = position）。循环结束后，current指向需要修改的节点。

#### 测试代码

```javascript
list.update(0, 'nnn')
list.update(3, 'mmm')
console.log(list.toString())	// nnn--abc--ccc--mmm--nba--bbb--
```

### removeAt(position)

`removeAt()`方法就是用于移除双向链表中某位置上的某元素。该方法只需要传入一个参数 `position`，表示需要移除元素的索引

#### 代码实现

**实现思路：**

1. 先判断 `position` 是否越界，若越界了，则直接返回 `false` 表示移除元素失败
2. 若没有越界，则判断 `position` 是否为 `0`，若等于 `0`，则直接将第一个链表的 `next` 值赋值给 `head`，然后 `length - 1`
3. 若 `position` 不等于 `0`而等于 `length - 1`，则将末尾元素的前一个元素，即 `tail` 的 `prev`对应的元素的 `next` 属性设置成 `null`，并将 `tail` 指向当前 `tail` 的 `prev`，最后 `length - 1`
4. 若 `position` 既不等于 `0`，又不等于 `length - 1`，则遍历双向链表，同时记录当前索引 `index`，遍历的当前元素 `current`，`current`的上一个元素 `prev`
5. 当 `index === position`时，将 `current` 的下一个元素，即 `current` 的 `next` 属性值赋值给 `prev` 的 `next` 属性，同时将 `current` 的下一个元素的 `prev` 的 `prev` 属性设置成 `prev`，最后 `length - 1`

```js
// removeAt() 删除指定位置的节点
DoublyLinkedList.prototype.removeAt = function (position) {
    // 1.越界判断
    if (position < 0 || position >= this.length) return null

    // 2.删除节点
    // 当链表中length == 1
    // 2.1 链表只有一个节点
    let current = this.head // 定义在最上面方便以下各种情况返回current.data
    if (this.length == 1) {
        this.head = null
        this.tail = null
        // 当链表中length > 1
    } else {
        // 2.2 删除第一个节点
        if (position == 0) {
            this.head.next.prev = null
            this.head = this.head.next
            // 2.3 删除最后一个节点
        } else if (position == this.length - 1) {
            current = this.tail // 该情况下返回被删除的最后一个节点
            this.tail.prev.next = null
            this.tail = this.tail.prev
        } else {
            // 2.4 删除链表中间的节点
            let index = 0
            // current = this.head  提取定义到最上面

            while (index++ < position) {
                current = current.next
            }
            current.next.prev = current.prev
            current.prev.next = current.next
        }
    }

    // 3.length-1
    this.length -= 1
    return current.data // 返回被删除节点的数据
}
```

**过程详解：**

删除节点时有多种情况：

**当链表的length = 1时**：

- 情况1：删除链表中的所有节点：只需要让链表的head和tail指向null即可。

![image-20200228153331976](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/26.png)

**当链表的length > 1时**：

- 情况2：删除链表中的第一个节点：

  通过：this.head.next.prev = null，改变指向1；

  通过：this.head = this.head.next，改变指向2；

  虽然Node1有引用指向其它节点，但是没有引用指向Node1，那么Node1会被自动回收。

![image-20200228162347115](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/27.png)

- 情况3：删除链表中的最后一个节点：

  通过：this.tail.prev.next = null，修改指向1；

  通过：this.tail = this.tail.prev，修改指向2；

![image-20200228161946691](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/28.png)

- 情况4：删除链表中间的节点：

通过while循环找到需要删除的节点，比如position = x，那么需要删除的节点就是Node(x+1)，如下图所示：

![image-20200228161648125](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/29.png)

通过：current.next.prev = current.prev，修改指向1；

通过：current.prev.next = current.next，修改指向2；

这样就没有引用指向Node(x+1)了（current虽指向Node(x+1)，但current时临时变量，该方法执行完就会被销毁），随后Node(x+1)就会被自动删除。

![image-20200228162415044](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/30.png)

#### 测试代码

```javascript
list.removeAt(1)
list.removeAt(3)
console.log(list.toString())	// nnn--ccc--mmm--bbb--
```

### remove(data)

`remove()`方法就是用于移除双向链表链表中的某元素，并返回被删除元素所在的索引位置，若链表中没有对应元素，则返回 `false` 。该方法需要传入一个参数 `data`用于查找链表中对应的元素

#### 代码实现

**实现思路：**

1. 利用上面封装的 `indexOf()`方法，将 `data` 作为参数传入，获取到 `data` 在链表中的索引 `index` 。
2. 再利用上面封装的 `removeAt()`方法，将 `index` 作为参数传入，就可以实现 `remove()`方法的功能了。

```javascript
// 8.remove()方法
DoublyLinkedList.prototype.remove = function (data) {
    // 1.获取data获取下下标值
    var index = this.indexOf(data)

    // 2.根据index删除对应位置的节点
    return this.removeAt(index)
}
```

#### 测试样例

```javascript
list.remove('bbb')
list.remove('ccc')
console.log(list.toString())	// nnn--mmm--
```

### 其他方法

`isEmpty()`方法就是判断双向链表中是否有元素。若有元素，则返回 `false`；反之，返回 `true`。该方法的实现思路很简单，直接判断属性 `length` 是否等于 `0` 就可以了。

`szie()`方法就是返回链表内的元素个数。



#### 代码实现

```javascript
// 9.isEmpty()方法
DoublyLinkedList.prototype.isEmpty = function () {
    return this.length
}

// 10.size()方法
DoublyLinkedList.prototype.size = function () {
    return this.length
}

// 11.getHead方法：获取链表的第一个元素
DoublyLinkedList.prototype.getHead = function () {
    return this.head.data
}

// 12.getTail方法：获取链表的最后一个元素
DoublyLinkedList.prototype.getTail = function () {
    return this.tail.data
}
```

#### 测试样例

```javascript
console.log(list.isEmpty())		// 2
console.log(list.size())		// 2
console.log(list.getHead())		// nnn
console.log(list.getTail())		// mmm
```

## 链表结构总结

单向链表有head和next两个属性，双向链表有head、tail、next、prev四个属性。处理好它们的指向，相当于将它们正确地连接在一起，这样就组成了一条链，这就是简单链表的实现。

在实际开发中链表使用得非常多，比如Java中的**LinkList**就是双向链表。

### 注意点

- 在链表中current = current.next 可以从左往右看，看成是current --> current.next，即current指向current的下一个节点。
- 删除节点的原理：只要没有引用指向该对象，无论该对象是否有引用指向其他对象，该对象都会被回收（删除）。
- 参数中凡是有position的都要进行越界判断。

### 链表的增删改查

以双向链表为例：**链表的增删改查无非就是获取链表中相应的节点改变其中的prev和next两个变量的指向**。

- **情况一**：只需要**head**和**tail**两个变量就可以获取需要操作的变量（这里指的是能够轻松获取，当然你想通过head.next.next...或tail.prev.prev...来获取想要的节点也可以），在这种情况下链表的长度length：**0  <= length <=2**。
- **情况二**：不能靠tail和head来获取到需要操作的变量时，可采用while循环遍历的方式，找到需要操作的节点：

![image-20200228113257650](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/33.png)

在这种情况下，如果我们想要在链表的position =  x的位置插入新节点，那么可以通过current获取position的后一个节点Node(x+1)，通过current.prev获取position位置的前一个节点Node(x)；之后修改Node(x+1)和Node(x)中的prev和next两个变量的指向即可在pos=x 的位置插入新节点。

![image-20200228133450822](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/34.png)

### 修改链表引用指向

**应先修改newNode引用的指向，再修改其他引用**

- 情况1：通过head和tail引用就能获取需要操作的节点时，最后更改head或tail变量的指向（因为它们分别指向链表的第一个和最后一个节点，获取其他节点时可能需要用到它们）。

  

- 情况2：使用current获取到需要操作的节点时，最后更改curren.next或current.prev的指向。因为current.next和current.prev表示的是Node(x+2)和Node(x)这两个节点，如下图所示，一旦变更它们的指向就无法获取Node(x)或Node(x+2)了，

![image-20200228133725909](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/35.png)

### 遍历链表

**积累两种遍历思路**

- 获取指定的position = x 位置的后一个节点和索引值：

![image-20200228144005347](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/36.png)

![image-20200228113257650](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/37.png)

循环结束后index = position = x，变量current就指向了Node(x+1)，变量index的值为Node(x+1)的索引值x。

- 遍历链表中的所有节点：

![image-20200228132334514](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/38.png)

![image-20200228145930043](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/39.png)

当current.next = null时停止循环，此时current指向链表的最后一个节点。

