# JavaScript 数据结构与算法（十二）二叉树

## 二叉树

### 二叉树的概念

如果树中的**每一个节点最多只能由两个子节点**，这样的树就称为二叉树；

### 二叉树的组成

- 二叉树**可以为空，也就是没有节点**；
- 若二叉树不为空，则它由根节点和称为其左子树 TL 和右子树 TR 的两个不相交的二叉树组成；

### 二叉树的五种形态

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.15ycsg4fqoio.png)

上图分别表示：

- 空的二叉树
- 只有一个节点的二叉树
- 只有左子树 TL 的二叉树
- 只有右子树 TR 的二叉树
- 有左右两个子树的二叉树

### 二叉树的特性

- 一个二叉树的第 i 层的最大节点树为：2^(i-1)，i >= 1；
- 深度为 k 的二叉树的最大节点总数为：2^k - 1 ，k >= 1；
- 对任何非空二叉树，若 **n0 表示叶子节点的个数**，n2表示**度为 2 的非叶子节点个数**，那么两者满足关系：**n0 = n2 + 1**；如下图所示：H，E，I，J，G 为叶子节点，总数为 5；A，B，C，F 为度为 2 的非叶子节点，总数为 4；满足 n0 = n2 + 1 的规律。

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.syjwffjltmo.png)

### 特殊的二叉树

#### 完美二叉树

完美二叉树（Perfect Binary Tree）也成为**满二叉树**（Full Binary Tree），在二叉树中，**除了最下一层的叶子节点外，每层节点都有 2 个子节点**，这就构成了完美二叉树。

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.223b2axrocf4.png)

#### 完全二叉树

完全二叉树（Complete Binary Tree）:

- 除了最后一层外，其他各层的节点数都达到了最大值；
- 最后一层的结点集中在左侧，且结点连续，只有右侧部分可以缺失结点
- 完美二叉树是特殊的完全二叉树；

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.5y4rglrp8qk0.png)

在上图中，由于 H 缺失了右子节点，所以它不是完全二叉树。

（其不满足完全二叉树的第二个条件，因为最后一层的 `结点H` 、`结点I` 、`结点J` 没有连续集中在左侧。）

### 二叉树的数据存储

常见的二叉树存储方式为数组和链表：

#### 使用数组

- 完全二叉树：按从上到下，从左到右的方式存储数据。

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.29w4k62b51og.png)

| 节点 |  A  |  B  |  C  |  D  |  E  |  F  |  G  |  H  |  I  |
| :--: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 序号 |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  |

使用数组存储时，取数据的时候也十分方便：左子节点的序号等于（父节点序号 *2），右子节点的序号等于（父节点序号 *2 ）+ 1 。

- 非完全二叉树：非完全二叉树需要转换成完全二叉树才能按照上面的方案存储，这样会浪费很大的存储空间。

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.4jgiq6r2xee0.png)

| 节点 |  A  |  B  |  C  |  ^  |  ^  |  F  |  ^  |  ^  |  ^  |  ^  |  ^  |  ^  |  M  |
| :--: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 序号 |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  | 11  | 12  | 13  |

#### 使用链表

二叉树最常见的存储方式为链表：每一个节点封装成一个 Node，Node 中包含存储的数据、左节点的引用和右节点的引用。

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.2mlscfad5420.png)



## 二叉搜索树

**二叉搜索树**（BST，Binary Search Tree），也称为**二叉排序树**和**二叉查找树**。

**二叉搜索树是一棵二叉树，可以为空。**

如果不为空，则满足以下性质：

- 条件 1：非空左子树的所有键值小于其根节点的键值。比如三中节点 6 的所有非空左子树的键值都小于 6；
- 条件 2：非空右子树的所有键值大于其根节点的键值；比如三中节点 6 的所有非空右子树的键值都大于 6；
- 条件 3：左、右子树本身也都是二叉搜索树；

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.1lhxcdph4vpc.png)

如上图所示，树二和树三符合 3 个条件属于二叉树，树一不满足条件 3 所以不是二叉树。

总结：

- 左边的结点永远比根结点以及右边的结点小
- 右边的结点永远比根结点已经左边的结点大

这种特点使得二叉搜索树的**查询效率非常高**，这也就是二叉搜索树中“搜索”的来源。

## 二叉搜索树应用举例

下面是一个二叉搜索树：

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.3l21fsg6qbc0.png)

若想在其中查找数据 10，只需要查找 4 次，查找效率非常高。

- 第 1 次：将 10 与根节点 9 进行比较，由于 10 > 9，所以 10 下一步与根节点 9 的右子节点 13 比较；
- 第 2 次：由于 10 < 13，所以 10 下一步与父节点 13 的左子节点 11 比较；
- 第 3 次：由于 10 < 11，所以 10 下一步与父节点 11 的左子节点 10 比较；
- 第 4 次：由于 10 = 10，最终查找到数据 10 。

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.5x9xyvmbxy80.png)

同样是 15 个数据，在排序好的数组中查询数据 10，需要查询 10 次：

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.2gqz4t2jekw0.png)

其实：如果是排序好的数组，可以通过二分查找：第一次找 9，第二次找 13，第三次找 15...。我们发现如果把每次二分的数据拿出来以树的形式表示的话就是二叉搜索树。这就是数组二分法查找效率之所以高的原因。

## 二叉搜索树的封装

二叉搜索树有四个最基本的属性：指向节点的根（root），节点中的键（key）、左指针（right）、右指针（right）。

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.5vdbb5to1n40.png)

所以，二叉搜索树中除了定义 root 属性外，还应定义一个节点内部类，里面包含每个节点中的 left、right 和 key 三个属性。

```js
// 封装二叉搜索树
function BinarySearchTree() {
    
    //节点内部类
    function Node(key) {
        this.key = key
        this.left = null
        this.right = null
    }

    //属性
    this.root = null
}
```

### 二叉搜索树的常见操作：

- `insert(key)` ：向树中插入一个新的键。
- `search(key)` ：在树中查找一个键，如果节点存在，则返回 true；如果不存在，则返回 `false`。
- `preOrderTraverse` ：通过先序遍历方式遍历所有节点。
- `inOrderTraverse` ：通过中序遍历方式遍历所有节点。
- `postOrderTraverse` ：通过后序遍历方式遍历所有节点。
- `min` ：返回树中最小的值/键。
- `max` ：返回树中最大的值/键。
- `remove(key)` :从树中移除某个键。

#### 插入数据

**实现思路：**

- 首先根据传入的 key 创建节点对象。
- 然后判断根节点是否存在，不存在时通过：this.root = newNode，直接把新节点作为二叉搜索树的根节点。
- 若存在根节点则重新定义一个内部方法 `insertNode()` 用于查找插入点。

**insert(key) 代码实现**

```js
// 1.插入数据:对外给用户调用的方法
BinarySearchTree.prototype.insert = function (key) {
    // 1.根据key创建节点
    let newNode = new Node(key)

    // 2.判断根节点是否有值
    // 2.1 根节点不存在
    if (this.root == null) {
        this.root = newNode
        // 根节点存在时
    } else {
        this.insertNode(this.root, newNode)
    }
}
```

**insertNode() 的实现思路:**

根据比较传入的两个节点，一直查找新节点适合插入的位置，直到成功插入新节点为止。

- 当 newNode.key < node.key 向左查找:

  - 情况 1：当 node 无左子节点时，直接插入：

  - 情况 2：当 node 有左子节点时，递归调用 insertNode()，直到遇到无左子节点成功插入 newNode 后，不再符合该情况，也就不再调用 insertNode()，递归停止。

    ![image-20200301191640632](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/2.png)

- 当 newNode.key >= node.key 向右查找，与向左查找类似：

  - 情况 1：当 node 无右子节点时，直接插入：

  - 情况 2：当 node 有右子节点时，依然递归调用 insertNode()，直到遇到传入 insertNode 方法 的 node 无右子节点成功插入 newNode 为止。
  
    ![image-20200301191507181](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/3.png)

**insertNode(root, node) 代码实现**

```js
// 内部使用的insertNode方法:用于比较节点从左边插入还是右边插入
BinarySearchTree.prototype.insertNode = function (node, newNode) {
    // node:当前遍历到的节点
    // newNode:要插入的节点
    
    //当newNode.key < node.key向左查找
    /*----------------------分支1:向左查找--------------------------*/
    if (newNode.key < node.key) {
        // 1.1 node无左子节点，直接插入
        if (node.left == null) {
            node.left = newNode

            // 1.2 node有左子节点，递归调用insertNode(),直到遇到无左子节点成功插入newNode后，不再符合该情况，也就不再调用insertNode()，递归停止。
        } else {
            this.insertNode(node.left, newNode)
        }

        // 当newNode.key >= node.key向右查找
        /*-----------------------分支2:向右查找--------------------------*/
    } else {
        // 2.1 node无右子节点，直接插入
        if (node.right == null) {
            node.right = newNode

            // 2.2 node有右子节点，依然递归调用insertNode(),直到遇到无右子节点成功插入newNode为止
        } else {
            this.insertNode(node.right, newNode)
        }
    }
}
```

**过程详解：**

为了更好理解以下列二叉搜索树为例：

![image-20200301193104003](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/4.png)

想要上述的二叉搜索树（蓝色）中插入数据10：

- 先把key = 10 传入insert方法，由于存在根节点 9，所以直接调用insetNode方法，传入的参数：node = 9，newNode = 10；
- 由于10 > 9，进入分支2，向右查找适合插入的位置；
- 由于根节点 9 的右子节点存在且为 13 ，所以进入分支2.2，递归调用insertNode方法，传入的参数：node = 13，newNode = 10；
- 由于 10 < 13 ，进入分支1，向左查找适合插入的位置；
- 由于父节点 13 的左子节点存在且为11，所以进入分支1.2，递归调用insertNode方法，传入的参数：node = 11，newNode = 10；
- 由于 10 < 11，进入分支1，向左查找适合插入的位置；
- 由于父节点 11 的左子节点不存在，所以进入分支1.1，成功插入节点 10 。由于不符合分支1.2的条件所以不会继续调用insertNode方法，递归停止。

**测试代码：**

```javascript
// 1.创建BinarySearchTree
let bst = new BinarySearchTree()

// 2.插入数据
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);
```



#### 遍历数据

这里所说的树的遍历不仅仅针对二叉搜索树，而是适用于**所有的二叉树**。由于树结构不是线性结构，所以遍历方式有多种选择，常见的三种二叉树遍历方式为：

- 先序遍历；
- 中序遍历；
- 后序遍历；

还有层序遍历，使用较少。

##### 先序遍历

**实现思路：**

1. 从根结点开始，按照 `访问根结点 => 访问左子树 => 访问右子树` 的顺序对各个结点进行访问
2. 访问到结点时，执行回调函数 `handle` ，并将访问到的结点的 `key` 作为参数传入

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.69ooahvtbbo0.png)

如上图所示，二叉树的节点遍历顺序为：A -> B -> D -> H -> I -> E -> C -> F -> G。

**代码实现：**

```js
// 先序遍历(根左右 DLR)
// 掺入一个handler函数方便之后对得到的key进行处理
BinarySearchTree.prototype.preOrderTraversal = function (handler) {
    
    // 从整棵二叉查找树的根节点开始遍历
    this.preOrderTraversalNode(this.root, handler)
}

// 封装内部方法，对某个节点进行遍历
BinarySearchTree.prototype.preOrderTraversalNode = function (node, handler) {
    if (node != null) {
        // 1.处理经过的节点，将节点的 key传给回调函数处理
        handler(node.key)
        /*----------------------递归1----------------------------*/
        // 2.遍历左子树中的节点
        this.preOrderTraversalNode(node.left, handler)
        /*----------------------递归2----------------------------*/
        // 3.遍历右子树中的节点
        this.preOrderTraversalNode(node.right, handler)
    }
}
```

**过程详解：**

以遍历以下二叉搜索树为例：

![image-20200301221450001](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/8.png)

首先调用preOrderTraversal方法，在方法里再调用preOrderTraversalNode方法用于遍历二叉搜索树。在preOrderTraversalNode方法中，递归1负责遍历左子节点，递归2负责遍历右子节点。先执行递归1，执行过程如下图所示：

> **记：preOrderTraversalNode() 为 A()**

![image-20200302000248291](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/9.png)

可以看到一共递归调用了4次方法A，分别传入11、7、5、3，最后遇到null不满足 node != null  条件结束递归1；

注意此时只是执行完最开始的递归1，并没有执行递归2，并且递归1执行到null停止后要一层层地往上返回，按顺序将调用的函数压出函数调用栈。

关于函数调用栈：之前的四次递归共把4个函数压入了函数调用栈，现在递归执行完了一层层地把函数压出栈。

值得注意的是：每一层函数都只是执行完了递归1，当返回到该层函数时，比如A（3）要继续执行递归2遍历二叉搜索树中的右子节点；

在执行递归2的过程中会不断调用方法A，并依次执行递归1和递归2，以此类推直到遇到null不满足 node != null   条件为止，才停止递归并一层层返回，如此循环。同理A（5）层、A（7）层、A（11）层都要经历上述循环，直到将二叉搜索树中的节点全部遍历完为止。

具体过程如下图所示：

![image-20200302000007414](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/10.png)

**测试代码：**

```javascript
// 3.遍历测试
let resultString = ""
//掺入处理节点值的处理函数
bst.preOrderTraversal(function (key) {
    resultString += key + "->"
})
console.log((resultString))     // 11->7->5->3->6->9->8->10->15->13->12->14->20->18->25->
```



##### 中序遍历

**实现思路：**

1. 从根结点开始，按照 `访问左子树 => 访问根节点 => 访问右子树` 的顺序对各个结点进行访问
2. 访问到结点时，执行回调函数 `handle` ，并将访问到的结点的 `key` 作为参数传入

**代码实现：**

```js
// 中序遍历（左根右 LDR）
BinarySearchTree.prototype.midOrderTraversal = function (handler) {
    
    // 从二叉查找树的根结点开始遍历
    this.midOrderTraversalNode(this.root, handler)
}

BinarySearchTree.prototype.midOrderTraversalNode = function (node, handler) {
    if (node != null) {
        // 1.遍历左子树中的节点
        this.midOrderTraversalNode(node.left, handler)

        // 2.处理节点
        handler(node.key)

        // 3.遍历右子树中的节点
        this.midOrderTraversalNode(node.right, handler)
    }
}
```

**过程详解：**

遍历的顺序应如下图所示：

![image-20200302112920295](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/12.png)

首先调用midOrderTraversal方法，在方法里再调用midOrderTraversalNode方法用于遍历二叉搜索树。先使用递归1遍历左子树中的节点；然后，处理父节点；最后，遍历右子树中的节点。

**测试代码：**

```javascript
// 2.中序遍历
let resultString1 = ""
//掺入处理节点值的处理函数
bst.midOrderTraversal(function (key) {
    resultString1 += key + "->"
})
console.log((resultString1)) // 3->5->6->7->8->9->10->11->12->13->14->15->18->20->25->
```



##### 后序遍历

**实现思路：**

1. 从根结点开始，按照 `访问左子树 => 访问右子树 => 访问根结点` 的顺序对各个结点进行访问
2. 访问到结点时，执行回调函数 `handle` ，并将访问到的结点的 `key` 作为参数传入

**代码实现：**

```js
// 后序遍历（左右根 LRD）
BinarySearchTree.prototype.postOrderTraversal = function (handler) {
    
     // 从二叉查找树的根结点开始遍历
    this.postOrderTraversalNode(this.root, handler)
}

BinarySearchTree.prototype.postOrderTraversalNode = function (node, handler) {
    if (node != null) {
        //1.遍历左子树中的节点
        this.postOrderTraversalNode(node.left, handler)

        //2.遍历右子树中的节点
        this.postOrderTraversalNode(node.right, handler)

        //3.处理节点
        handler(node.key)
    }
}
```

**过程详解：**

遍历的顺序应如下图所示：

![image-20200302120246366](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/14.png)

首先调用postOrderTraversal方法，在方法里再调用postOrderTraversalNode方法用于遍历二叉搜索树。先使用递归1遍历左子树中的节点；然后，遍历右子树中的节点；最后，处理父节点。

**测试代码：**

```javascript
//3.测试后序遍历
let resultString2 = ""
bst.postOrderTraversal(function (key) {
    resultString2 += key + "->"
})
console.log((resultString2))    // 3->6->5->8->10->9->7->12->14->13->18->25->20->15->11->
```



##### 总结

以遍历根（父）节点的顺序来区分三种遍历方式。比如：先序遍历先遍历根节点、中序遍历第二遍历根节点、后续遍历最后遍历根节点。

#### 查找数据

##### 查找最大值或最小值

在二叉搜索树中查找最值非常简单，最小值在二叉搜索树的最左边，最大值在二叉搜索树的最右边。只需要一直向左/右查找就能得到最值，如下图所示：

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.3h3yfhyqgi00.png)

代码实现：

```js
// 寻找最大值
BinarySearchTree.prototype.max = function () {
    // 1.从根结点开始遍历
    let node = this.root

    // 2.定义key保存节点值
    let key = null

    // 3.依次向右不断查找，直到节点为null
    while (node != null) {
        key = node.key
        node = node.right
    }
    return key
}

// 寻找最小值
BinarySearchTree.prototype.min = function () {
    // 1.获取根节点
    let node = this.root

    // 2.定义key保存节点值
    let key = null

    // 3.依次向左不断查找，直到节点为null
    while (node != null) {
        key = node.key
        node = node.left
    }
    return key
}
```

**测试代码：**

```javascript
console.log(bst.max());     // 25
console.log(bst.min());     // 3
```



##### 查找特定值

**实现思路：**

查找二叉搜索树当中的特定值效率也非常高。只需要从根节点`root`开始将需要查找节点的 `key `值与之比较，若` node.key < root `则**向左**查找，若 `node.key > root` 就**向右**查找，直到找到或查找到 `null `为止。这里可以使用递归实现，也可以采用循环来实现。

**代码实现：**

```js
// search(key) 查找二叉搜索树中是否有相同的key，存在返回 true，否则返回 false
// 通过 while 循环实现
BinarySearchTree.prototype.search = function (key) {
    // 1.从二叉查找树的根结点开始遍历
    let node = this.root

    // 2.一直与遍历到的结点的 key值进行比较
    while (node != null) {
        if (key < node.key) {
            // 小于根(父)节点就往左边找
            node = node.left
            // 大于根(父)节点就往右边找
        } else if (key > node.key) {
            node = node.right
        } else {
            return true
        }
    }
    return false
}


// 通过递归实现
BinarySearchTree.prototype.search1 = function (key) {
    return this.searchNode(this.root, key);
}

BinarySearchTree.prototype.searchNode=function(node, key) {
    if (node === null) return false;
    if (key < node.key) {
        return this.searchNode(node.left, key);
    } else if (key > node.key) {
        return this.searchNode(node.right, key);
    } else {
        return true;
    }
}
```

**测试代码：**

```javascript
// 5.测试搜索方法
console.log(bst.search(25))     // true
console.log(bst.search1(25))    // true
console.log(bst.search(2))      // false
console.log(bst.search1(2))     // false
console.log(bst.search(18))     // true
console.log(bst.search1(18))    // true
```



#### 删除数据

**实现思路：**

**第一步：**先找到需要删除的节点，若没找到，则不需要删除；

首先定义变量 current 用于保存需要删除的节点、变量 parent 用于保存它的父节点、变量 isLeftChild 保存 current 是否为 parent 的左节点，这样方便之后删除节点时改变相关节点的指向。

```js
BinarySearchTree.prototype.remove = function (key) {
    // 1.寻找要删除的节点
    // 1.1 定义变量，保存一些信息
    let current = this.root
    let parent = null
    let isLeftChild = true;

    // 1.2 开始寻找删除的节点
    while (current.key != key) {
        parent = current

        // 小于则往左找
        if (key < current.key) {
            isLeftChild = true
            current = current.left
        } else {
            // 否则往右查找
            isLeftChild = false
            current = current.right
        }

        // 找到最后依然没有找到相等的节点
        if (current == nulll) {
            return false
        }
    }
}
```

**第二步：**删除找到的指定节点，后分 3 种情况：

- 删除叶子节点；
- 删除只有一个子节点的节点；
- 删除有两个子节点的节点；

##### 删除的是叶子节点（没有子节点）

删除的是叶子节点分两种情况：

- **叶子节点也是根节点**

  当该叶子节点为根节点时，如下图所示，此时 current == this.root，直接通过：this.root = null，删除根节点。

  ![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.1j9353rx9b7k.png)

- **叶子节点不为根节点**

  当该叶子节点不为根节点时也有两种情况，如下图所示

  ![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.3r99a6ocvug0.png)

  若 current = 8，可以通过：parent.left = null，删除节点 8；

  若 current = 10，可以通过：parent.right = null，删除节点 10；

  代码实现：

  ```js
  // 2.1 删除的节点是叶子节点（没有子节点）
  if (current.left == null && current.right == null) {
      // 2.1.1 叶子节点也是根节点
      if (current == this.root) {
          this.root = null
      // 2.1.2 叶子节点不是根节点
      } else if (isLeftChild) {
          parent.left = null
      } else {
          parent.right = null
      }
  }
  ```

##### 删除只有一个子节点的节点

有六种情况：

当 current 存在左子节点时（`current.right == null`）：

- 情况 1：current 为根节点（`current == this.root`），如节点 11，此时通过：`this.root = current.left`，删除根节点 11；

- 情况 2：current 为父节点 parent 的左子节点（`isLeftChild == true`），如节点 5，此时通过：`parent.left = current.left`，删除节点 5；

- 情况 3：current 为父节点 parent 的右子节点（`isLeftChild == false`），如节点 9，此时通过：`parent.right = current.left`，删除节点 9；

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.27lwqd0qfnpc.png)

当 current 存在右子节点时（`current.left = null`）：

- 情况 4：current 为根节点（`current == this.root`），如节点 11，此时通过：`this.root = current.right`，删除根节点 11。

- 情况 5：current 为父节点 parent 的左子节点（`isLeftChild == true`），如节点 5，此时通过：`parent.left = current.right`，删除节点 5；

- 情况 6：current 为父节点 parent 的右子节点（`isLeftChild == false`），如节点 9，此时通过：`parent.right = current.right`，删除节点 9；

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.3edzg72fx7y0.png)

代码实现：

```js
// 2.2 删除的节点有一个子节点
// 2.2.1 节点只有一个左子节点
else if (current.right == null) {
    if (current == this.root) {
        this.root = current.left
    } else if (isLeftChild) {
        parent.left = current.left
    } else {
        parent.right = current.left
    }
    // 2.2.2 节点只有一个右子节点
} else if (current.left == null) {
    if (current == this.root) {
        this.root = current.rigth
    } else if (isLeftChild) {
        parent.left = current.right
    } else {
        parent.right = current.right
    }
}
```

##### 删除有两个子节点的节点

这种情况十分复杂，首先依据以下二叉搜索树，讨论这样的问题：

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.4g0geeyv6ya0.png)

**删除节点 9**

在保证删除节点 9 后原二叉树仍为二叉搜索树的前提下，有两种方式：

- 方式 1：从节点 9 的左子树中选择一合适的节点替代节点 9，可知节点 8 符合要求；
- 方式 2：从节点 9 的右子树中选择一合适的节点替代节点 9，可知节点 10 符合要求；

![image-20200302190601622](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%91%E4%BA%8C/24.png)

**删除节点 7**

在保证删除节点 7 后原二叉树仍为二叉搜索树的前提下，也有两种方式：

- 方式 1：从节点 7 的左子树中选择一合适的节点替代节点 7，可知节点 5 符合要求；
- 方式 2：从节点 7 的右子树中选择一合适的节点替代节点 7，可知节点 8 符合要求；

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.2h9hjd5bhwo0.png)

**删除节点 15**

在保证删除节点 15 后原树二叉树仍为二叉搜索树的前提下，同样有两种方式：

- 方式 1：从节点 15 的左子树中选择一合适的节点替代节点 15，可知节点 14 符合要求；
- 方式 2：从节点 15 的右子树中选择一合适的节点替代节点 15，可知节点 18 符合要求；

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.4f5tzwdvueq0.png)

相信你已经发现其中的规律了！

**规律总结：如果要删除的节点有两个子节点，甚至子节点还有子节点，这种情况下需要从要删除节点下面的子节点中找到一个合适的节点，来替换当前的节点。**

若用 current 表示需要删除的节点，则合适的节点指的是：

- current **左子树**中比 current 小一点点的节点，即 current **左子树中的最大值**；
- current **右子树**中比 current 大一点点的节点，即 current **右子树中的最小值**；

###### 前驱 & 后继

在二叉搜索树中，这两个特殊的节点有特殊的名字：

- 比 current **小一点点的节点**，称为 current 节点的**前驱**。比如下图中的节点 5 就是节点 7 的前驱；
- 比 current **大一点点的节点**，称为 current 节点的**后继**。比如下图中的节点 8 就是节点 7 的后继；

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.71vg0g9z7io0.png)

- 查找需要被删除的节点 current 的后继时，需要在 current 的**右子树**中查找**最小值**，即在 current 的**右子树**中一直**向左遍历**查找；


- 查找前驱时，则需要在 current 的**左子树**中查找**最大值**，即在 current 的**左子树**中一直**向右遍历**查找。


下面只讨论查找 current 后继的情况，查找前驱的原理相同，这里暂不讨论。

**代码实现：**

```js
// 2.3 删除的节点有两个子节点
else {
    // 2.3.1 获取后继节点
    let successor = this.getSuccessor(current)

    // 2.3.2 判断是否是根节点
    if (current == this.root) {
        this.root = successor
    } else if (isLeftChild) {
        parent.left = successor
    } else {
        parent.right = successor
    }

    // 2.3.3 将后续的左子节点改为被删除节点的左子节点
    successor.left = current.left
}

}

// 封装查找后继的方法
BinarySearchTree.prototype.getSuccessor = function (delNode) {
// 1.定义变量，保存找到的后继
// successor：后继节点
let successor = delNode
let current = delNode.right
let successorParent = delNode

// 2.循环查找current的右子树节点
while (current != null) {
    successorParent = successor
    successor = current
    current = current.left
}

// 3.判断寻找到的后继节点是否直接就是delNode的right节点
if (successor != delNode.right) {
    successorParent.left = delNode.right
    successor.right = delNode.right
}

return successor
}
```

**测试代码：**

```js
// 6.测试删除方法
//删除没有子节点的节点
bst.remove(3)
bst.remove(8)
bst.remove(10)

//删除有一个子节点的节点
bst.remove(5)
bst.remove(19)

//删除有两个子节点的节点
bst.remove(9)
bst.remove(7)
bst.remove(15)

//遍历二叉搜索树并输出
let resultString3 = ""
bst.midOrderTraversal(function (key) {
    resultString3 += key + "->"
})
console.log((resultString3))    // 6->11->12->12->14->18->20->25->
```

## 平衡树

二叉搜索树的缺陷：当插入的数据是有序的数据，就会造成二叉搜索树的深度过大。比如原二叉搜索树由 11 7 15 组成，如下图所示：

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.1nkd51rg5dz4.png)

当插入一组有序数据：6 5 4 3 2 就会变成深度过大的搜索二叉树，会严重影响二叉搜索树的性能。

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.154bnlgtd5z4.png)

**非平衡树**

- 比较好的二叉搜索树，它的数据应该是**左右均匀分布**的。
- 但是插入**连续数据**后，二叉搜索树中的数据**分布就变得不均匀**了，我们称这种树为**非平衡树**。
- 对于一棵**平衡二叉树**来说，插入/查找等操作的效率是 **O(log n)**。
- 而对于一棵**非平衡二叉树**来说，相当于编写了一个链表，查找效率变成了 **O(n)**。

**树的平衡性**

为了能以较快的时间 O(log n)来操作一棵树，我们需要保证树总是平衡的：

- 起码大部分是平衡的，此时的时间复杂度也是接近 O(log n) 的；
- 这就要求树中**每个节点左边的子孙节点的个数**，应该尽可能地**等于右边的子孙节点的个数**；

**常见的平衡树**

- **AVL 树：**是最早的一种平衡树，它**通过在每个节点多存储一个额外的数据来保持树的平衡**。由于 AVL 树是平衡树，所以它的时间复杂度也是 O(log n)。但是它的**整体效率不如红黑树**，开发中比较少用。
- **红黑树：**同样通过一些特性来保持树的平衡，时间复杂度也是 O(log n)。进行插入/删除等操作时，性能优于 AVL 树，所以平衡树的应用基本都是红黑树。

