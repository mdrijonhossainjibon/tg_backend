import React, { useState } from 'react';
import { Card, Steps, Button, Typography, Divider, Image, message, Spin } from 'antd';
import { CopyOutlined, RightOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const { Step } = Steps;
const { Title, Text } = Typography;

// Sample data for tasks
const tasks = [
  { title: 'Nur Islam Roman 💸🇧🇩', description: 'Follow the channel', path: 'file_0' , url : 'https://t.me/Nur6432' },
  { title: 'OnlineEarning24 RIYAD', description: 'Follow the channel', path: 'file_2' , url : 'https://t.me/OnlineEarning24RIYAD' },
  { title: 'Md Rijon Hossain Jibon || AIRDROP 🚀🪂', description: 'Follow the channel', path: 'file_1' , url : 'https://t.me/mdrijonhossainjibon_airdrop'},
  { title: 'Crypto Rahi', description: 'Follow the channel', path: 'file_3' , url : 'https://t.me/OnlineEarning24RIYAD'}
];

const TaskSteps: React.FC = () => {
  const [current, setCurrent] = useState(0); // Track the current step
  const [isActivated, setIsActivated] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const history= useHistory();

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://t.me/RR_Supporters_bot?startapp=ID4GOZMER7002&hash=67122d36c49c9f754a084bbe');
    message.success('Referral link copied!');
  };

  const handleActivate = () => {
    if (current === tasks.length - 0) { // Check if all tasks are completed
      setIsActivated(true);
      message.success('Task activated successfully!');
      history.push('/reword_success')
    } else {
      message.error('Complete all tasks before activating!');
    }
  };

  const completeStep = () => {
    setLoading(true); // Start loading
  
    setTimeout(() => {
      // Move to the next step
      setCurrent((prev) => Math.min(prev + 1, tasks.length - 0));
  
      message.success('Step completed!');
      setLoading(false); // Stop loading
  
      // Open Telegram channel for the current step
      const currentTask = tasks[current];
      if (currentTask) {
        const telegrampath =  currentTask.url ;
        window.open(telegrampath, '_blank'); // Open the Telegram channel in a new tab
      }
    }, 1000); // Simulate loading time
  };
  

  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <Card
        className="rounded-lg shadow-lg text-center bg-gradient-to-r w-full h-full"
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
        {/* Reward */}
        <div className="mb-5">
          <Title level={3} className="m-0">0.02 USDT</Title>
          <Text type="secondary">≈ 0.02 $</Text>
        </div>

        {/* Referral Link */}
        <Button
          type="primary"
          shape="round"
          icon={<CopyOutlined />}
          className="mb-5"
          onClick={handleCopyLink}
        >
          Get referral link
        </Button>

        <Divider />
 
        {/* Task Steps */}
        <Steps direction="horizontal" size="small" current={current}>
          {tasks.map((task, index) => (
            <Step
              key={index}
              className="w-full"
              description={
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-2">
                      <img
                        className="rounded-[24px]"
                        src={`https://api.telegram.org/file/bot7837648046:AAE6IDa6EleiVEJNzkz1oQ6bwIFNcp0xKg0/profile_photos/${task.path}.jpg`}
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{task.title}</p>
                      <p className="text-xs text-gray-400">{task.description}</p>
                    </div>
                  </div>
                  {index === current && !loading && current < tasks.length - 0 ? (
                    <RightOutlined onClick={completeStep} className="cursor-pointer" />
                  ) : loading && current === index ? (
                    <Spin size="small" />
                  ) : null}
                </div>
              }
            />
          ))}
        </Steps>

        {/* Activate Button */}
        <Button
          type="primary"
          className="mt-2 w-full"
          onClick={handleActivate}
          disabled={isActivated} // Disable if already activated
        >
          {isActivated ? 'Activated' : 'Activate'}
        </Button>
      </Card>
    </div>
  );
};

export default TaskSteps;
