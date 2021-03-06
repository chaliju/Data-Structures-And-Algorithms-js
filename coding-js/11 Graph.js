// 封装图类
function Graph() {
    // 属性：顶点（数组）/边（字典）
    this.vertexes = [] // 顶点
    this.edges = new Dictionary() //边

    // 方法
    // 添加方法
    // 1.添加顶点
    Graph.prototype.addVertex = function (v) {
        this.vertexes.push(v)
        this.edges.set(v, []) // 将边添加到字典中，新增的顶点作为键，对应的值为一个存储边的空数组
    }

    // 2.添加边
    Graph.prototype.addEdge = function (v1, v2) { // 传入两个顶点为它们添加边
        this.edges.get(v1).push(v2) // 取出字典对象edges中存储边的数组，并添加关联顶点
        this.edges.get(v2).push(v1) // 表示的是无向图，故要添加互相指向的两条边
    }


    // 实现toSring()方法
    Graph.prototype.toString = function () {
        // 1.定义字符串，保存最终的结果
        let resultSring = ""

        // 2.遍历所有的顶点以及顶点对应的边
        for (let i = 0; i < this.vertexes.length; i++) {
            // 遍历所有顶点
            resultSring += this.vertexes[i] + '-->'
            // 先把顶点对应的边取出来以便后面使用
            let vEdges = this.edges.get(this.vertexes[i])
            // 遍历字典中每个顶点对应的数组
            for (let j = 0; j < vEdges.length; i++) {
                resultSring += vEdges[j] + ' '
            }
            resultString += '\n'
        }
        return resultString
    }


    // 初始化状态颜色
    Graph.prototype.initializeColor = function () {
        let colors = []
        for (let i = 0; i < this.vertexes.length; i++) {
            colors[this.vertexes[i]] = 'white'
        }
        return colors
    }


    // 实现广度优先搜索（BFS）
    Graph.prototype.bfs = function (firstV, handler) {
        // 1.初始化颜色
        let colors = this.initializeColor()

        // 2.创建队列
        let queue = new Queue()

        // 3.将顶点加入到队列中
        queue.enqueue(firstV)

        // 4.循环从队列中取出元素，队列为空才停止
        while (!queue.isEmpty()) {
            // 4.1 从队列中取出一个顶点
            let v = queue.dequeue()

            // 4.2 从字典对象edges中获取和该顶点相邻的其他顶点组成的数组
            let vNeighbours = this.edges.get(v)

            // 4.3 将v的颜色设置为灰色
            colors[v] = 'gray'

            // 4.4 遍历v所有相邻的顶点vNeighbours,并且加入队列中
            // 这一步是完成bfs的关键，依赖队列的先进先出的特点。
            for (let i = 0; i < vNeighbours.length; i++) {
                let a = vNeighbours[i];
                //判断相邻顶点是否被探测过，被探测过则不加入队列中；并且加入队列后变为灰色，表示被探测过
                if (colors[a] == 'white') {
                    colors[a] = 'gray'
                    queue.enqueue(a)
                }
            }
            // 4.5 访问顶点
            handler(v)

            // 4.6 顶点v所有白色的相邻顶点都加入队列后，将顶点v设置为黑色。此时黑色顶点v位于队列最前面，进入下一次while循环时会被取出
            colors[v] = 'black'
        }
    }


    // 深度优先搜索（DFS）
    Graph.prototype.dfs = function (firstV, handler) {
        // 1.初始化颜色
        let colors = this.initializeColor()

        // 2.从某个顶点依次递归访问
        this.dfsVisit(firstV, colors, handler)
    }

    //为了方便递归调用，封装访问顶点的函数，传入三个参数分别表示：指定的第一个顶点、颜色、处理函数
    Graph.prototype.dfsVisit = function (v, colors, handler) {
        // 1.将颜色设置为灰色
        colors[v] = 'gray'

        // 2.处理v顶点
        handler(v)

        // 3.访问v的相邻顶点
        let vNeighbours = this.edges.get(v)
        for (let i = 0; i < vNeighbours.length; i++) {
            let e = vNeighbours[i]
            //判断相邻顶点是否为白色，若为白色，递归调用函数继续访问
            if (colors[e] == 'white') {
                this.dfsVisit(e, colors, handler)
            }
        }

        // 4.将v设置为黑色
        colors[v] = 'baleck'
    }
}

// 测试代码
// 1.创建图结构
let g = new Graph()

// 2.添加顶点
let myVertexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
for (let i = 0; i < myVertexes.length; i++) {
    g.addVertex(myVertexes[i])
}

//3.添加边
g.addEdge('A', 'B')
g.addEdge('A', 'C')
g.addEdge('A', 'D')
g.addEdge('C', 'D')
g.addEdge('C', 'G')
g.addEdge('D', 'G')
g.addEdge('D', 'H')
g.addEdge('B', 'E')
g.addEdge('B', 'F')
g.addEdge('E', 'I')

console.log(g)

// 5.测试bfs
let result = ""
g.bfs(g.vertexes[0], function (v) {
    result += v + "-"
})
console.log(result); // A-B-C-D-E-F-G-H-I-


// 6.测试dfs
let result1 = ""
g.dfs(g.vertexes[0], function (v) {
    result1 += v + "--"
})
console.log(result1); // A--B--E--I--F--C--D--G--H--