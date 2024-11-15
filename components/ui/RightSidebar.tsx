import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BankCard from './BankCard'

const RightSidebar = ({ user, transactions, banks }:RightSidebarProps) => {
  
    if (!user) {
        return <div>User data is not available</div>;  // Return a fallback UI if 'user' is null or undefined
    }
  
    return (
    <aside className="right-sidebar">
        <section className="flex flex-col pb-8">
            <div className="profile-banner" />
            <div className="profile">
                <div className="profile-img">
                    <span className="text-5xl font-bold text-blue-500">
                        {user.name ? user.name[0] : 'U'}
                    </span>
                </div>

                <div className="profile-details">
                    <h1 className="profile-name">
                        {user.name || 'Guest'}
                    </h1>
                    <p className="profile-email">
                        {user.email || 'No email provided'}
                    </p>
                </div>
            </div>
        </section>

        <section className="banks">
            <div className="flex w-full justify-between">
                <h2 className="header-2">My Banks</h2>
                <Link href="/" className="flex gap-2">
                    <Image 
                        src="/icons/plus.svg"
                        width={20}
                        height={20}
                        alt="plus"
                    />
                    <h2 className="text-14 font-semibold text-gray-600">
                        Add Bank
                    </h2>
                </Link>
            </div>

            {banks?.length > 0 && (
                <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
                    <div className='relative z-10'>
                        <BankCard 
                            key={banks[0].$id}
                            account={banks[0]}
                            userName={user.name}
                            showBalance={false}
                        />
                    </div>
                    {banks[1] && (
                        <div className="absolute right-0 top-8 z-0 w-[90%]">
                            <BankCard 
                                key={banks[0].$id}
                                account={banks[0]}
                                userName={user.name}
                                showBalance={false}
                            />
                        </div>
                    )}
                </div>
            )}
        </section>
    </aside>
  )
}

export default RightSidebar