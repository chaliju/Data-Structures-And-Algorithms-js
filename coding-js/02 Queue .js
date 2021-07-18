// 封装队列
function Queue() {
    // 属性
    this.items = [];

    // enqueue(item) 入队，将元素加入到队列中
    Queue.prototype.enqueue = function (item) {
        this.items.push(item);
    }

    // dequeue() 出队，从队列中删除队头元素，返回删除的那个元素
    Queue.prototype.dequeue = function () {
        return this.items.shift();
    }

    // front() 查看队列的队头元素
    Queue.prototype.front = function () {
        return this.items[0];
    }

    // isEmpty() 查看队列是否为空
    Queue.prototype.isEmpty = function () {
        return this.items.length === 0;
    }

    // size() 查看队列中元素的个数
    Queue.prototype.size = function () {
        return this.items.length;
    }

    // toString() 将队列中的元素以字符串形式返回
    Queue.prototype.toString = function () {
        var result = "";
        for (var i = 0; i < this.items.length; i++) {
            result += this.items[i] + " ";
        }
        return result;
    }
}


// 使用队列
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
    var endName = queue.front()

    // 5.返回这个人在原数组中对应的索引
    return nameList.indexOf(endName);
}


// 测试击鼓传花
names = ['lily', 'lucy', 'tom', 'bob', 'juny']
var targetIndex = passGame(names, 3)
console.log(targetIndex)