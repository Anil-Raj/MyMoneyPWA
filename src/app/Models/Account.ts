import Currency from './Currency'

const GROUP = {
  cash: 'Cash',
  bank: 'Bank Account',
  deposit: 'Deposit',
  credit: 'Credit',
  asset: 'Asset'
}

// export const DELETE_STRATEGY_ARCHIVE = 0
// export const DELETE_STRATEGY_CLEANUP = 1
// export const DELETE_STRATEGY_MOVE = 2

export const Account =  {
  fromForm(data) {
    return {
      ...data,
      id: data.id || `A${Date.now()}`,
      balance: Object.keys(data.balance).reduce((acc, code) => {
        acc[code] = Currency.toInt(
          data.balance[code] !== '' ? data.balance[code] : 0,
          code
        )
        return acc
      }, {})
    }
  },
  toForm(data) {
    return {
      ...data,
      balance: Object.keys(data.balance).reduce((acc, code) => {
        acc[code] = Currency.toFloat(data.balance[code], code, false)
        return acc
      }, {})
    }
  },
  fromStorage(data) {
    return {
      id: data._id,
      ...data
    }
  },
  toStorage(data) {
    return data;
  },

  mutateBalance(account, currency, amount) {
    return {
      ...account,
      currencies: [...account.currencies, currency],
      balance: {
        ...account.balance,
        [currency]: parseInt(account.balance[currency] || 0, 10) + amount
      }
    }
  }
}