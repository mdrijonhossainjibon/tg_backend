import React, { useEffect, useState } from 'react';
import { Card,  Button, Typography } from 'antd';
import {   ShareAltOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAccountRequest, alertPush, getTaskRequest, RootState, updatedREQUEST } from 'modules';
import { Image } from 'antd-mobile';
 
const { Title, Text } = Typography;

const TaskSteps: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { start_param, user } = useSelector((state: RootState) => state.public.telegram);
  const { account } = useSelector((state: RootState) => state.public);
  


  const handleClose = () => {
    // Close the web app
    if (window.Telegram && window.Telegram.WebApp.initDataUnsafe.user) {
      
      window.Telegram.WebApp.openTelegramLink('https://t.me/RR_Supporters_bot?start=welcome','_blank')
      window.Telegram.WebApp.close();
    } else {
      dispatch(alertPush({ message : ['Telegram WebApp API is not available.'] , type : 'mobile'   }))
    }
  };



  const handleShare = () => {
   

    if (window.Telegram && window.Telegram.WebApp.initDataUnsafe.user) {
      const { uid , _id } = account.user as any;
      const shareText = "💰 Check out this amazing cheque I activated! Earn 0.10 USDT per person and 0.035 USDT from each referral. 💵 Reward pool: $5000! 🎉\n\n🔥 Don't miss out on this exclusive opportunity! 📈 Start earning today and invite your friends for extra rewards! 🚀";
      const shareUrl = `https://t.me/RR_Supporters_bot?startapp=${ uid }&hash=${_id}`; // Replace with the actual URL you want to share
      const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
      window.Telegram.WebApp.openTelegramLink(telegramShareUrl, '_blank');
    } else {
      dispatch(alertPush({ message : ['Telegram WebApp API is not available.'] , type : 'mobile'   }))
    }
  };


  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <Card
        className="rounded-lg shadow-lg text-center bg-gradient-to-r   sm:w-[420px] w-full  h-full"
        title={
          <div className="flex justify-center items-center">
            <Image
              src={require('../../../e0a5b301-193d-42b3-97f0-86bed876ebc8.jpg')}
              width={24}
              height={24}
              className="w-10 mr-2 rounded-[10px]"
            />
            <Title level={4} className="m-1">Cheque</Title>
          </div>
        }
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
              <div  >
                <h3 className="text-lg md:text-xl font-bold">0.10 USDT</h3>
                <p className="text-gray-400 text-sm md:text-base">≈ 0.10 $</p>
              </div>
            </div>
          </div>

          {/* Share and Rewards */}
          <div className="border-t border-b border-red-700 py-1 md:py-2 mb-3 md:mb-4">
            <p className="text-center text-xs md:text-sm text-gray-400">SHARE AND GET REWARDS</p>
          </div>

          {/* Per User Reward */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs md:text-sm text-gray-400">Per one user</p>
              <p className="font-semibold text-base md:text-lg">0.035 USDT</p>
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-400">≈ 0.035 $</p>
            </div>
          </div>
        </div>

        {/* Cheque Link & Share Buttons */}
        <div className=" flex justify-center gap-2 bottom-0 relative  sm:top-[21em] top-[13em]  " style={{ alignItems: 'flex-end' }}>

          <Button className="flex items-center w-full" type="default" style={{ color: '#722ed1', borderColor: '#722ed1', marginTop: '8px' }} onClick={ handleShare} >
            <ShareAltOutlined />
            Share
          </Button>
          {/* Close Button */}
          <Button className="bg-purple-500 text-white w-full" type="primary" onClick={ handleClose } >  CLOSE </Button>
        </div>


      </Card>


    </div>
  );
};

export default TaskSteps;
