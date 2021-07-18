# JavaScript 数据结构与算法（四）队列

## 认识队列

队列（Queue）是一种运算受限的线性表，特点：**先进先出**。(FIFO：First In First Out)

**受限之处：**

- 只允许在表的**前端**（front）进行**删除**操作。
- 只允许在表的**后端**（rear）进行**插入**操作。

生活中类似队列结构的场景：

- 排队，比如在电影院，商场，甚至是厕所排队。
- 优先排队的人，优先处理。 (买票、结账、WC)。

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.5mmiw2kdwbs0.png)

### 队列图解

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.mq92bw3am0g.png)

### 队列在程序中的应用

- 打印队列：计算机打印多个文件的时候，需要排队打印。
- 线程队列：当开启多线程时，当新开启的线程所需的资源不足时就先放入线程队列，等待 CPU 处理。

## 队列的实现

队列的实现和栈一样，有两种方案：

- 基于数组实现。
- 基于链表实现。

### 队列常见的操作

- `enqueue(element)` ：向队列尾部添加一个（或多个）新的项。
- `dequeue()` ：移除队列的第一（即排在队列最前面的）项，并返回被移除的元素。
- `front()` ：返回队列中的第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息与 Stack类的 peek 方法非常类似）。
- `isEmpty()` ：如果队列中不包含任何元素，返回 true，否则返回 false。
- `size()` ：返回队列包含的元素个数，与数组的 length 属性类似。
- `toString()`： 将队列中的内容，转成字符串形式。

### 代码实现

```js
// 封装队列
function Queue() {
    // 属性
    this.items = [];

    // 方法
    // 1.enqueue(item) 入队，将元素加入到队列中
    Queue.prototype.enqueue = function (item) {
        this.items.push(item);
    }

    // 2.dequeue() 出队，从队列中删除队头元素，返回删除的那个元素
    Queue.prototype.dequeue = function () {
        return this.items.shift();
    }

    // 3.front() 查看队列的队头元素
    Queue.prototype.front = function () {
        return this.items[0];
    }

    // 4.isEmpty() 查看队列是否为空
    Queue.prototype.isEmpty = function () {
        return this.items.length === 0;
    }

    // 5.size() 查看队列中元素的个数
    Queue.prototype.size = function () {
        return this.items.length;
    }

    // 6.toString() 将队列中的元素以字符串形式返回
    Queue.prototype.toString = function () {
        var result = "";
        for (var i = 0; i < this.items.length; i++) {
            result += this.items[i] + " ";
        }
        return result;
    }
}
```

### 测试代码

```js
var queue = new Queue();

// enqueue() 测试
queue.enqueue("a");
queue.enqueue("b");
queue.enqueue("c");
queue.enqueue("d");
console.log(queue.items); //--> ["a", "b", "c", "d"]

// dequeue() 测试
queue.dequeue();
queue.dequeue();
console.log(queue.items); //--> ["c", "d"]

// front() 测试
console.log(queue.front()); //--> c

// isEmpty() 测试
console.log(queue.isEmpty()); //--> false

// size() 测试
console.log(queue.size()); //--> 2

// toString() 测试
console.log(queue.toString()); //--> c d
```

## 队列的应用

使用队列实现小游戏：**击鼓传花**。

分析：传入一组数据集合和设定的数字 number，循环遍历数组内元素，遍历到的元素为指定数字 number 时将该元素删除，直至数组剩下一个元素。

### 代码实现

```js
// 队列算法题：击鼓传花
function passGame(nameList, num) {
    // 1.创建一个队列结构
    var queue = new Queue()

    // 2.将所有人一次加入到队列中
    for (var i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[i])
    }
    // 3.开始数数字，不是num的时候，重新加入到队列末尾，是num的时候，将其从队列中删除
    // 队列中只剩下 1 个元素时就停止数数
    while (queue.size() > 1) {
        // 3.1 num数字之前的人重新放到队列的末尾
        for (var i = 0; i < num - 1; i++) {
            queue.enqueue(queue.dequeue())
        }
        // 3.2 num对应这个人，直接从队列中删除
        // 由于队列没有像数组一样的下标值不能直接取到某一元素，所以把 num前面的 num - 1 个元素先删除后添加到队列末尾，
        // 这样第 number 个元素就排到了队列的最前面，可以直接使用 dequeue 方法进行删除
        queue.dequeue()
    }

    // 4.获取剩下的那个人
    console.log(queue.size());
    var endName = queue.front()
    console.log('最终剩下的人：' + endName);
    
    // 5.返回这个人在原数组中对应的索引
    return nameList.indexOf(endName);
}
```

### 测试代码

```js
// passGame() 测试
var names = ["lily", "lucy", "tom", "tony", "jack"];
var targetIndex = passGame(names, 4);
console.log("击鼓传花", names[targetIndex]); //--> lily
```