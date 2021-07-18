function DoublyLinkedList() {
    // 内部类：双向链表的节点类
    function Node(data) {
        this.data = data
        this.prev = null
        this.next = null
    }

    // 属性
    this.head = null
    this.tail = null
    this.length = 0


    // 1.append()方法
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

    // 2.将链表转换为字符串形式
    // 2-1 toString()方法
    DoublyLinkedList.prototype.toString = function () {
        return this.backwardString()
    }

    // 2-2 forwardString()方法
    DoublyLinkedList.prototype.forwardString = function () {
        // 1.定义变量
        var current = this.tail
        var resultString = ""

        // 2.依次向前遍历，获取每一个节点
        while (current != null) {
            resultString += current.data + "--"
            current = current.prev
        }
        return resultString
    }

    // 2-3 backwardString()方法
    DoublyLinkedList.prototype.backwardString = function () {
        // 1.定义变量
        var current = this.head
        var resultString = ""

        // 2.依次向后遍历，获取每一个节点
        while (current != null) {
            resultString += current.data + "--"
            current = current.next
        }
        return resultString
    }


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

    // 4.get()方法
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
            while (index++ < position) {
                current = current.next
            }
            //this.length / 2 =< position:从尾开始遍历
        } else {
            current = this.tail
            index = this.length - 1
            while (index-- > position) {
                current = current.prev
            }
        }
        return current.data
    }


    // 5.indexOf()方法
    DoublyLinkedList.prototype.indexOf = function (data) {
        // 1.定义变量
        let current = this.head
        let index = 0

        // 2.遍历链表，查找与data相同的节点
        while (current) {
            if (current.data == data) {
                return index
            }
            current = current.next
            index += 1
        }
        return -1
    }


    // 6.update()方法
    DoublyLinkedList.prototype.update = function (position, newData) {
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
            while (index++ < position) {
                current = current.next
            }
            //this.length / 2 =< position:从尾开始遍历
        } else {
            current = this.tail
            index = this.length - 1
            while (index-- > position) {
                current = current.prev
            }
        }

        // 3.修改找到节点的date信息
        current.data = newData
        return true
    }


    // 7.removeAt()方法
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


    // 8.remove()方法
    DoublyLinkedList.prototype.remove = function (data) {
        // 1.获取data获取下下标值
        var index = this.indexOf(data)

        // 2.根据index删除对应位置的节点
        return this.removeAt(index)
    }

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
}


// 测试代码
var list = new DoublyLinkedList()

// 1.测试append()方法
list.append('abc')
list.append('def')
list.append('nba')
console.log(list)

// 2.测试转换为字符串的方法
console.log(list.toString())
console.log(list.backwardString())
console.log(list.forwardString())

// 3.测试insert()方法
list.insert(0, 'aaa')
list.insert(4, 'bbb')
list.insert(2, 'ccc')
console.log(list.toString())


// 4.测试get()方法
console.log(list.get(0))
console.log(list.get(3))
console.log(list.get(5))

// 5.测试indexOf()方法
console.log(list.indexOf('aaa'))
console.log(list.indexOf('nba'))
console.log(list.indexOf('ddd'))

// 6.测试update()方法
list.update(0, 'nnn')
list.update(3, 'mmm')
console.log(list.toString())

// 7.测试removeAt()方法
list.removeAt(1)
list.removeAt(3)
console.log(list.toString())

// 8.测试remove()方法
list.remove('bbb')
list.remove('ccc')
console.log(list.toString())

// 9.测试其他方法
console.log(list.isEmpty())
console.log(list.size())
console.log(list.getHead())
console.log(list.getTail())