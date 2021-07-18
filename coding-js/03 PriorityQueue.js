// 封装优先级队列
function PriorityQueue() {
    // 在PriorityQueue重新创建了一个类：可以理解成内部类，（继承 Queue 类）
    function QueueElement(element, priority) {
        this.element = element
        this.priority = priority
    }
    // 封装属性
    this.items = []

    // 实现enqueue()插入方法
    PriorityQueue.prototype.enqueue = function (element, priority) {
        // 1.根据传入的元素，创建QueueElement对象
        var queueElement = new QueueElement(element, priority)

        // 2.判断队列是否为空
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
                    break
                }
            }

            // 如果遍历完所有元素，优先级都大于新插入的元素，就将新插入的元素插入到最后
            if (!added) {
                this.items.push(queueElement)
            }
        }
    }

    // dequeue() 出队，从队列中删除队头元素，返回删除的那个元素
    PriorityQueue.prototype.dequeue = function () {
        return this.items.shift();
    }

    // front() 查看队列的队头元素
    PriorityQueue.prototype.front = function () {
        return this.items[0];
    }

    // isEmpty() 查看队列是否为空
    PriorityQueue.prototype.isEmpty = function () {
        return this.items.length === 0;
    }

    // size() 查看队列中元素的个数
    PriorityQueue.prototype.size = function () {
        return this.items.length;
    }

    // toString() 将队列中的元素以字符串形式返回
    PriorityQueue.prototype.toString = function () {
        var result = "";
        for (var i = 0; i < this.items.length; i++) {
            result += this.items[i].element + "-" + this.items[i].priority + ' ';
        }
        return result;
    }
}


// 测试代码
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