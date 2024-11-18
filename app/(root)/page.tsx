import React from 'react'
import HeaderBox from '@/components/ui/HeaderBox'
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import RightSidebar from '@/components/ui/RightSidebar';
import { getLoggedInUser } from '@/lib/actions/user.action';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import RecentTransactions from '@/components/ui/RecentTransactions';

interface SearchParams {
  id?: string | null;
  page?: string | null;
}

const Home = async ({ searchParams }: { searchParams?: SearchParams }) => {
  const {id,page} = searchParams || {};
  const currentPage = Number(page) || 1;
  const loggedIn = await getLoggedInUser();
  console.log(loggedIn);

  const accounts = await getAccounts({ userId: loggedIn.$id})

  if(!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  console.log({
    accountsData,
    account
  })

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type = "greeting"
            title = "Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext = "Access and manage your account and transactions effieciently."
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions 
          accounts = {accountsData}
          transactions = {account?.transactions}
          appwriteItemId = {appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  )
}

export default Home