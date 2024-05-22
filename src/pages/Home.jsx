import React, { useEffect, useState } from "react";
import { apis } from "../networks/apis";
import { Modal, Button, Input, Form } from "antd";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const getCards = async () => {
    try {
      const res = await apis.getCards();
      if (cards.length === 0) {
        setCards(res);
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const getUserInfo = async () => {
    try {
      const res = await apis.getUserInfo();
      setUserInfo(res);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getCards();
    getUserInfo();
  }, []);

  const showModal = card => {
    setSelectedCard(card);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleTransaction = async () => {
    if (userInfo.stones < selectedCard.price) {
      alert("你的原石不足以购买此卡片");
      return;
    }

    try {
      const response = await apis.newTransaction({
        recipient: selectedCard.owner,
        amount: selectedCard.price,
        card_id: selectedCard.id,
      });

      if (response) {
        alert("交易成功");
        setIsModalVisible(false);
        setSelectedCard(null);
        getUserInfo();
        getCards();
      }
    } catch (error) {
      console.error("创建交易时出错:", error);
      alert("交易失败");
    }
  };

  return (
    <div className="w-full h-full text-white">
      <div className="bg-[#1d1d1c] w-full flex justify-between items-center">
        <div className="py-2 px-4">区块链游戏交易系统</div>
        <div className="w-[30px] h-[30px] rounded-full bg-[#2166d1] mx-4 my-2"></div>
      </div>
      <div className="flex items-center justify-center p-10 flex-col">
        <div className="w-full">Tradable Cards：</div>
        <div className="w-full flex flex-wrap -mx-2">
          {cards.map(card => (
            <div
              key={card.id}
              className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
              onClick={() => showModal(card)}
            >
              <div className="border border-gray-800 shadow-lg rounded-md overflow-hidden bg-white group">
                <div className="pb-[150%] relative">
                  <img
                    src={card.img}
                    alt={`Card ${card.name}`}
                    className="absolute w-full h-full top-0 left-0 object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-50"
                  />
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="text-center">
                      <p className="mb-2">Owner: {card.owner}</p>
                      <p>Price: {card.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCard && (
        <Modal
          title="Card Details"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          className="flex flex-col items-center justify-center p-6"
        >
          <img
            src={selectedCard.img}
            alt={`Card ${selectedCard.name}`}
            className="w-full h-auto rounded-lg"
          />
          <div className="text-white font-semibold p-2 rounded-md my-3 w-full text-center bg-green-600 shadow">
            Name: {selectedCard.name}
          </div>
          <div className="text-white font-semibold p-2 rounded-md my-3 w-full text-center bg-blue-500 shadow">
            Owner: {selectedCard.owner}
          </div>
          <div className="text-white font-semibold p-2 rounded-md my-3 w-full text-center bg-purple-500 shadow">
            Price: {selectedCard.price}
          </div>
          <Button
            type="primary"
            className="w-full mt-4"
            onClick={handleTransaction}
          >
            Transaction
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default Home;
