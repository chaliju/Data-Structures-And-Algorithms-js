//设计哈希函数
//1.将字符串转成比较大的数字：hashCede
//2.将大的数字hasCode压缩到数组范围(大小)之内
function hashFunc(str, size) {
    //1.定义hashCode变量
    let hashCode = 0

    //2.霍纳法则，计算hashCode的值
    //cats -> Unicode编码
    for (let i = 0; i < str.length; i++) {
        // str.charCodeAt(i)//获取某个字符对应的unicode编码
        hashCode = 37 * hashCode + str.charCodeAt(i)    // 37为所采用的质数
    }

    //3.取余操作
    let index = hashCode % size
    return index
}



// 测试哈希函数
console.log(hashFunc('abc',7))  // 4
console.log(hashFunc('cba',7))  // 3
console.log(hashFunc('nba',7))  // 5
console.log(hashFunc('mba',7))  // 1