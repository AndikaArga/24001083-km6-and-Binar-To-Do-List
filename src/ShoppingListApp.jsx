import React, { useState } from "react";
import { FaTrashAlt, FaPencilAlt, FaSave, FaPlus, FaMinus } from "react-icons/fa";

function formatAmount(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function DebtTrackerApp() {
  const [newDebt, setNewDebt] = useState({ nama: "", amount: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");

  let debts = [];

  const handleAddDebt = (e) => {
    e?.preventDefault();
    const parsedAmount = parseInt(newDebt.amount.replace(/\./g, ""));
    if (newDebt.nama.trim() !== "" && !isNaN(parsedAmount) && parsedAmount > 0) {
      debts.push({ nama: newDebt.nama, amount: parsedAmount });
      setNewDebt({ nama: "", amount: "" });
    }
  };

  const handleEditDebt = (index) => {
    setEditIndex(index);
    setEditName(debts[index].nama);
  };

  const handleUpdateDebt = () => {
    const updatedDebts = [...debts];
    updatedDebts[editIndex].nama = editName;
    debts = updatedDebts;
    setEditIndex(null);
    setEditName("");
  };

  const handleAmountChange = (index, amount) => {
    const updatedDebts = [...debts];
    updatedDebts[index].amount += amount;
    debts = updatedDebts;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Debt Tracker</h1>
        
        <form onSubmit={handleAddDebt} className="flex mb-4">
          <input
            placeholder="Nama Debitur"
            value={newDebt.nama}
            required={true}
            onChange={(e) => setNewDebt({ ...newDebt, nama: e.target.value })}
            className="flex-grow border border-gray-300 rounded-l-md p-2 mr-2 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Jumlah Utang"
            value={formatAmount(newDebt.amount)}
            required={true}
            onChange={(e) => setNewDebt({ ...newDebt, amount: e.target.value.replace(/[^0-9]/g, "") })}
            className="w-24 border border-gray-300 p-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
        </form>
        
        <div className="max-h-96 overflow-y-auto">
          {debts?.map((debt, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow-md mb-4 flex justify-between items-center"
            >
              <div className="flex items-center">
                {editIndex === index ? (
                  <input
                    placeholder="Edit Nama"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 mr-2 focus:outline-none"
                  />
                ) : (
                  <div className="mr-2">{debt.nama}</div>
                )}
                {editIndex !== index && (
                  <div>Rp. {debt.amount.toLocaleString()}</div>
                )}
              </div>
              
              <div className="flex flex-col">
                <button
                  className="text-blue-500 mb-2 focus:outline-none"
                  onClick={() => handleAmountChange(index, 90000)}
                >
                  <FaPlus size={20} />
                </button>
                
                <button
                  className="text-red-500 focus:outline-none"
                  onClick={() => debts.splice(index, 1)}
                >
                  <FaTrashAlt size={20} />
                </button>
                
                {editIndex === index ? (
                  <button
                    className="text-green-500 mt-2 focus:outline-none"
                    onClick={handleUpdateDebt}
                  >
                    <FaSave size={20} />
                  </button>
                ) : (
                  <button
                    className="text-green-500 mt-2 focus:outline-none"
                    onClick={() => handleEditDebt(index)}
                  >
                    <FaPencilAlt size={20} />
                  </button>
                )}
                
                <button
                  className="text-blue-500 mt-2 focus:outline-none"
                  onClick={() => handleAmountChange(index, -90000)}
                >
                  <FaMinus size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
