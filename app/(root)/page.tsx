import React from 'react'
import HeaderBox from '../../components/HeaderBox'
import TotalBalanceBox from '../../components/TotalBalanceBox';
import RightSideBar from '../../components/ui/RightSideBar';

function Home() {
    const loggedIn = {firstName: 'Evans', lastName: 'Kimathi', email: 'evanskeema@gmail.com'};
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
               <HeaderBox
                    type='greeting'
                    title='welcome'
                    user={loggedIn?.firstName || 'Guest'}
                    subtext='Access and manage your account and transaction effectively'
                />
                <TotalBalanceBox
                    accounts={[]}
                    totalBank={1}
                    totalCurrentBalance={1250.35}
                />
            </header>
            RECENT TRANSACTIONS
        </div>
        <RightSideBar 
            user={loggedIn}
            transactions={[]}
            banks={[{currentBalance: 123.50}, {currentBalance: 203.50}]} />
    </section>
  )
}

export default Home