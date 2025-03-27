import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, CreditCard, DollarSign, Lock, User, Star } from "lucide-react";

const DashCards = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const services = [
    {
      id: 1,
      title: "Balance Inquiry",
      description: "View your account balances and recent transactions.",
      icon: <Home size={40} className="text-blue-500" />,
      actionText: "View Summary",
      link: "/balanceInquiry",
    },
    {
      id: 2,
      title: "Account Statement",
      description: "Download or print your detailed account statements.",
      icon: <CreditCard size={40} className="text-blue-500" />,
      actionText: "Get Statement",
      link: "/accountstatement",
    },
    {
      id: 3,
      title: "Deposit Money",
      description: "Easily deposit funds into your account online.",
      icon: <DollarSign size={40} className="text-green-500" />,
      actionText: "Deposit Now",
      link: "/deposit",
    },
    {
      id: 4,
      title: "Withdraw Money",
      description: "Withdraw funds securely and on the go.",
      icon: <DollarSign size={40} className="text-red-500" />,
      actionText: "Withdraw Now",
      link: "/withdraw",
    },
    {
      id: 5,
      title: "Reset Password",
      description: "Update your password to keep your account safe.",
      icon: <Lock size={40} className="text-gray-500" />,
      actionText: "Reset Now",
      link: "/resetpassword",
    },
    {
      id: 6,
      title: "Bill Payments",
      description: "Pay your bills quickly and securely online.",
      icon: <Star size={40} className="text-yellow-500" />,
      actionText: "Pay Now",
      link: "/bill",
    },
    {
      id: 7,
      title: "Services",
      description: "This are the services.",
      icon: <Star size={40} className="text-yellow-500" />,
      actionText: "Pay Now",
      link: "/services",
    },
  ];

  const articles = [
    {
      id: 1,
      title: "How to Keep Your Account Secure",
      description:
        "Learn the top tips for ensuring the safety of your online banking account.",
      link: "/secure-account",
    },
    {
      id: 2,
      title: "Benefits of Online Banking",
      description:
        "Explore the advantages of managing your finances anytime, anywhere.",
      link: "/online-banking-benefits",
    },
    {
      id: 3,
      title: "Understanding Credit Scores",
      description:
        "Discover how credit scores impact your financial journey and how to improve them.",
      link: "/credit-scores",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <User size={40} className="text-primary mr-2" />
          <div>
            <h6 className="fw-bold text-primary">
              Welcome, {username || "Guest"}!
            </h6>
            <p className="text-muted fs-9">
              Your email is {email || "Not Available"}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Dashboard Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-center mb-4">
              {service.icon}
            </div>
            <h2 className="text-xl font-bold text-gray-700 text-center">
              {service.title}
            </h2>
            <p className="text-gray-500 text-center mb-4">
              {service.description}
            </p>
            <div className="flex justify-center">
              <a
                href={service.link}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                {service.actionText}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Featured Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-bold text-gray-700 mb-2">
                {article.title}
              </h3>
              <p className="text-gray-500 mb-4">{article.description}</p>
              <a href={article.link} className="text-blue-500 hover:underline">
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashCards;
