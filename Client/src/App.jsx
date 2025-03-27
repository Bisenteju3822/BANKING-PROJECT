import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Dashboard from "./Dashboard";
import HomePage from "./Pages/HomePage";
import Accountstate from "./Pages/AccountState";
import ResetPassword from "./Pages/ResetPassword";
import BalanceInquirey from "./Pages/BalanceInquirey";
import BillPayment from "./BillPayment";
import DepositeMoney from "./Pages/DepositeMoney";
import Withdraw from "./Pages/Withdraw";
import Services from "./Pages/Services";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
        </Route>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accountstatement" element={<Accountstate />} />
        <Route path="/balanceInquiry" element={<BalanceInquirey />} />
        <Route path="/deposit" element={<DepositeMoney />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/bill" element={<BillPayment />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
