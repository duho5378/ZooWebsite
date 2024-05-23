import React, { useState } from 'react';
import initialAnimalData from '../zooAnimalsDetail/animalsData'; // Lưu dữ liệu ban đầu

const AdminAnimal = () => {
  const [animals, setAnimals] = useState(initialAnimalData);

  const handleDelete = (index) => {
    const updatedAnimals = [...animals];
    updatedAnimals.splice(index, 1);
    setAnimals(updatedAnimals);

    // Xóa phần tử tương ứng từ AnimalData gốc (Nếu đây là dữ liệu có thể thay đổi)
    const updatedInitialAnimalData = [...initialAnimalData];
    updatedInitialAnimalData.splice(index, 1);
    initialAnimalData.splice(0, initialAnimalData.length, ...updatedInitialAnimalData);
  };

  return (
    <div>
      <h1>Admin Animal Page</h1>
      <div>
        {animals.map((animal, index) => (
          <div key={index}>
            <button onClick={() => handleDelete(index)}>-</button>
            <span>{`${animal.id}: ${animal.title}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnimal;
