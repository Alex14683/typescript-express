import moment from 'moment'
import fetch from 'node-fetch'

const COINDESK_API = 'https://api.coindesk.com/v1/bpi/historical/close.json?currency=USD&start=2022-06-24&end=2022-07-25'

type BitcoinPriceIndex = {
    bpi: {
        [key: string]: number
    }
    disclaimer: string
    time: {
        updated: string
        updatedISO: string
    }
}

async function fetchData(): Promise<BitcoinPriceIndex> {
    const result = await fetch(COINDESK_API)

    return await result.json()
}

async function main() {
    const { bpi } = await fetchData()

    const highestPrice = Math.max(...Object.values(bpi))

    const [dateString] = Object.entries(bpi).find(
        ([, price]) => price === highestPrice
    )

    const date = moment(dateString, 'YYYY-MM-DD')

    console.log(date.format('MMMM Do'))
}

main()