// Method：和抽一个对象实例有联系
// function:


// 栈结构的封装
function Stack() {
    // 栈中的属性
    this.items = [];

    // push(item) 压栈操作，往栈里面添加元素
    Stack.prototype.push = function (element) {
        this.items.push(element);
    }

    // pop() 出栈操作，从栈中取出元素，并返回取出的那个元素
    Stack.prototype.pop = function () {
        return this.items.pop();
    }

    // peek() 查看栈顶元素
    Stack.prototype.peek = function () {
        return this.items[this.items.length - 1];
    }

    // isEmpty() 判断栈是否为空
    Stack.prototype.isEmpty = function () {
        return this.items.length === 0;
    }

    // size() 获取栈中元素个数
    Stack.prototype.size = function () {
        return this.items.length;
    }

    // toString() 返回以字符串形式的栈内元素数据
    Stack.prototype.toString = function () {
        var result = "";
        for (var i = 0; i < this.items.length; i++) {
            result += this.items[i] + " ";
        }
        return result;
    }
}


// 测试封装的栈结构
// push() 测试
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.items); //--> [1, 2, 3]

// pop() 测试
console.log(stack.pop()); //--> 3

// peek() 测试
console.log(stack.peek()); //--> 2

// isEmpty() 测试
console.log(stack.isEmpty()); //--> false

// size() 测试
console.log(stack.size()); //--> 2

// toString() 测试
console.log(stack.toString()); //--> 1 2


// 封装10进制转2进制的函数
function dec2bin(decNumber) {
    // 1.定义一个栈对象
    var stack = new Stack()

    // 2.循环操作，当不确定循环次数时，使用 while 循环
    while (decNumber > 0) {
        // 2.1 获取余数，并且放入到栈中
        stack.push(decNumber % 2)

        // 2.2 获取整除后的结果，作为下次运行的数字
        decNumber = Math.floor(decNumber / 2)
    }

    // 3.从栈中取出0和1，并拼接到一起
    var binaryString = ''
    while (!stack.isEmpty()) {
        binaryString += stack.pop()
    }
    return binaryString
}

// dec2bin() 测试
console.log(dec2bin(100)); //--> 1100100
console.log(dec2bin(88)); //--> 1011000