import React from 'react'
import HeaderBox from '@/components/ui/HeaderBox'
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import RightSidebar from '@/components/ui/RightSidebar';
const Home = () => {
  const loggedIn = { firstName: 'Maruthi', lastName: 'Venkat', email:'venkatreddynareddula@gmail.com'};
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
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>

        RECENT TRANSACTIONS
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123.50 }, { currentBalanceurrentBalance: 500.50 }]}
      />
    </section>
  )
}

export default Home