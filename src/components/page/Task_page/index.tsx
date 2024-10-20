import React, { useEffect, useState } from 'react';
import { Card, Steps, Button, Typography, Divider, Image, message, Spin } from 'antd';
import { CopyOutlined, RightOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAccountRequest, alertPush, RootState, updatedREQUEST, updateTaskSuccess } from 'modules';

const { Step } = Steps;
const { Title, Text } = Typography;

const TaskSteps: React.FC = () => {
  
   
  
  const history = useHistory();
  const dispatch = useDispatch()
  const {  start_param , user } = useSelector((state: RootState) => state.public.telegram);
  const { account } = useSelector((state: RootState) => state.public);
  const { tasks, loading , error  } = useSelector((state: RootState) => state.public.tasks);
  const [current, setCurrent] = useState(0); // Track the current step
 

  const handleActivate = () => {
    if (tasks.length  <= current) {
       
      dispatch(alertPush({ message : ['All steps completed!' ] , type : 'message'  , status : 'loading'}));
      dispatch(addAccountRequest({ start_param : start_param  , user   }));
      history.push('/reword_success')
    }
  };

  dispatch(alertPush({ message : [start_param as string]}))
  
useEffect(() =>{
  if (account.user) {
       history.push('/reword_success')
  }
} ,[ account ])
  


  const completeStep = () => {
    if (current < tasks.length - 0) {
       
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.openTelegramLink(`https://t.me/${tasks[current].url}`, '_blank');
        dispatch(updatedREQUEST({ task : tasks[ current  ] , user }))
      } else {
        console.error('Telegram WebApp not available');
      }
      
       
    } 
  };

useEffect(() =>{
 if (error === null || error || error  === 'User is not in the channel.')  return;
  setCurrent(current + 1)
  
}, [ error ])

 

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
          <Title level={3} className="m-0">0.07 USDT</Title>
          <Text type="secondary">≈ 0.07 $</Text>
        </div>

         

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
                  {index === current && !loading && current < tasks.length ? (
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
          onClick={ handleActivate }
          // Disable if already activated
        >
           Activate 
        </Button>
      </Card>
    </div>
  );
};

export default TaskSteps;
