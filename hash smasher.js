const { Worker, isMainThread, parentPort } = require('worker_threads');
const { createHash } = require('crypto');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}
function testHash(input) {
    test = hash(input)
    let length = 0
    for (let check in find) {
        pointer = 0
        length = find[check].length
        while (test[pointer] == find[check][pointer % length]) {
            pointer++
        }
        if (pointer > best[check]) {
            best[check] = pointer
            bestHash[check] = input
        }
    }
    pointer = 0
    length = find.length - 1
    while (!isNaN(test[pointer]) && pointer < 64) {
        pointer++
    }
    if (pointer >= 40) {
        console.log(`Score >= 40: ${input} --> ${test}`)
    }
    if (pointer > best[length]) {
        best[length] = pointer
        bestHash[length] = input
    }
    pointer = 0
    length++
    while (isNaN(test[pointer]) && pointer < 64) {
        pointer++
    }
    if (pointer > best[length]) {
        best[length] = pointer
        bestHash[length] = input
    }
}
let pointer = 0
let string = ''
let combo = 0
let test = ''
let best = [0, 0]
let bestHash = []
const find = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', '0123456789', '1234567890', 'abcdef', '8badf00d', 'bad', 'badf00d', 'b16b00b5', 'bad22222', 'beefbabe', 'deadbeef', 'cafebabe', 'badbabe5', 'e621', '69', '420', '69420', '3141592653589793238462643383279502884197169399375105820974944592']
// ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', '123456789', 'abcdef', 'b00b5', 'b00b135', '800b135', 'b008135', '8008135', 'b00b1e5', '800b1e5', 'b0081e5', '80081e5']
// ['8badf00d', 'bad', 'badf00d', 'b16b00b5', 'bad22222', 'beefbabe', 'deadbeef', 'cafebabe', 'badbabe5']
// const words = ['']
// const mix = ['a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
// ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const mix = ['​', '‍', '‌',]
// const mix = ['?', '!']
const words = ['']
const unitValue = [1000, 60, 60, 24, 7]
const unit = ['milliseconds', 'seconds and ', 'minutes, ', 'hours, ', 'days, ', 'weeks, ']
const length = 20
// mix.length
for (let i = 0; i < find.length + 1; i++) {
    bestHash.push('')
    best.push(0)
}

const start = Date.now();
for (let word in words) {
    for (let n = 0; n < mix.length ** length; n++) {
        string = ''
        combo = n
        for (let i = 0; i < length; i++) {
            string += mix[combo % mix.length]
            combo -= combo % mix.length
            combo /= mix.length
        }
        testHash(`HACK${words[word]}${string}PACK`)
    }
}
const end = Date.now();
for (let hashes in bestHash) {
    console.log(bestHash[hashes])
}
for (let hashes in bestHash) {
    console.log(`${bestHash[hashes]} ${best[hashes]}`)
}
i = 0
let computationTime = end - start
let time = []
let output = ''
while (computationTime > unitValue[i]) {
    time.push(`${computationTime % unitValue[i]} ${unit[i]}`)
    computationTime = (computationTime - computationTime % unitValue[i]) / unitValue[i]
    i++
}

console.log(time)
while (time.length > 0) {
    output += time.pop()
}
console.log(end - start)
console.log(start)
console.log(`computed ${words.length * mix.length ** length} hashes in ${output}!`);
