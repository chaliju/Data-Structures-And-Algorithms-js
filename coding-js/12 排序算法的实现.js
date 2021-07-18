// 创建列表类
function ArrayList() {
    // 属性
    this.array = []

    // 方法
    // 将数据可以插入到数组中的方法
    ArrayList.prototype.insert = function (item) {
        this.array.push(item)
    }

    // toString
    ArrayList.prototype.toString = function () {
        return this.array.join('-')
    }

    //交换两个位置的数据
    ArrayList.prototype.swap = function (m, n) {
        let temp = this.array[m]
        this.array[m] = this.array[n]
        this.array[n] = temp
    }


    // 实现排序算法
    // 冒泡排序
    ArrayList.prototype.bubblesort = function () {
        // 1.获取数组的长度
        let length = this.array.length

        // 第一次：i=length-1，比较到倒数第一个位置
        // 第二次: i=length-2,比较到倒数第二个位置
        // 1. 外层循环控制冒泡趟数:设置每次遍历的长度,每遍历一次，长度 - 1
        for (let i = length - 1; i >= 0; i--) {
            // 2. 内层循环控制每趟比较的次数:从最左边的数开始，依次比较相邻元素
            for (let j = 0; j < i; j++) {
                // 3. 如果左边的数大于右边的数，则交换一下两个元素
                if (this.array[j] > this.array[j + 1]) {
                    this.swap(j, j + 1)
                }
            }
        }
    }

    // 选择排序
    ArrayList.prototype.selectionSort = function () {
        // 1.获取数组长度
        let length = this.array.length

        // 2.外层循环：设定遍历的范围，从0开始获取元素
        for (j = 0; j < length - 1; j++) {
            let min = j

            // 3.内层循环：从i+1位置开始，和后面的元素进行比较
            for (let i = min + 1; i < length; i++) {
                if (this.array[min] > this.array[i]) {
                    min = i
                }
            }
            this.swap(min, j)
        }
    }

    // 插入排序
    ArrayList.prototype.insertionSort = function () {
        // 1.获取数组的长度
        let length = this.array.length

        // 2.外层循环：从第1个位置开始获取数据，向前面局部有序进行插入
        for (let i = 1; i < length; i++) {
            // 3.内层循环：获取i位置的元素，使用while循环(重点)与左边的局部有序数据依次进行比较
            let temp = this.array[i]
            let j = i
            while (this, this.array[j - 1] > temp && j > 0) {
                this.array[j] = this.array[j - 1] // 大的数据右移
                j-- // while循环结束后，index = j左边的数据变为局部有序且array[j]最大。此时将array[j]重置为排序前的数据array[i]，方便下一次for循环
            }

            // 4.将j位置的数据，放在temp就可以了
            this.array[j] = temp
        }
    }


    // 希尔排序
    ArrayList.prototype.shellSort = function () {
        // 1.获取数组的长度
        let length = this.array.length

        // 2.初始化增量(gap：间隔/间隙)
        let gap = Math.floor(length / 2)

        // 3.第一层循环:while循环（不断地缩小间隔的大小，进行分组插入排序）
        while (gap >= 1) {

            // 4.第二层循环：以gap为增量，进行分组，对分组进行插入排序
            // 重点：将index = gap作为选中的第一个数据,从 array[i]开始往后遍历，将遍历到的数据与其小组进行插入排序
            for (let i = gap; i < length; i++) {
                let temp = this.array[i]
                let j = i

                // 5.第三层循环:寻找正确的插入位置
                while (this.array[j - gap] > temp && j > gap - 1) {
                    this.array[j] = this.array[j - gap]
                    j -= gap

                }
                // 6.将j位置的元素设置为temp
                this.array[j] = temp
            }
            //  7.缩小间隔
            gap = Math.floor(gap / 2)
        }
    }


    // 快速排序
    // 1.选择枢纽
    ArrayList.prototype.median = function (left, right) {
        // 1.取出中间的位置
        let center = Math.floor((left + right) / 2)

        // 2.判断大小，并且进行交换
        if (this.array[left] > this.array[center]) {
            this.swap(left, center);
        };
        if (this.array[left] > this.array[right]) {
            this.swap(left, right);
        };
        if (this.array[center] > this.array[right]) {
            this.swap(center, right);
        };


        // 3.将center换到right-1的位置
        this.swap(center, right - 1)

        return this.array[right - 1]
    }

    // 2.快速排序的实现
    ArrayList.prototype.quickSort = function () {
        let length = this.array.length
        this.quick(0, this.array.length - 1)
    }

    ArrayList.prototype.quick = function (left, right) {
        // 1.结束条件
        if (left >= right) return

        // 2.获取枢纽
        let pivot = this.median(left, right)

        // 3.定义变量，用于记录当前找到的位置
        let i = left + 1
        let j = right

        // 4.开始进行交换
        while (i < j) {
            // 如果左边的迭代器小于枢纽位置的值则一直向右寻找
            while (this.array[i] < pivot) {
                i++
            }

            // 如果右边的迭代器大于枢纽位置的值则一直向左寻找
            while (this.array[j] > pivot) {
                j--
            }

            // 如果左边的迭代器和右边的迭代重合了或者大于了则退出循环
            if (i < j) {
                this.swap(i, j);
            } else {
                break;
            };
        }
        // 5.如果两个都找到了对应的值，则让他们进行交换位置
        this.swap(i, j)

        // 6.分而治之, 在枢纽找到合适的位置后，将枢纽左边和右边的数也按照同样的方法交换
        this.quick(left, i - 1)
        this.quick(i + 1, right)
    }
}

// 测试类
let list = new ArrayList()

// 插入数据
list.insert(66)
list.insert(88)
list.insert(76)
list.insert(55)
list.insert(100)
list.insert(32)
list.insert(21)
list.insert(9)

// console.log(list.toString())

//验证冒泡排序
list.quickSort()
console.log(list)