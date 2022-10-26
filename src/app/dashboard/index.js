import React from 'react'
import Greetings from '../../components/cards/Greetings'
import CalculateExpense from '../../components/cards/CalculateExpense';
import CalcPayments from '../../components/cards/CalcPayments';
import CalcAppartment from '../../components/cards/CalcAppartment';
import CalcUser from '../../components/cards/CalcUser';
import StatsUsers from '../../components/cards/StatsUsers';
import StatsPayments from '../../components/cards/StatsPayments';
import StatsAppartments from '../../components/cards/StatsAppartments';
import StatsExpenses from '../../components/cards/StatsExpenses';
import CardStat from '../../components/cards/CardStat';
import Transactions from '../../components/cards/Transactions';

export default function Dashboard() {
  return (
    <div>
      <Greetings />
      <CardStat/>
      <div className='grid grid-cols-4 gap-4'>
        <CalcPayments />
        <CalculateExpense />
        <CalcUser />
        <CalcAppartment />
      </div>
      <div className='grid grid-cols-2 gap-8 py-8'>
        <Transactions />
        {/* <StatsExpenses />
        <StatsPayments />
        <StatsUsers />
        <StatsAppartments /> */}
      </div>
    </div>
  )
}