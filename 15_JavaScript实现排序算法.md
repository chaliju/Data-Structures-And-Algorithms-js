# js实现排序算法

## 大O表示法

**大O表示法：**

- 在计算机中采用**粗略的度量**来描述计算机算法的**效率**，这种方法被称为**“大O”表示法**
- 在**数据项个数**发生改变时，**算法的效率**也会跟着改变。所以说算法A比算法B快两倍，这样的比较是**没有意义**的。
- 因此我们通常使用**算法的速度**随着**数据量的变化**会如何变化的方式来表示算法的效率，大O表示法就是方式之一。

**常见的大O表示形式**

| 符号         | 名称           |
| ------------ | -------------- |
| O（1）       | 常数           |
| O（log(n)）  | 对数           |
| O（n）       | 线性           |
| O（nlog(n)） | 线性和对数乘积 |
| O（n²）      | 平方           |
| O（2^n）     | 指数           |

**不同大O形式的时间复杂度：**

![image-20200304164951223](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/1.png)

可以看到效率从大到小分别是：O（1）> O（logn）> O（n）> O（nlog(n)）> O（n²）> O（2^n）

**推导大O表示法的三条规则：**

- **规则一**：**所有加法项的常数都用1代替**。如7 + 8 = 15，用1表示运算结果15，大O表示法表示为O（1）；
- **规则二**：**代码运行次数只取最高次项**。如N^3 + 3n +1，大O表示法表示为：O（N^3）;
- **规则三**：**最高次项的常数用1代替**。如4N^2，大O表示法表示为：O（N^2）;

## 排序算法

这里主要介绍几种简单排序和高级排序：

- **简单排序：**冒泡排序、选择排序、插入排序；
- **高级排序：**希尔排序、快速排序、归并排序；

此处创建一个列表类ArrayList并添加一些属性和方法，用于存放这些排序方法：

```text
/ 创建列表类
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
```

### 冒泡排序

**冒泡排序的思路：**

- 对未排序的各元素**从头到尾**依次比较**相邻的两个元素**大小关系；
- 如果**左边的人员高**，则将两人**交换位置**。比如1比2矮，不交换位置；
- 向**右移动一位**，继续比较2和3，最后比较 length - 1 和 length - 2这两个数据；
- 当到达**最右端**时，**最高的人**一定被放在了**最右边**；
- 按照这个思路，从最左端重新开始时，只需要走到**倒数第二个位置**即可；

![image-20200304191223265](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/2.png)

**实现思路：**

两层循环：

- 外层循环控制冒泡趟数：
  - 第一次：j = length - 1，比较到倒数第一个位置 ；
  - 第二次：j = length - 2，比较到倒数第二个位置 ；
- 内层循环控制每趟比较的次数：
  - 第一次比较： i = 0，比较 0 和 1 位置的两个数据；
  - 最后一次比较：i = length - 2,比较length - 2和 length - 1两个数据；

详细过程如下图所示：

![image-20200304210611689](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/3.png)

动态过程：

![img](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/4.gif)

**代码实现：**

```javascript
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
```



**测试代码：**

```text
//测试类
let list = new ArrayList()

//插入元素
list.insert(66)
list.insert(88)
list.insert(12)
list.insert(87)
list.insert(100)
list.insert(5)
list.insert(566)
list.insert(23)

//验证冒泡排序
list.bubblesor()
console.log(list);
```

**测试结果：** ![image-20200304210433388](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/5.png)

**冒泡排序的效率：**

- 上面所讲的对于7个数据项，比较次数为：6 + 5 + 4 + 3 + 2 + 1;
- 对于N个数据项，**比较次数**为：(N - 1) + (N - 2) + (N - 3) + ... + 1 = N * (N - 1) / 2；如果两次比较交换一次，那么**交换次数**为：N * (N - 1) / 4；
- 使用大O表示法表示比较次数和交换次数分别为：O（ N * (N - 1) / 2）和O（ N * (N - 1) / 4），根据大O表示法的三条规则都化简为：**O（N^2）**;

### 选择排序

**选择排序改进了冒泡排序：**

- 将**交换次数**由**O（N^2）减小到O（N）**；
- 但是**比较次数**依然是**O（N^2）**；

**选择排序的思路：**

- 选定**第一个索引的位置**比如1，然后依次和后面的元素**依次进行比较**；
- 如果后面的元素，**小于**索引1位置的元素，则**交换位置**到索引1处；
- 经过一轮的比较之后，可以确定一开始指定的索引1位置的元素是**最小的**；
- 随后使用同样的方法除索引1以外**逐个比较剩下的元素**即可；
- 可以看出选择排序，**第一轮**会选出**最小值**，**第二轮**会选出**第二小的值**，直到完成排序。

![image-20200304213253241](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/6.png)

**实现思路：**

两层循环：

- 外层循环控制指定的索引：
  - 第一次：j = 0，指定第一个元素 ；
  - 最后一次：j = length - 1，指定最后一个元素 ；
- 内层循环负责将指定索引（i）的元素与剩下（i - 1）的元素进行比较；

动态过程：

![img](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/7.gif)

**代码实现：**

```text
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
        // 4.将得到的最小值的索引min上的元素与我们初始遍历的位置上的元素交换
        this.swap(min, j)
    }
}
```

**测试代码：**

```text
//测试类
let list = new ArrayList()

//插入元素
list.insert(66)
list.insert(88)
list.insert(12)
list.insert(87)
list.insert(100)
list.insert(5)
list.insert(566)
list.insert(23)

//验证选择排序
list.selectionSort()
console.log(list);
```

**测试结果：**

![image-20200304222224801](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/8.png)

**选择排序的效率：**

- 选择排序的**比较次数**为：N * (N - 1) / 2，用大O表示法表示为：**O（N^2）**;
- 选择排序的**交换次数**为：(N - 1) / 2，用大O表示法表示为：**O（N）**;
- 所以选择排序的效率高于冒泡排序；

### 插入排序

插入排序是简单排序中效率**最高**的一种排序。

**插入排序的思路：**

- 插入排序思想的核心是**局部有序**。如图所示，X左边的人称为**局部有序**；
- 首先指定一数据X（从第一个数据开始），并将数据X的左边变成局部有序状态；
- 随后将X右移一位，再次达到局部有序之后，继续右移一位，重复前面的操作直至X移至最后一个元素。

![image-20200304231400959](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/9.png)

插入排序的详细过程：

![image-20200304231643777](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/10.png)

动态过程：

![img](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/11.gif)

**代码实现：**

```text
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
            j-- 
            // while循环结束后，index = j左边的数据变为局部有序且array[j]最大。此时将array[j]重置为排序前的数据array[i]，方便下一次for循环
        }

        // 4.将j位置的数据，放在temp就可以了
        this.array[j] = temp
    }
}
```

**测试代码：**

```text
//测试类
let list = new ArrayList()

//插入元素
list.insert(66)
list.insert(88)
list.insert(12)
list.insert(87)
list.insert(100)
list.insert(5)
list.insert(566)
list.insert(23)
// console.log(list);

//验证插入排序
list.insertionSort()
console.log(list);
```

**测试结果：**

![image-20200304235529516](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/12.png)

**插入排序的效率：**

- **比较次数：**

  第一次时，需要的最大次数为1；

  第二次最大为2；以此类推，最后一趟最大为N-1；

  所以，插入排序的总比较次数为N * (N - 1) / 2；但是，实际上每趟发现插入点之前，平均只有全体数据项的一半需要进行比较，所以比较次数为：**N \* (N - 1) / 4**；

- **交换次数：**指定第一个数据为X时交换0次，指定第二个数据为X最多需要交换1次，以此类推，指定第N个数据为X时最多需要交换N - 1次，所以一共需要交换N \* (N - 1) / 2次，平均次数为N \* (N - 1) / 2；

- 虽然用大O表示法表示插入排序的效率也是**O（N^2）**，但是插入排序整体操作次数更少，因此，在简单排序中，**插入排序效率最高**；

### 希尔排序

**希尔排序**是**插入排序**的一种高效的**改进版**，效率比插入排序要**高**。

**希尔排序的历史背景：**

- 希尔排序按其设计者希尔（Donald Shell）的名字命名，该算法由**1959年公布**；
- 希尔算法首次突破了计算机界一直认为的**算法的时间复杂度都是O（N^2）**的大关，为了纪念该算法里程碑式的意义，用**Shell**来命名该算法；

**插入排序的问题：**

- 假设一个**很小的数据项**在**很靠近右端的位置**上，这里本应该是**较大的数据项的位置**；
- 将这个**小数据项移动到左边**的正确位置，所有的**中间数据项都必须向右移动一位**，这样效率非常低；
- 如果通过**某种方式**，不需要**一个个移动所有中间的数据项**，就能把较小的数据项移到左边，那么这个算法的执行速度就会有很大的改进。

**希尔排序的实现思路：**

- 希尔排序主要通过对数据进行**分组**实现快速排序；
- 根据设定的增量（gap）将数据分为gap个组（**组数等于gap**），再在每个分组中进行局部排序；

> 假如有数组有10个数据，第1个数据为黑色，增量为5。那么第二个为黑色的数据index=5，第3个数据为黑色的数据index = 10（不存在）。所以黑色的数据每组只有2个，10 / 2 = 5一共可分5组，即**组数等于增量gap**。

- 排序之后，减小增量，继续分组，再次进行局部排序，直到增量gap=1为止。随后只需进行微调就可完成数组的排序；

具体过程如下：

- 排序之前的，储存10个数据的原始数组为：

![image-20200305102330304](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/13.png)

- 设初始增量gap = length / 2 = 5，即数组被分为了5组，如图所示分别为：[8, 3]、[9, 5]、[1, 4]、[7, 6]、[2, 0]：

![image-20200305104914438](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/14.png)

- 随后分别在每组中对数据进行局部排序，5组的顺序如图所示，变为：[3, 8]、[5, 9]、[1, 4]、[6, 7]、[0, 2]：

![image-20200305103136251](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/15.png)

- 然后缩小增量gap = 5 / 2 = 2，即数组被分为了2组，如图所示分别为：[3，1，0，9，7]、[5，6，8，4，2]：

![image-20200305104933858](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/16.png)

- 随后分别在每组中对数据进行局部排序，两组的顺序如图所示，变为：[0，1，3，7，9]、[2，4，5，6，8]：

![image-20200305103815262](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/17.png)

- 然后然后缩小增量gap = 2 / 1 = 1，即数组被分为了1组，如图所示为：[0，2，1，4，3，5，7，6，9，8]：

![image-20200305104847458](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/18.png)

- 最后只需要对该组数据进行插入排序即可完成整个数组的排序：

![image-20200305104707789](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/19.png)

动态过程：

![img](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/20.gif)

图中d表示增量gap。

**增量的选择：**

- **原稿**中希尔建议的初始间距为**N / 2**，比如对于N = 100的数组，增量序列为：50，25，12，6，3，1，可以发现不能整除时向下取整。
- **Hibbard增量序列：增量序列算法为：2^k - 1，即1，3，5，7... ...等；这种情况的最坏复杂度为O（N^3/2）**,平均复杂度为**O（N^5/4）**但未被证明；
- **Sedgewcik增量序列：**

![image-20200305110724309](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/21.png)

以下代码实现中采用希尔排序原稿中建议的增量即**N / 2** 。

**代码实现：**

```text
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
```

这里解释一下上述代码中的三层循环：

- **第一层循环：**while循环，控制gap递减到1；
- **第二层循环：**分别取出根据g增量gap分成的gap组数据：将index = gap的数据作为选中的第一个数据，如下图所示，gap=5，则index = gap的数据为3，index = gap -  1的数据为8，两个数据为一组。随后gap不断加1右移，直到gap < length，此时实现了将数组分为5组。

![image-20200305104914438](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/21.5.png)

- **第三层循环：**对每一组数据进行插入排序；

**测试代码：**

```text
//测试类
let list = new ArrayList()

//插入元素
list.insert(66)
list.insert(88)
list.insert(12)
list.insert(87)
list.insert(100)
list.insert(5)
list.insert(566)
list.insert(23)
// console.log(list);

//验证希尔排序
list.shellSort()
console.log(list);
```

**测试结果：**

![image-20200305114934209](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/22.png)

**希尔排序的效率：**

- 希尔排序的效率和增量有直接关系，即使使用原稿中的增量效率都高于简单排序。最坏的情况下时间复杂度为O(N^2)，通常情况下都要好于O(N^2)

### 归并排序

**归并排序**的实现是使用了一种分而治之的思想，即将一个数组不断地通过两两分组的方式进行比较大小，最后直到所有元素都被分到一组里，那自然就是整体有序的了。

我们来看一下归并排序的主要思路，首先有如下图所示排列的一组数据：

![在这里插入图片描述](data:image/png;base64,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)

首先从左往右，每两个元素视为一组，组合前要分别判断一下这两个元素的大小，小的在左，大的右，如图所示

![在这里插入图片描述](https://lpyexplore.gitee.io/blog/assets/img/20200929154724957.46c5748f.gif)

继续再取两个元素组成一组并比较大小，如图所示：

![在这里插入图片描述](https://lpyexplore.gitee.io/blog/assets/img/20200929155015160.71c45ee7.gif)

继续上一个步骤，如图所示：

![在这里插入图片描述](https://lpyexplore.gitee.io/blog/assets/img/20200929155111906.f6fe3b0f.gif)

此时，原数组的所有元素都被两两分组完毕了，现在整个数组的长度变成了3，如下图所示：

![在这里插入图片描述](data:image/png;base64,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GQIEwZ4RznBBAARAAARAAARAAARAAARAgCCIBkAABEAABEAABEAABEAABECgZwgQBHtGOMMFARAAARAAARAAARAAARAAAYIgGgABEAABEAABEAABEAABEACBniFAEOwZ4QwXBEAABEAABEAABEAABEAABAiCaAAEQAAEQAAEQAAEQAAEQAAEeoYAQbBnhDNcEAABEAABEAABEAABEAABECAIogEQAAEQAAEQAAEQAAEQAAEQ6BkCBMGeEc5wQQAEQAAEQAAEQAAEQAAEQIAgiAZAAARAAARAAARAAARAAARAoGcIEAR7RjjDBQEQAAEQAAEQAAEQAAEQAAGCIBoAARAAARAAARAAARAAARAAgZ4hQBDsGeEMFwRAAARAAARAAARAAARAAAQIgmgABEAABEAABEAABEAABEAABHqGAEGwZ4QzXBAAARAAARAAARAAARAAARAgCKIBEAABEAABEAABEAABEAABEOgZAgTBnhHOcEEABEAABEAABEAABEAABECAIIgGQAAEQAAEQAAEQAAEQAAEQKBnCBAEe0Y4wwUBEAABEAABEAABEAABEACB/wdUqeKJyyFS+wAAAABJRU5ErkJggg==)

此时，我们要重新从左向右，每次取两个元素组成一组，同时分别比较两个元素内的所有子元素的大小，因为此时的两个元素内部是有序的，所以我们比较两者大小的话，只需要每次比较数组的第一个元素即可，过程如下图所示：

![在这里插入图片描述](https://lpyexplore.gitee.io/blog/assets/img/20200929155656445.1fccf387.gif)

此时原数组中只剩下一个元素了，所以就不对其做任何组合处理了，此时的数组是这样的：

![在这里插入图片描述](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA3cAAADRCAYAAABvnkt4AAAgAElEQVR4Ae3d/89kZ3nfcf4VfnBMUALxrrfEG9k4BgVUJVLkFNvx7mbtffD6izaYdRGWSYyzi0sSicoBnHWMCVsHWa7N7hqULBYOwarXIUojDFF+CJUqoKgQ2ippq1ZVIkW6o2usE6aHmXlm5nyZ+77Pa6TdZ74988x5fz7XdV+fc+bLG5ITAggggAACCCCAAAIIIIBA8QTeUPwW2AAEEEAAAQQQQAABBBBAAIEk3DEBAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAg3PEAAggggAACCCCAAAIIIFABAeGuAhFtAgIIIIAAAggggAACCCAwSri78rVvpd849+V0x69fSO++53w6fORceuvNj/mHAQ/wAA/wAA/wAA/wAA/wQLEeiFwT+ebYQ59LH/3UV9Krr317pwlzsHD3jW9+P33gY5fTodseT9ffeT797D2X0g33Xk43nnop3XT/y+mdD7zqHwY8wAM8wAM8wAM8wAM8wAPFeiByTeSbyDmH9y6kt584P8s/9//WH6bIQ2Ofeg933/ne36X3//bldN2RJ9JN935ekFOsxRarHRB2wPAAD/AAD/AAD/AAD2zqgQh8P/PeS+mnjzyRPvCxL6bIR2Odeg13T3/htXTgPR9PN959Ib3z9BVDvWDHAzzAAzzAAzzAAzzAAzwwTQ+cvpIOn3h+lo+ee/EvR8l3vYW733zq5XTDHZ9ON57642mKp2jpzgM8wAM8wAM8wAM8wAM80PJA5KPrjj2VIi8Nfeol3N33kc+n60/8QXrH6VeI2RJz08O47u/QPw/wAA/wAA/wAA/wAA/U5YHISdcdfzqdPPPCoPmuc7iLBPqzd31WqBPqeIAHeIAHeIAHeIAHeIAHeGCFByLgDXkEr1O4i/fY3XDH7ztit0JAe13q2utCT3ryAA/wAA/wAA/wAA9s64HZ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)

此时的数组内只有两个元素了，所以我们只需要不断比较两个元素内部的子元素大小，即可获得完整的有序数组了，过程如下图所示：

![在这里插入图片描述](https://lpyexplore.gitee.io/blog/assets/img/20200929160030155.3bc0fd72.gif)

这就是一个完整的归并排序的过程，接下来我们用代码来实现一下吧

```javascript
function mergeSort(arr) {
    
    // 将所有元素不断地两两组合，直到所有元素都被组合成一个组
    while(arr.length > 1){
        // 获取一下遍历前的数组长度，方便下面判断需要组合几次
        let length = arr.length
        
        // 创建空的新数组，用于存放所有组合后的元素
        let next_arr = []
        
        // 取两个元素进行组合，一共取 length / 2 次
        for(let i = 0; i < Math.floor(length / 2); i++){
            // 取出第一个元素
            let left = [].concat(arr.shift())
            // 取出第二个元素
            let right = [].concat(arr.shift())
            // 创建另一个新的空数组，用于存放组合后的所有元素
            let new_arr = []

            // 取两个数组中头部最小的值放到新数组中，直到一个数组为空
            while(left.length > 0 && right.length > 0){
                let min = left[0] > right[0]? right.shift() : left.shift()
                new_arr.push(min)
            }
            // 将合并好的数组添加到新的数组中
            next_arr.push(new_arr.concat(left.length == 0? right : left))
        }
        // 判断是否有一个未成组的数组
        if(arr.length == 1) next_arr.push(arr[0]);
        
        // 将所有组合后的元素构成的新数组作为下一次遍历的对象
        arr = next_arr
    }

    // 返回完整有序数组
    return arr[0]
}
```

我们来使用一下该方法，看看是否正确，为了方便大家理解，我在归并排序的函数里加了一条打印的代码，可以看到每次遍历后的数组情况，结果如下

```javascript
let arr = [19, 97, 9, 17, 1, 8]
mergeSort(arr)

/* 打印结果：
第一次组合后：[ [ 19, 97 ], [ 9, 17 ], [ 1, 8 ] ]
第二次组合后：[ [ 9, 17, 19, 97 ], [ 1, 8 ] ]
第三次组合后：[ [ 1, 8, 9, 17, 19, 97 ] ]
*/
```

查看代码我们不难发现，归并排序运行起来非常得占内存，因为在组合的过程中，我们不断得在创建新的数组，然后又进行合并。但其比较次数却非常得少，只在每次合并元素时进行比较，因此归并排序的效率还是非常得高的。

### 快速排序

**快速排序的介绍：**

- **快速排序**可以说是**目前所有排序算法**中，**最快**的一种排序算法。当然，没有任何一种算法是在任意情况下都是最优的。但是，大多数情况下快速排序是比较好的选择。
- **快速排序**其实是**冒泡排序**的升级版；

**和冒泡排序的不同：**

- 我们选择的65可以一次性将它放在最正确的位置，之后就不需要做任何移动；
- 而冒泡排序即使已经找到最大值，也需要继续移动最大值，直到将它移动到最右边；

![image-20200305154504624](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/23.png)

**实现思路**：

1. 先选一个元素作为**基点pivot**
2. 将其余元素中所有**比pivot小的值放到pivot的左边**；将所有**比pivot大的值放到pivot的右边**
3. 然后分别对pivot左边的所有元素、pivot右边的所有元素从步骤1开始排序依次，直到所有元素完整有序

**快速排序的枢纽：**

- **第一种方案：**直接选择第一个元素作为枢纽。但是，当第一个元素就是最小值的情况下，效率不高；
- **第二种方案：**使用随机数。随机数本身十分消耗性能，不推荐；
- **优秀的解决方法：取index为头、中、尾的三个数据排序后的中位数；如下图所示，按下标值取出的三个数据为：19，17，1，经排序后变为：1，17，19，取其中的中位数31作为枢纽**（当（length-1）/2不整除时可**向下或向上**取整）。

![image-20200305182934710](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/24.png)

```javascript
//交换两个位置的数据
let swap = function(arr, m, n){
    let temp  = arr[m]
    arr[m] = arr[n]
    arr[n] = temp
}

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
```

**动态过程：**

![img](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95/26.gif)

**快速排序代码实现：**

```javascript
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
```



**快速排序的效率：**

- 快速排序最坏情况下的效率：每次选择的枢纽都是最左边或最右边的数据，此时效率等同于冒泡排序，时间复杂度为**O（n^2）**。可根据不同的枢纽选择避免这一情况；
- 快速排序的平均效率：为**O（N\*logN）**，虽然其他算法效率也可达到O（N*logN），但是其中快速排序是**最好的**。

