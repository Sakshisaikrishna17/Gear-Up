import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchGear from "./pages/searchgear";
import ResultPage from "./pages/resultpage";
import AddListing from "./pages/addlisting";
import Payment from "./pages/Payment";
import SecurePayment from "./pages/SecurePayment";
import RentalAgreement from "./pages/Rentalagreement";
import Review from "./pages/Review";
import Dashboard from "./pages/Dashboard";
import Notification from "./pages/Notification";
import PickupReturn from "./pages/PickupReturn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/searchgear" element={<SearchGear />} />
          <Route path="/resultpage" element={<ResultPage />} />
          <Route path="/addlisting" element={<AddListing />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/securepayment" element={<SecurePayment />} />
          <Route path="/rentalagreement" element={<RentalAgreement />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/notification" element={<Notification/>}/>
          <Route path="/pickupreturn" element={<PickupReturn/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
