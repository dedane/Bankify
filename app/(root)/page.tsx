import React from 'react'
import HeaderBox from '../../components/HeaderBox'
import TotalBalanceBox from '../../components/TotalBalanceBox';

function Home() {
    const loggedIn = {firstName: 'Evans'};
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
        </div>
    </section>
  )
}

export default Home