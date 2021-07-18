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


    // (1)append() 往链表尾部追加数据
    LinkedList.prototype.append = function (data) {
        // 1.创建新节点
        var newNode = new Node(data);

        // 2.判断是否添加的是第一个节点
        if (this.length === 0) {
            // 2.1 是第一个节点
            this.head = newNode
        } else {
            // 2.2 不是第一个节点
            var current = this.head
            // 当 current.next 不为空时，循序依次找最后一个节点，即节点的 next 为 null 时
            while (current.next != null) {
                current = current.next
            }

            // 最后一个节点的 next 指向新节点
            current.next = newNode;
        }

        // 3、追加完新节点后，链表长度 + 1
        this.length += 1;
    }


    // (2)toString()方法
    LinkedList.prototype.toString = function () {
        // 1.定义变量
        var current = this.head
        var listString = ""

        // 2.遍历所有的节点，拼接为字符串，直到节点为 null
        while (current) {
            listString += current.data + " "
            current = current.next
        }
        return listString
    }


    // (3)insert()方法
    LinkedList.prototype.insert = function (position, data) {
        // position 新插入节点的位置
        // position = 0 表示新插入后是第一个节点
        // position = 1 表示新插入后是第二个节点，以此类推

        // 1.对 position 进行越界判断，不能小于 0 或大于链表长度
        if (position < 0 || position > this.length) return false;

        // 2.根据data创建新节点
        var newNode = new Node(data);

        // 3.判断插入的节点是否是第一个
        if (position === 0) { // position = 0 的情况
            // 让新节点的 next 指向 原来的第一个节点，即 head
            newNode.next = this.head;

            // head 赋值为 newNode
            this.head = newNode;
        } else { // 0 < position <= length 的情况

            // 初始化一些变量
            var current = this.head; // 当前节点初始化为 head
            var previous = null; // head 的 上一节点为 null
            var index = 0; // head 的 index 为 0

            // 在 0 ~ position 之间遍历，不断地更新 current 和 previous
            // 直到找到要插入的位置
            while (index++ < position) {
                previous = current;
                current = current.next;
            }

            // 在当前节点和当前节点的上一节点之间插入新节点，即它们的改变指向
            newNode.next = current;
            previous.next = newNode;
        }
        // 4.更新链表长度
        this.length += 1;
        return newNode;
    }


    // (4)get()方法
    LinkedList.prototype.get = function (position) {
        // 1.越界判断
        if (position < 0 || position >= this.length) return null

        // 2.获取对应的data
        var current = this.head
        var index = 0
        // position = 2
        // index=0 current=1
        // index=1 current=2
        // index=2
        while (index++ < position) {
            current = current.next
        }
        return current.data
    }

    // (5)indexOf()方法
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


    // (6)update()方法
    LinkedList.prototype.update = function (position, newData) {
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


    // (7)removeAt()方法
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


    // (8)remove()方法
    LinkedList.prototype.remove = function (data) {
        // 1.获取data在列表中的位置
        var position = this.indexOf(data)

        // 2.根据位置信息，删除节点
        return this.removeAt(position)
    }


    // (9)isEmpty()方法
    LinkedList.prototype.isEmpty = function () {
        return this.length == 0
    }


    // （10）size()方法
    LinkedList.prototype.size = function () {
        return this.length
    }
}





// 测试代码
// 1.创建LinkedList
var list = new LinkedList;

// 测试append()方法
list.append('abc');
list.append('cba');
list.append('nba');
console.log(list);

// 测试 insert 方法
list.insert(0, "123");
list.insert(2, "456");
console.log(list.toString()); // 123 abc 456 cba nba 

// 测试get()方法
console.log(list.get(0))
console.log(list.get(3))
console.log(list.get(5))

// 测试indexOf()方法
console.log(list.indexOf('abc'));
console.log(list.indexOf('nba'))

// 测试upDate()方法
list.update(0, 'mmm')
list.update(3, 'ccc')
console.log(list.toString());

// 测试removwAt()方法
list.removeAt(0);
list.removeAt(2);
console.log(list.toString());

// 测试remove()方法
list.remove('456')
console.log(list.toString())

// 测试isEmpty()方法
console.log(list.isEmpty())

// 测试size()方法
console.log(list.size())