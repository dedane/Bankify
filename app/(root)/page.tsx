import React from 'react'
import HeaderBox from '../../components/HeaderBox'
import TotalBalanceBox from '../../components/TotalBalanceBox';
import RightSideBar from '../../components/ui/RightSideBar';
import { getLoggedInUser } from '../../lib/actions/user.actions';
import { getAccount, getAccounts } from '../../lib/actions/bank.actions';
import RecentTransactions from '../../components/RecentTransactions';

async function Home({searchParams: {id, page}}: SearchParamProps) {
    
    const currentPage = Number(page as String) ||  1  
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({userId: loggedIn.$id})

    if(!accounts) return

    const accountsData = accounts?.data
    const appwriteItemId = (id as string) || accounts?.Data?.appwriteItemId;

    const account = await getAccount({ appwriteItemId})
    
    return (
        <section className='home'>
            <div className='home-content'>
                <header className='home-header'>
                    <HeaderBox
                        type='greeting'
                        title='welcome'
                        user={loggedIn?.firstName || 'Guest'}
                        subtext='Access and manage your account and transaction effectively' />
                    <TotalBalanceBox
                        accounts={accountsData}
                        totalBank={accounts?.totalBanks}
                        totalCurrentBalance={accounts?.totalCurrentBalance} />
                </header>
                <RecentTransactions 
                    accounts={accountsData}
                    transactions={account?.transactions}
                    appwriteItemId={appwriteItemId}
                    page={currentPage} />
            </div>
            <RightSideBar
                user={loggedIn}
                transactions={account?.transactions}
                banks={accountsData?.slice(0, 2 )} />
        </section>
    );
}

export default Home