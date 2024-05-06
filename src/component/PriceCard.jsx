import { useState } from "react";
import "../styles/pricecard.css";

const PriceCard = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const startFreeTrial = () => {
    alert("Start Free Trial clicked!");
  };

  const togglePricing = () => {
    setIsMonthly(!isMonthly);
  };

  const pricingData = [
    {
      id: 1,
      name: "Basic",
      monthlyPrice: "50 dkk",
      annuallyPrice: "550 dkk",
      features: [
        "Max 5 Users",
        "Max 1 Department",
        "Max 5 Teams",
        "iPhone & Android App",
        "Customer Support",
      ],
    },
    {
      id: 2,
      name: "Advanced",
      monthlyPrice: 100,
      annuallyPrice: 1050,
      features: [
        "Unlimited Employees",
        "Max 5 Department",
        "Unlimited Teams",
        "Time Tracking",
        "Plus Basic Features",
      ],
    },
    {
      id: 3,
      name: "Professional",
      monthlyPrice: 150,
      annuallyPrice: 1500,
      features: [
        "Shift Exchange",
        "Unlimited Department",
        "Budget Management",
        "Priority Support",
        "Plus Basic & Advanced Features",
      ],
    },
  ];

  return (
    <div className="pricing-container" id="pricing">
      <h2 className="price-heading">Choose your pricing plan</h2>
      <div className="toggle-container">
        <button onClick={togglePricing}>
          {isMonthly ? "Switch to Annually" : "Switch to Monthly"}
        </button>
      </div>
      <div className="pricing-tables">
        {pricingData.map((plan) => (
          <div key={plan.id} className="pricing-plan">
            <h2>{plan.name}</h2>
            <h3>
              {isMonthly
                ? `Dkk ${plan.monthlyPrice}  / month`
                : `Dkk ${plan.annuallyPrice}  / year`}
            </h3>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button onClick={startFreeTrial}>Start Free Trial</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceCard;
