# JavaScript 数据结构与算法（六）单向链表

## 认识链表

### 链表和数组

链表和数组一样，可以用于存储一系列的元素，但是链表和数组的实现机制完全不同。

#### 数组

- 存储多个元素，数组（或列表）可能是最常用的数据结构。
- 几乎每一种编程语言都有默认实现数组结构，提供了一个便利的 `[]` 语法来访问数组元素。

**数组缺点：**

- 数组的创建需要申请一段**连续的内存空间**(一整块内存)，并且大小是固定的，当前数组**不能满足容量需求**时，需要**扩容**。 (一般情况下是申请一个更大的数组，比如 2 倍，然后将原数组中的元素复制过去)
- 在数组开头或中间位置插入数据的成本很高，需要进行大量元素的位移。

#### 链表

- 存储多个元素，另外一个选择就是使用链表。
- 不同于数组，链表中的元素在内存中**不必是连续的空间**。
- 链表的每个元素由一个**存储元素本身的节点**和一个**指向下一个元素的引用**(有些语言称为指针)组成。

**链表优点：**

- 内存空间**不必是连续的**，可以充分利用计算机的内存，实现灵活的**内存动态管理**。
- 链表不必在创建时就**确定大小**，并且大小可以**无限延伸**下去。
- 链表在**插入和删除数据**时，**时间复杂度**可以达到 O(1)，相对数组效率高很多。

**链表缺点：**

- 访问任何一个位置的元素时，需要**从头开始访问**。(无法跳过第一个元素访问任何一个元素)

- 无法通过下标值直接访问元素，需要从头开始一个个访问，直到找到对应的元素。


- 虽然可以轻松地到达**下一个节点**，但是回到**前一个节点**是很难的。

## 单向链表

单向链表类似于火车，有一个火车头，火车头会连接一个节点，节点上有乘客（数据），并且这个节点会连接下一个节点，以此类推。

- 链表的火车结构

  ![链表的火车结构](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.27xtn3c52zwg.png)

- 链表的数据结构

  head 属性指向链表的第一个节点。 
  链表中的最后一个节点指向 `null`。
  当链表中一个节点也没有的时候，head 直接指向 `null`。

  ![链表的数据结构](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.37j1by46a120.png)

- 给火车加上数据后的结构

  ![给火车加上数据后的结构](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.664djiie2t80.png)

### 链表中的常见操作

- `append(element)` ：向链表尾部添加一个新的项。
- `insert(position, element)` ：向链表的特定位置插入一个新的项。
- `get(position)` ：获取对应位置的元素。
- `indexOf(element)` ：返回元素在链表中的索引。如果链表中没有该元素就返回-1。
- `update(position, element)` ：修改某个位置的元素。
- `removeAt(position)` ：从链表的特定位置移除一项。
- `remove(element)` ：从链表中移除一项。
- `isEmpty()` ：如果链表中不包含任何元素，返回 trun，如果链表长度大于 0 则返回 false。
- `size()` ：返回链表包含的元素个数，与数组的 length 属性类似。
- `toString()`： 由于链表项使用了 Node 类，就需要重写继承自 JavaScript 对象默认的 toString 方法，让其只输出元素的值。

首先需要弄清楚：下文中的position指的是两个节点之间，并且与index的关系如下图所示：

![image-20200306101534508](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/4.png)

position的值一般表示position所指位置的下一个节点。当position的值与index的值相等时，比如position = index = 1，那么它们都表示Node2。

## 单向链表的封装

### 创建单向链表类

先创建单向链表类 LinkedList，添加基本属性，再逐步实现单向链表的常用方法。

```js
// 单向链表的封装
function LinkedList() {
    // 内部类：节点类(链表里的节点 Node)
    function Node(data) {
        this.data = data
        this.next = null
    }

    // 属性，初始 head 为 null，head 指向链表的第一个节点
    this.head = null
    // 初始链表长度为 0
    this.length = 0
}
```

### 实现 append() 方法

`append()`方法就是将元素添加到链表的最后一个。

**实现思路：**

1. 创建新的元素实例对象 `node`
2. 判断 `length` 是否为0，若为0，则直接将 `head` 指向 `node`
3. 若 `length` 不为0，则根据每个元素的 `next` 属性遍历链表
4. 若元素的 `next` 的值不等于 `null`，继续遍历
5. 若元素的 `next` 的值等于 `null`，则表示已经查找到链表的最后一个元素，所以直接将该元素的 `next` 值设置成 `node` 即可
6. 属性 `length + 1`

#### 代码实现

```js
// append() 往链表尾部追加数据
LinkedList.prototype.append = function (data) {
    // 1.创建新节点
    var newNode = new Node(data);

    // 2.判断是否添加的是第一个节点
    if (this.length === 0) {
        // 2.1 是第一个节点
        this.head = newNode
     // 2.2 不是第一个节点
    } else {
        // 让变量current指向第一个节点
        var current = this.head
        // 当 current.next 不为空时，循序依次找最后一个节点，直到节点的 next 为 null 时
        while (current.next) {
            current = current.next
        }

        // 最后一个节点的 next 指向新节点
        current.next = newNode;
    }

    // 3、追加完新节点后，链表长度 + 1
    this.length += 1;
}
```

**过程图解**

- 首先让 `current` 指向第一个节点。

  ![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.5iskrdf4nu40.png)

- 通过 `while` 循环使 `current` 指向最后一个节点，最后通过 `current.next = newNode`，让最后一个节点指向新节点 `newNode`。

  ![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.4mw3bx5g80m0.png)

#### 代码测试

```js
var linkedList = new LinkedList();
// 测试 append 方法
linkedList.append("A");
linkedList.append("B");
linkedList.append("C");
console.log(linkedList);
```

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.6kx4qbq8e5c.png)

### 实现 toString() 方法

#### 代码实现

```js
LinkedList.prototype.toString = function () {
    // 1.定义变量
    var current = this.head
    var listString = ""

    // 2.遍历所有的节点，拼接为字符串，直到节点为 null
    while (current) {
        listString += current.data + " "
        current = current.next // 千万不要忘记拼接完一个节点数据之后，让current指向下一个节点
    }
    return listString
}
```

#### 代码测试

```js
// 测试 toString 方法
console.log(linkedList.toString()); //--> AA BB CC
```

### 实现 insert() 方法

`insert()`方法就是在指定的索引位置插入元素。一共需要传入两个参数，第一个是 `position`，表示需要插入元素的位置；第二个参数是 `item`，表示元素的值

**实现思路：**

1. 创建新的元素实例对象 `node`
2. 判断指定的索引位置 `position` 是否越界，即是否小于0，或者大于链表的长度。若越界了，则直接返回false
3. 判断 `position` 是否为0。若为0，则直接将链表原本的第一个元素，也就是 `head`所对应的元素赋值给 `node`的 `next`属性，然后将 `node`赋值给 `head`，表示现在链表的第一个元素为 `node`
4. 若 `position` 不为0，则遍历链表，同时记录遍历的索引 `index` 和遍历的上一个元素 `prev`，当 `index == position`时，将链表在 `index`索引位置上的元素赋值给 `node`的 `next`属性，再将 `node`赋值给 `prev`的 `next`属性
5. 属性 `length + 1`

#### 代码实现

```js
LinkedList.prototype.insert = function (position, data) {
    // position 新插入节点的位置
    // position = 0 表示新插入后是第一个节点
    // position = 1 表示新插入后是第二个节点，以此类推

    // 1.对 position 进行越界判断，不能小于 0 或大于链表长度
    if (position < 0 || position > this.length) return false;

    // 2.根据data创建新节点
    var newNode = new Node(data);

    // 3.插入新节点
    // 3.1 判断插入的节点是否是第一个
    if (position === 0) { // position = 0 的情况
        // 让新节点的 next 指向 原来的第一个节点，即 head
        newNode.next = this.head;
        // 让head指向新节点
        this.head = newNode;
        
        // 3.2 0 < position <= length 的情况
    } else { 
        // 初始化一些变量
        var current = this.head; // 当前节点初始化为 head
        var previous = null; // head 的 上一节点为 null
        var index = 0; // head 的 index 为 0

        // 在 0 ~ position 之间遍历，不断地更新 current 和 previous,直到找到要插入的位置
        // 步骤1：通过while循环使变量current指向position位置的后一个节点(注意while循环的写法)
        while (index++ < position) {
            // 步骤2：在current指向下一个节点之前，让previous指向current当前指向的节点
            previous = current;
            // 步骤3：通过变量current(此时current已经指向position位置的后一个节点)，使newNode指向position位置的后一个节点
            current = current.next;
        }

        // 在当前节点和当前节点的上一节点之间插入新节点，即它们的改变指向
        newNode.next = current;
        // 步骤4：通过变量previous，使position位置的前一个节点指向newNode
        previous.next = newNode;
    }
    /*
        启示：
        1.我们无法直接操作链表中的节点，但是可以通过变量指向这些节点，以此间接地操作节点(替身使者)；
        比如current指向节点3，想要节点3指向节点4只需要：current.next = 4即可。
        2.两个节点间是双向的，想要节点2的前一个节点为节点1，可以通过：1.next=2，来实现；
      */
    
    // 4.更新链表长度
    this.length += 1;
    return true;
}
```

**过程详解：**

inset方法实现的过程：根据插入节点位置的不同可分为多种情况：

- **情况1：position = 0**：

通过： newNode.next = this.head，建立连接1；

通过： this.head = newNode，建立连接2；（不能先建立连接2，否则this.head不再指向Node1）

![image-20200306103312580](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/9.png)

- **情况2：position > 0**：

首先定义两个变量previous和curent分别指向需要插入位置pos = X的前一个节点和后一个节点；

然后，通过：newNode.next = current，改变指向3；

最后，通过：previous.next = newNode，改变指向4；

![image-20200306103541674](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/10.png)

- **情况2的特殊情形：position = length**：

情况2也包含了pos = length的情况，该情况下current和newNode.next都指向null；建立连接3和连接4的方式与情况2相同。

![image-20200306103646576](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/11.png)

#### 代码测试

```js
// 测试 insert 方法
linkedList.insert(0, "123");
linkedList.insert(2, "456");
console.log(linkedList.toString()); //--> 123 AA 456 BB CC
```

### 实现get()方法

`get()`方法就是获取对应位置上的元素。需要传入一个参数，即 `position`，表示需要获取元素的索引

**实现思路：**

1. 判断 `position` 是否越界。若越界，则直接返回false
2. 遍历链表，同时记录当前索引 `index`，当 `index == position`时，返回当前位置上的元素

#### 代码实现

```javascript
LinkedList.prototype.get = function (position) {
    // 1.越界判断
    if (position < 0 || position >= this.length) return null

    // 2.获取指定 position 节点的 data
    var current = this.head
    var index = 0
    // position = 2
    // index=0 current=1
    // index=1 current=2
    // index=2
    while (index++ < position) {
        current = current.next
    }
    // 3.返回 data
    return current.data
}
```

**过程详解：**

get方法的实现过程：以获取position = 2为例，如下图所示：

- 首先使current指向第一个节点，此时index=0；

![image-20200227164308939](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/14.png)

- 通过while循环使current循环指向下一个节点，注意循环终止的条件index++ <  position，即当index=position时停止循环，此时循环了1次，current指向第二个节点(Node2)，最后通过current.data返回Node2节点的数据；

![image-20200227164351066](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/15.png)

#### 代码测试

```javascript
// 测试 getData 方法
console.log(linkedList.getData(0)); //--> 123
console.log(linkedList.getData(1)); //--> AA
```

### 实现 indexOf() 方法

indexOf(data) 返回指定 data 的 index，如果没有，返回 -1。

#### 代码实现

```js
LinkedList.prototype.indexOf = function (data) {
    // 1.定义变量
    var current = this.head
    var index = 0;

    // 2.开始查找
    while (current) {
        if (current.data == data) {
            return index;
        }
        current = current.next
        index += 1;
    }
    return -1
}
```

**过程详解：**

indexOf方法的实现过程：

- 使用变量current记录当前指向的节点，使用变量index记录当前节点的索引值（注意index = node数-1）：

![image-20200227155230599](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/17.png)

#### 代码测试

```js
// 测试 indexOf 方法
console.log(linkedList.indexOf("AA")); //--> 1
console.log(linkedList.indexOf("ABC")); //--> -1
```

### 实现 update() 方法

`update()`方法就是用于修改链表中某位置上的元素的值。因此该方法需要传入两个参数，第一个参数是 `position`，表示需要修改的元素的索引；第二个参数是 `NewItem`，表示修改后的值

这里就简单讲下思路吧，首先要先判断 `position` 是否越界，若越界直接返回 `false`表示修改失败，若没有越界就遍历链表，同时记录当前索引 `index`，当 `index == position`时，就将当前索引位置上的元素的值 `item`修改成 `NewItem`

#### 代码实现

```js
LinkedList.prototype.update=function(position,newData){
    // 涉及到 position 都要进行越界判断
    // 1、position 越界判断
    if (position < 0 || position >= this.length) return false;

    // 2、通过循环遍历，找到指定 position 的节点
    var current = this.head;
    let index = 0;
    while (index++ < position) {
        current = current.next;
    }

    // 3、将position位置的node的data修改为newData
    current.data = newData;
    return current;
}
```

#### 代码测试

```js
// 测试 update 方法
linkedList.update(0, "12345");
console.log(linkedList.toString()); //--> 12345 AA 456 BB CC
linkedList.update(1, "54321");
console.log(linkedList.toString()); //--> 12345 54321 456 BB CC
```

### 实现 removeAt() 方法

`removeAt()`方法就是用于移除链表中某位置上的某元素。该方法只需要传入一个参数 `position`，表示需要移除元素的索引

**实现思路：**

1. 判断 `position` 是否越界，若越界，则直接返回 `false` 表示移除元素失败
2. 若没有越界，判断 `position` 是否等于 `0`，若等于 `0`，则直接将链表第一个元素的 `next` 值赋值给 `head`，然后 `length - 1`
3. 若 `position` 不等于 `0`，则遍历链表，同时记录当前索引 `index`，遍历的当前元素 `current`，`current`的上一个元素 `prev`
4. 当 `index === position`时，则将 `current` 的 `next` 值赋值给 `prev` 的 `next` 值即可，同时 `length - 1`

#### 代码实现

```js
LinkedList.prototype.removeAt = function (position) {
    // 1、position 越界判断
    if (position < 0 || position >= this.length) return null;

    // 2.判断删除的是否是第一个节点
    var current = this.head;
    if (position === 0) {
        // position = 0 的情况
        this.head = this.head.next;
    } else {
        // position > 0 的情况
        // 通过循环遍历，找到指定 position 的节点，赋值到 current
        var index = 0;
        var previous = null;
        while (index++ < position) {
            previous = current;
            current = current.next;
        }
        // 巧妙之处，让上一节点的 next 指向到当前的节点的 next，相当于删除了当前节点。
        previous.next = current.next;
    }
    // 3、更新链表长度 -1
    this.length -= 1;
    return current;
}
```

**过程详解：**

removeAt方法的实现过程：删除节点时存在多种情况：

- **情况1：position = 0**，即移除第一个节点（Node1）。

通过：this.head = this.head.next，改变指向1即可；

虽然Node1的next仍指向Node2，但是没有引用指向Node1，则Node1会被垃圾回收器自动回收，所以不用处理Node1指向Node2的引用next。

![image-20200306110518877](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/20.png)

- **情况2：positon  > 0**，比如pos = 2即移除第三个节点（Node3）。

**注意：**position = length时position后一个节点为null不能删除，因此position != length；

首先，定义两个变量previous和curent分别指向需要删除位置pos = x的前一个节点和后一个节点；

然后，通过：previous.next = current.next，改变指向1即可；

随后，没有引用指向Node3，Node3就会被自动回收，至此成功删除Node3  。

![image-20200306104624457](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8/21.png)

#### 代码测试

```js
// 测试 removeAt 方法
linkedList.removeAt(3);
console.log(linkedList.toString()); //--> 12345 54321 456 CC
```

### 实现 remove() 方法

`remove()`方法就是用于移除链表中的某元素，并返回被删除元素所在的索引位置，若链表中没有对应元素，则返回 `false` 。该方法需要传入一个参数 `data`用于查找链表中对应的元素

**实现思路：**

1. 利用上面封装的 `indexOf()`方法，将 `data` 作为参数传入，获取到 `data` 在链表中的索引 `index` 。
2. 再利用上面封装的 `removeAt()`方法，将 `index` 作为参数传入，就可以实现 `remove()`方法的功能了。

#### 代码实现

```js
LinkedList.prototype.remove=function(data){
    // 1.获取data在列表中的位置
    var position=this.indexOf(data)

    // 2.根据位置信息，删除节点
    return this.removeAt(position)
}
```

#### 代码测试

```js
// 测试 remove 方法
linkedList.remove("CC");
console.log(linkedList.toString()); //--> 12345 54321 456
```

### 实现 isEmpty() 方法

`isEmpty()`方法就是判断链表中是否有元素。若有元素，则返回 `false`；反之，返回 `true`

该方法的实现思路很简单，直接判断属性 `length` 是否等于 `0` 就可以了。

#### 代码实现

```js
LinkedList.prototype.isEmpty = function () {
    return this.length == 0
}
```

#### 代码测试

```js
// 测试 isEmpty 方法
console.log(linkedList.isEmpty()); //--> false
```

### 实现 size() 方法

size() 获取链表的长度。

#### 代码实现

```js
LinkedList.prototype.size = function () {
    return this.length
}
```

#### 代码测试

```js
// 测试 size 方法
console.log(linkedList.size()); //--> 3
```





