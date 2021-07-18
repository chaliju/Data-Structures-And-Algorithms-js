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

    // 方法
    // 1.插入数据:对外给用户调用的方法
    BinarySearchTree.prototype.insert = function (key) {
        // 1.根据key创建节点
        let newNode = new Node(key)

        // 2.判断根节点是否有值
        if (this.root == null) {
            this.root = newNode
            // 根节点存在时
        } else {
            this.insertNode(this.root, newNode)
        }
    }

    // 内部使用的insertNode方法:用于比较节点从左边插入还是右边插入
    BinarySearchTree.prototype.insertNode = function (node, newNode) {
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


    // 2.遍历
    // 先序遍历(根左右)
    // 掺入一个handler函数方便之后对得到的key进行处理
    BinarySearchTree.prototype.preOrderTraversal = function (handler) {
        this.preOrderTraversalNode(this.root, handler)
    }

    //封装内部方法，对某个节点进行遍历
    BinarySearchTree.prototype.preOrderTraversalNode = function (node, handler) {
        if (node != null) {
            // 1.处理经过的节点
            handler(node.key)
            /*----------------------递归1----------------------------*/
            // 2.遍历左子树中的节点
            this.preOrderTraversalNode(node.left, handler)
            /*----------------------递归2----------------------------*/
            // 3.遍历右子树中的节点
            this.preOrderTraversalNode(node.right, handler)
        }
    }

    // 中序遍历（左根右）
    BinarySearchTree.prototype.midOrderTraversal = function (handler) {
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


    //后序遍历（左右根)
    BinarySearchTree.prototype.postOrderTraversal = function (handler) {
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

    // 3.寻找最值
    // 寻找最大值
    BinarySearchTree.prototype.max = function () {
        // 1.获取根节点
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


    // 4.查找特定的key
    // 通过 while 循环实现
    BinarySearchTree.prototype.search = function (key) {
        // 1.获取根节点
        let node = this.root

        // 2.循环搜索key
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

    BinarySearchTree.prototype.searchNode = function (node, key) {
        if (node === null) return false;
        if (key < node.key) {
            return this.searchNode(node.left, key);
        } else if (key > node.key) {
            return this.searchNode(node.right, key);
        } else {
            return true;
        }
    }



    // 5.删除节点
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
                isLeftChild = false
                current = current.right
            }

            // 找到最后依然没有找到相等的节点
            if (current == null) {
                return false
            }
        }

        // 2.根据对应的节点删除节点
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
}



// 测试代码
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


// 3.遍历测试
// 1.先序遍历
let resultString = ""
//掺入处理节点值的处理函数
bst.preOrderTraversal(function (key) {
    resultString += key + "->"
})
console.log((resultString)) // 11->7->5->3->6->9->8->10->15->13->12->14->20->18->25->

// 2.中序遍历
let resultString1 = ""
//掺入处理节点值的处理函数
bst.midOrderTraversal(function (key) {
    resultString1 += key + "->"
})
console.log((resultString1)) // 3->5->6->7->8->9->10->11->12->13->14->15->18->20->25->


//3.测试后序遍历
let resultString2 = ""
bst.postOrderTraversal(function (key) {
    resultString2 += key + "->"
})
console.log((resultString2)) // 3->6->5->8->10->9->7->12->14->13->18->25->20->15->11->

// 4.测试最值
console.log(bst.max()); // 25
console.log(bst.min()); // 3

// 5.测试搜索方法
console.log(bst.search(25)) // true
console.log(bst.search1(25)) // true
console.log(bst.search(2)) // false
console.log(bst.search1(2)) // false
console.log(bst.search(18)) // true
console.log(bst.search1(18)) // true

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