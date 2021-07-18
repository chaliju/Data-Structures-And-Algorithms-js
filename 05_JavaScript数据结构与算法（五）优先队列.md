# JavaScript 数据结构与算法（五）优先队列

## 场景

生活中类似**优先队列**的场景：

- 优先排队的人，优先处理。 (买票、结账、WC)。
- 排队中，有紧急情况（特殊情况）的人可优先处理。

## 优先队列

优先级队列主要考虑的问题：

- 每个元素不再只是一个数据，还包含优先级。
- 在添加元素过程中，根据优先级放入到正确位置。

## 优先队列的实现

### 代码实现

```js
// 封装优先级队列
function PriorityQueue() {
    // 在PriorityQueue重新创建了一个类：可以理解成内部类；表示带优先级的数据
    function QueueElement(element, priority) {
        this.element = element
        this.priority = priority
    }
    // 封装属性
    this.items = []

    // 1.按照优先级实现enqueue()插入方法
    PriorityQueue.prototype.enqueue = function (element, priority) {
        // 1.1 根据传入的元素，创建QueueElement对象
        var queueElement = new QueueElement(element, priority)

        // 1.2 判断队列是否为空
        if (this.items.length == 0) {
            // 如果为空，不用判断优先级，直接添加
            this.items.push(queueElement)
        } else {
            // 定义一个变量记录是否成功添加了新元素
            var added = false

            for (var i = 0; i < this.items.length; i++) {
                // 让新插入的元素进行优先级比较，priority 值越小，优先级越大
                if (queueElement.priority < this.items[i].priority) {
                    this.items.splice(i, 0, queueElement)
                    added = true
                    // 新元素已经找到插入位置了可以使用break停止循环
                    break
                }
            }

            // 如果遍历完所有元素，优先级都大于新插入的元素，就将新插入的元素插入到最后
            if (!added) {
                this.items.push(queueElement)
            }
        }
    }

    // 2.dequeue() 出队，从队列中删除队头元素，返回删除的那个元素
    PriorityQueue.prototype.dequeue = function () {
        return this.items.shift();
    }

    // 3.front() 查看队列的队头元素
    PriorityQueue.prototype.front = function () {
        return this.items[0];
    }

    // 4.isEmpty() 查看队列是否为空
    PriorityQueue.prototype.isEmpty = function () {
        return this.items.length === 0;
    }

    // 5.size() 查看队列中元素的个数
    PriorityQueue.prototype.size = function () {
        return this.items.length;
    }

    // 6.toString() 将队列中的元素以字符串形式返回
    PriorityQueue.prototype.toString = function () {
        var result = "";
        for (var i = 0; i < this.items.length; i++) {
            result += this.items[i].element + "-" + this.items[i].priority + ' ';
        }
        return result;
    }
}
```

### 测试代码

```js
var pq = new PriorityQueue()

// 入队 enqueue() 测试
pq.enqueue("A", 10);
pq.enqueue("B", 15);
pq.enqueue("C", 11);
pq.enqueue("D", 20);
pq.enqueue("E", 18);
console.log(pq.items);
//--> output:
// QueueElement {element: "A", priority: 10}
// QueueElement {element: "C", priority: 11}
// QueueElement {element: "B", priority: 15}
// QueueElement {element: "E", priority: 18}
// QueueElement {element: "D", priority: 20}

// 出队 dequeue() 测试
pq.dequeue();
pq.dequeue();
console.log(pq.items);
//--> output:
// QueueElement {element: "B", priority: 15}
// QueueElement {element: "E", priority: 18}
// QueueElement {element: "D", priority: 20}

// isEmpty() 测试
console.log(pq.isEmpty()); //--> false

// size() 测试
console.log(pq.size()); //--> 3

// toString() 测试
console.log(pq.toString()); //--> B-15 E-18 D-20
```

### 注意点

**关于数组方法splice用法**：

- splice（1，0，'Tom'）：表示在索引为1的元素前面插入元素’Tom‘（也可以理解为从索引为1的元素开始删除，删除0个元素，再在索引为1的元素前面添加元素'Tom'）；
- splice（1，1，'Tom'）：表示从索引为1的元素开始删除（包括索引为1的元素），共删除1个元素，并添加元素'Tom'。即把索引为1的元素替换为元素'Tom'。

**数组的push方法在数组、栈和队列中的形式：**

- **数组**：在数组[0，1，2]中，pop(3)，结果为[0，1，2，3]；
- **栈**：执行pop(0)，pop(1)，pop(2)，pop(3)，从栈底到栈顶的元素分别为：0，1，2，3；如果看成数组，可写为[0，1，2，3]，但是索引为3的元素3其实是栈顶元素；所以说栈的push方法是向栈顶添加元素（但在数组的视角下为向数组尾部添加元素）；
- **队列**：enqueue方法可以由数组的push方法实现，与数组相同，相当于在数组尾部添加元素。

可以这样想：栈结构是头朝下（索引值由下往上增大）的数组结构。

![image-20200226231025462](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E9%98%9F%E5%88%97/6.png)

