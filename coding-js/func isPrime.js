/* 
// 封装函数:判断传入的数字是否是质数
function isPrime(num) {
    // 只能被1和num整除，不能被2 ~ (num-1)整除
    if (num <= 1) {
        return false
    }
    for (var i = 2; i < num; i++) {
        if (num % i == 0) {
            return false
        }
    }
    return true
} */

// 更高效的方法
function isPrime(num) {
    if (num <= 1) {
        return false
    }

    // 1.获取num的平方根:Math.sqrt(num)
    let temp = parseInt(Math.sqrt(num))

    // 2.循环判断
    for (let i = 2; i <= temp; i++) {
        if (num % i == 0) {
            return false
        }
    }
    return true
}


// 验证函数
console.log(isPrime(3)) // true
console.log(isPrime(12)) // false
console.log(isPrime(123)) // false
console.log(isPrime(41)) // true
console.log(isPrime(-3)) // false