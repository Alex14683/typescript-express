const data = `id,currency,value
1,BTC,0.152
2,ETH,-0.024
3,BTC,1.137
4,BTC,-0.386
5,ETH,0.519`

const lines = data.split('\n').slice(1)

interface Transaction {
    id: string
    currency: string
    value: number
}

const transactions: Array<Transaction> = lines.map(line => {
    const [id, currency, valueString] = line.split(',')
    return { id, currency, value: Number(valueString) }
})

const currencies = Array.from(new Set(transactions.map(t => t.currency)))

console.log(currencies.join(', '))

const largest = currencies.map(currency => {
    const relevantTransactions = transactions.filter(t => t.currency === currency)
    const maxValue = Math.max(...relevantTransactions.map(t => t.value))
    const maxTransaction = relevantTransactions.find(t => t.value === maxValue)

    return `${maxTransaction.currency}: ${maxTransaction.value}`
})

console.log(largest.join(', '))