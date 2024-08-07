import Link from 'next/link'
import React from 'react'

const RecentTransactions = ({
    accounts,
    transactions =[],
    appwriteItemId,
    page = 1
}: RecentTransactionsProps) => {
  return (
    <section className='recent-transactions'>
        <header className='flex items-center justify-between '>
            <h2 className='recent-transactions-label'>
                recent transactions
            </h2>
            {/* <Link>
            </Link> */}

        </header>
        RecentTransactions
    </section>
  )
}

export default RecentTransactions