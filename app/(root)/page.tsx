import React from 'react';
import HeaderBox from '@/components/ui/HeaderBox';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import RightSidebar from '@/components/ui/RightSidebar';
import { getLoggedInUser } from '@/lib/actions/user.action';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import RecentTransactions from '@/components/ui/RecentTransactions';

interface SearchParams {
  id?: string | null;
  page?: string | null;
}

const Home = async ({ searchParams }: { searchParams?: Promise<Record<string, string | null>> }) => {
  const resolvedSearchParams = (await searchParams) || {};
  const id = resolvedSearchParams.id || null;
  const page = resolvedSearchParams.page || null;
  const currentPage = Number(page) || 1;

  let loggedIn, accounts, account;

  try {
    loggedIn = await getLoggedInUser();
    if (!loggedIn) {
      return <div>Please log in to access your account.</div>;
    }

    accounts = await getAccounts({ userId: loggedIn.$id });
    if (!accounts?.data?.length) {
      return <div>No accounts available. Please add an account.</div>;
    }

    const accountsData = accounts.data;
    const appwriteItemId = id || (accountsData && accountsData.length > 0 ? accountsData[0]?.appwriteItemId : null);

    if (!appwriteItemId) {
      return <div>No account ID found. Please add or select an account to proceed.</div>;
    }

    account = await getAccount({ appwriteItemId });

    if (!account) {
      return <div>Failed to retrieve account details. Please try again later.</div>;
    }

    return (
      <section className="home">
        <div className="home-content">
          <header className="home-header">
            <HeaderBox
              type="greeting"
              title="Welcome"
              user={loggedIn?.firstName || 'Guest'}
              subtext="Access and manage your account and transactions efficiently."
            />
            <TotalBalanceBox
              accounts={accountsData}
              totalBanks={accounts?.totalBanks}
              totalCurrentBalance={accounts?.totalCurrentBalance}
            />
          </header>
          <RecentTransactions
            accounts={accountsData}
            transactions={account?.transactions}
            appwriteItemId={appwriteItemId}
            page={currentPage}
          />
        </div>
        <RightSidebar
          user={loggedIn}
          transactions={account?.transactions}
          banks={accountsData?.slice(0, 2)}
        />
      </section>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading your data. Please try again later.</div>;
  }
};

export default Home;
