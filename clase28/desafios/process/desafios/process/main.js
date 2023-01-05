//tomamos los argumentos 
const args = process.argv

process.on('exit', code => {
    if (code) {
        console.log(`saliendo con codigo ${code}`)
    } else {
        console.log(`saliendo... adios!`)
    }

})

process.on('uncaughtException', error => {
    console.log(error)
    switch (error.descripcion) {
        case 'entrada vacia': return process.exit(-4)
        case 'error de tipo': return process.exit(-5)
        default: return process.exit()
    }
})

function avg(nums) {
    if (nums.length == 0) {
        throw {
            descripcion: 'entrada vacia'
        }
    }
    let total = 0
    for (const num of nums) {
        //devuelve los tipos de datos ingresados
        const val = Number(num)
        if (isNaN(val)) {
            throw {
                descripcion: 'error de tipo',
                numeros: nums,
                tipos: nums.map(n => isNaN(n) ? typeof n : 'number')
            }
        } else {
            total += val
        }
    }
    return total / nums.length
}

const numeros = args.slice(2)
const promedio = avg(numeros)
const max = Math.max(...numeros)//calcula el numero maximo 
const min = Math.min(...numeros)//calcula el numero mimo
const ejecutable = process.execPath.split('/').pop()
const pid = process.pid

const datos = {
    numeros,
    promedio,
    max,
    min,
    ejecutable,
    pid
}

console.log(datos)