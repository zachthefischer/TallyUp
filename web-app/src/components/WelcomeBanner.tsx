import logo from '../assets/TallyUp Logo.png';

function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#092341] to-[#396e7c] rounded-xl p-8 mb-6 shadow-lg">
      <div className="relative z-10">
        <div className="flex items-center gap-1 mb-3">
          <h2 className="text-4xl font-bold text-white tracking-tight">
            Welcome to
          </h2>
          <img 
            src={logo}
            alt="TallyUp Logo" 
            className="h-16 w-auto brightness-0 invert"
          />
        </div>
        <p className="text-gray-200 text-lg leading-relaxed max-w-2xl">
          <i> Your all-in-one solution for club finances and reimbursements </i>
        </p>
      </div>
      <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-8 translate-y-12"></div>
      <div className="absolute right-0 bottom-0 w-48 h-48 bg-white/5 rounded-full transform translate-x-12 translate-y-16"></div>
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-16 translate-y-20"></div>
    </div>
  );
}

export default WelcomeBanner;