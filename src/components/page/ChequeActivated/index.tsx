import React from 'react';
import { Card, Button } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from 'modules';

const ChequeActivated: React.FC = () => {

  const handleClose = () => {
    // Close the web app
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.close();

    } else {
      console.warn("Telegram WebApp API is not available.");
    }
  };

  const {  account } = useSelector((state: RootState) => state.public);
  const handleShare = () => {
    const { uid , _id } = account.user as any;
    const shareText = "💰 Check out this amazing cheque I activated! Earn 0.07 USDT per person and 0.04 USDT from each referral. 💵 Reward pool: $5000! 🎉\n\n🔥 Don't miss out on this exclusive opportunity! 📈 Start earning today and invite your friends for extra rewards! 🚀";
    const shareUrl = `https://t.me/RR_Supporters_bot?startapp=${ uid }&hash=${_id}`; // Replace with the actual URL you want to share
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

    // Open the Telegram share dialog
    window.open(telegramShareUrl, '_blank');
  };

  return (
    <div className="max-w-md mx-auto p-4 md:p-6">
      <Card
        style={{
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Eyes Emoji */}
        <div className="flex justify-center items-center mb-3 md:mb-4">
          <span className="text-3xl md:text-4xl">👀</span>
        </div>

        {/* Cheque Activated Text */}
        <div className="text-center mb-3 md:mb-4">
          <h4 className="text-lg md:text-xl font-semibold">Cheque activated</h4>
          <p className="text-gray-400 text-sm md:text-base">You already activated this cheque</p>
        </div>

        {/* Reward Box */}
        <div className="bg-gray-100 p-3 md:p-4 rounded-lg mb-3 md:mb-4">
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <div className="flex items-center">
              <img
                src="https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661"
                alt="Coin Icon"
                className="w-8 md:w-10 mr-2"
              />
              <div>
                <h3 className="text-lg md:text-xl font-bold">0.07 USDT</h3>
                <p className="text-gray-400 text-sm md:text-base">≈ 0.07 $</p>
              </div>
            </div>
          </div>

          {/* Share and Rewards */}
          <div className="border-t border-b border-gray-300 py-1 md:py-2 mb-3 md:mb-4">
            <p className="text-center text-xs md:text-sm text-gray-400">SHARE AND GET REWARDS</p>
          </div>

          {/* Per User Reward */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs md:text-sm text-gray-400">Per one user</p>
              <p className="font-semibold text-base md:text-lg">0.04 USDT</p>
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-400">≈ 0.04 $</p>
            </div>
          </div>
        </div>

        {/* Cheque Link & Share Buttons */}
        <div className=" flex justify-center gap-1 " style={{ alignItems: 'flex-end' }}>

          <Button className="flex items-center w-full" type="default" style={{ color: '#722ed1', borderColor: '#722ed1', marginTop: '8px' }} onClick={handleShare}>
            <ShareAltOutlined />
            Share
          </Button>
          {/* Close Button */}
          <Button className="bg-purple-500 text-white w-full" type="primary" onClick={handleClose}>  CLOSE </Button>
        </div>


      </Card>
    </div>
  );
};

export default ChequeActivated;
