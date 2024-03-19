import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faFloppyDisk,
  faPlus,
  faMinus,
  faFaceLaughBeam,
  faSadTear,
} from "@fortawesome/free-solid-svg-icons";

function formatNumber(num) {
  // return "Rp " + num.toLocaleString("");
  return "Rp " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // Mengkonversi number ke string supaya dapat menggunakan metode replace.
  //Lalureplace dan bla-bla bla ini buat cari angka tiga dgit dari belakang
}

export default function DebtManagementApp() {
  const [debts, setDebts] = useState([]); // menyimpan data
  const [newDebtName, setNewDebtName] = useState(""); // nama baru
  const [newDebtAmount, setNewDebtAmount] = useState(""); // jumlah utang baru
  const [changeDebtAmount2, setChangeDebtAmount2] = useState(""); // jumlah utang yang dikuarangi
  const [changeDebtAmount, setChangeDebtAmount] = useState(""); // jumlah utang yang ditambah
  const [indexEdit, setIndexEdit] = useState(null);
  const [inputEdit, setInputEdit] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");
  const [showAddInput, setShowAddInput] = useState(null);
  const [showReduceInput, setShowReduceInput] = useState(null);

  const handleAddDebt = (e) => {
    e.preventDefault(); // mencegah default dari submit agar tidak merefresh
    if (!newDebtAmount || !newDebtName.trim()) {
      // jika nama dan total uangnya masih kosong
      alert("error : masih ada kolom yang belum terisi");
      return;
    }
    if (newDebtAmount === "0") {
      // pengaman jika total uang yang diinput 0
      alert("error: jumlah utang belum ditulis");
      return;
    }
    if (debts.some((e) => e.name === newDebtName.trim())) {
      // pengaman jika nama yang diinput sudah ada dalam daftar
      alert("Error: Nama Penghutang sudah ada dalam daftar");
      return;
    }
    setDebts([
      ...debts,
      {
        name: newDebtName.trim(),
        amount: String(Number(newDebtAmount)),
        checked: false,
      }, // menambah object baru ke debt
    ]);
    setNewDebtName("");
    setNewDebtAmount("");
  };

  const handleEditDebt = (e) => {
    if (indexEdit === e) {
      setIndexEdit(null); // Menyembunyikan input edit nama
    } else {
      setIndexEdit(e); // Jika tidak, kita akan menampilkan input edit nama untuk item yang diberikan.
      setInputEdit({ ...debts[e] }); // Mengatur data input edit
      setShowAddInput(null); // Menutup input toggle untuk penambahan jumlah utang
      setShowReduceInput(null);
    }
  };

  const handleUpdateDebt = () => {
    const newDebts = [...debts]; // Membuat salinan array debts

    newDebts[indexEdit] = inputEdit; // Mengganti item di indeks indexEdit dengan nilai dari objek inputEdit

    if (!inputEdit.name.trim()) {
      // Memeriksa apakah nama utang yang diedit masih kosong atau hanya terdiri dari spasi
      alert("error : kolom masih kosong"); // Menampilkan pesan kesalahan jika nama utang kosong
      return;
    }
    // Memeriksa apakah ada nama yang di daftar debt
    if (debts.some((debt) => debt.name === inputEdit.name.trim())) {
      alert("Error: Nama Penghutang sudah ada dalam daftar"); // Menampilkan pesan kesalahan jika ada nama yang sama
      return;
    }
    setDebts(newDebts); // Mengatur array utang baru dengan nilai yang telah diperbarui
    setIndexEdit(null); // Mengatur kembali nilai indexEdit menjadi null
    setInputEdit(""); // Mengatur nilai inputEdit menjadi string kosong
  };

  const handleDeleteAllDebts = () => {
    if (debts.length === 0) {
      alert("error: Tidak ada utang yang bisa dihapus.");
      return;
    }

    if (confirm(`Ingin menghapus?`)) {
      setDebts([]);
    }
  };

  const handleDeleteChecked = () => {
    // Memeriksa apakah ada item yang dicentang (checked)
    const checkedDebts = debts.filter((debt) => debt.checked);
    if (checkedDebts.length === 0) {
      alert("error: Tidak ada utang yang dicentang untuk dihapus.");
      return;
    }

    if (confirm(`Ingin menghapus?`)) {
      // Menghapus item yang dicentang (checked)
      const newDebts = debts.filter((debt) => !debt.checked);
      setDebts(newDebts);
    }
  };

  const handleUpdateAmountPlus = (index, amount) => {
    // if (!amount) {
    //   alert("error : masih belum ada angkanya");
    //   return;
    // }
    const newDebts = [...debts];
    newDebts[index].amount = String(Number(newDebts[index].amount) + amount);
    setChangeDebtAmount("");
    setDebts(newDebts);
  };

  const handleUpdateAmountMinus = (index, amount) => {
    // if (!amount) {
    //   alert("error : masih belum ada angkanya");
    //   return;
    // }
    const newDebts = [...debts];
    newDebts[index].amount = String(Number(newDebts[index].amount) - amount);
    setChangeDebtAmount2("");
    setDebts(newDebts);
  };

  const toggleAddAmountInput = (index) => {
    if (showAddInput === index) {
      setShowAddInput(null);
    } else {
      setShowAddInput(index); // Jika tidak, maka kita akan menampilkan input toggle untuk indeks yang diberikan
      setShowReduceInput(null); // menyembunyikan input kurangi utang
      setIndexEdit(null); // Menyembunyikan input edit nama
    }
  };

  const toggleReduceAmountInput = (index) => {
    // Jika tombol - ditekan dan input toggle sudah terbuka pada indeks yang sama,
    // maka kita akan menutupnya.
    if (showReduceInput === index) {
      setShowReduceInput(null);
    } else {
      setShowReduceInput(index); // Jika tidak, maka kita akan menampilkan input toggle untuk indeks yang diberikan
      setShowAddInput(null); // Menyembunyikan input tambah utang
      setIndexEdit(null); // Menyembunyikan input edit nama
    }
  };

  const filteredDebts = debts.filter((debt) => {
    if (!filterCriteria) return true; // Jika kriteria filter tidak ditentukan, maka semua utang akan disertakan

    if (filterCriteria === "dibawah100rb") {
      return Number(debt.amount) < 100000;
    } else if (filterCriteria === "antara100rb-1jt") {
      return Number(debt.amount) >= 100000 && Number(debt.amount) <= 1000000;
    } else if (filterCriteria === "diatas1jt") {
      return Number(debt.amount) > 1000000;
    } else if (filterCriteria === "putih") {
      return !debt.checked;
    } else if (filterCriteria === "hitam") {
      return debt.checked;
    }
  });

  const filteredDebtsByName = filteredDebts.filter((debt) =>
    debt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[800px]">
        <div className="flex justify-center font-semibold mb-6 text-xl">
          Aplikasi Pencatat Utang
        </div>
        <form onSubmit={handleAddDebt} className="flex mb-4">
          <input
            placeholder="Nama Utang"
            value={newDebtName}
            onChange={(e) => setNewDebtName(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md p-2"
          />
          <input
            type="text"
            placeholder="Jumlah Utang"
            value={formatNumber(newDebtAmount)}
            onChange={(e) =>
              setNewDebtAmount(e.target.value.replace(/\D/g, ""))
            }
            className="flex-1 border border-gray-300 rounded-md p-2 ml-2"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md ml-2 font-semibold"
          >
            Submit
          </button>
        </form>

        <div className="mb-2 flex items-center gap-1">
          <div>Search :</div>
          <input
            className="border border-gray-300 rounded-md p-1"
            type="text"
            value={searchTerm.trim()}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>atau Silakan pilih menu filter dibawah</div>
        </div>

        <div className="flex text-center gap-3 font-semibold text-white mb-2">
          <button
            className={`flex-1 ${
              filterCriteria === "dibawah100rb" ? "bg-green-500" : "bg-blue-500"
            } rounded-md py-1`}
            onClick={() => setFilterCriteria("dibawah100rb")}
          >
            Dibawah 100 rb
          </button>
          <button
            className={`flex-1 ${
              filterCriteria === "antara100rb-1jt"
                ? "bg-green-500"
                : "bg-blue-500"
            } rounded-md py-1`}
            onClick={() => setFilterCriteria("antara100rb-1jt")}
          >
            Antara 100 rb - 1 jt
          </button>
          <button
            className={`flex-1 ${
              filterCriteria === "diatas1jt" ? "bg-green-500" : "bg-blue-500"
            } rounded-md py-1`}
            onClick={() => setFilterCriteria("diatas1jt")}
          >
            Diatas 1 jt
          </button>
        </div>
        <div className="flex text-center gap-3 font-semibold text-white mb-2">
          <button
            className={`flex-1 ${
              filterCriteria === "putih" ? "bg-green-500" : "bg-blue-500"
            } rounded-md py-1`}
            onClick={() => {
              setFilterCriteria("putih");
            }}
          >
            Daftar Putih
          </button>
          <button
            className={`flex-1 ${
              filterCriteria === "hitam" ? "bg-green-500" : "bg-blue-500"
            } rounded-md py-1`}
            onClick={() => {
              setFilterCriteria("hitam");
            }}
          >
            Daftar Hitam
          </button>
          <button
            className={`flex-1 ${
              filterCriteria === "" ? "bg-green-500" : "bg-blue-500"
            } rounded-md py-1`}
            onClick={() => setFilterCriteria("")}
          >
            Semua
          </button>
        </div>
        <div>
          {filteredDebtsByName.map((debt, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-md mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <div
                    style={{
                      textDecoration: debt.checked ? "line-through" : "none",
                    }}
                  >
                    {debt.name}
                  </div>
                  <div>{formatNumber(debt.amount)}</div>
                </div>
                <div className="flex gap-2.5">
                  <input
                    type="checkbox"
                    checked={debt.checked}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setDebts((prevDebts) => {
                        const updatedDebts = [...prevDebts];
                        updatedDebts[index].checked = isChecked;
                        return updatedDebts;
                      });
                    }}
                  />
                  <button
                    className="text-red-500"
                    onClick={() => {
                      if (confirm(`Ingin menghapus?`)) {
                        setDebts(debts.filter((_, i) => i !== index));
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    className="text-blue-500"
                    onClick={() => handleEditDebt(index)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="text-green-500"
                    onClick={() => toggleAddAmountInput(index)} // Mengubah aksi tombol + untuk menampilkan/menyembunyikan input jumlah
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => toggleReduceAmountInput(index)} // Mengubah aksi tombol + untuk menampilkan/menyembunyikan input jumlah
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                </div>
              </div>
              {indexEdit === index && (
                <div className="flex items-center mt-2">
                  <input
                    placeholder="Edit Nama Utang"
                    value={inputEdit.name}
                    onChange={(e) =>
                      setInputEdit({ ...inputEdit, name: e.target.value })
                    }
                    className="flex-grow border border-gray-300 rounded-l-md p-2"
                  />
                  <button
                    onClick={handleUpdateDebt}
                    className="bg-blue-500 text-white py-[9px] px-2.5 flex items-center  rounded-sm ml-2"
                  >
                    <FontAwesomeIcon icon={faFloppyDisk} className=" size-6" />
                  </button>
                </div>
              )}
              {showAddInput === index && (
                <div className="flex items-center mt-2">
                  <input
                    placeholder="Tambah Jumlah Utang"
                    type="text"
                    value={formatNumber(changeDebtAmount)}
                    onChange={(e) =>
                      setChangeDebtAmount(e.target.value.replace(/\D/g, ""))
                    }
                    className="flex-grow border border-gray-300 rounded-l-md p-2"
                  />
                  <button
                    onClick={() => {
                      handleUpdateAmountPlus(index, Number(changeDebtAmount));
                      setShowAddInput(null);
                    }}
                    className="bg-blue-500 text-white py-[9px] px-2.5 flex items-center  rounded-sm ml-2"
                  >
                    <FontAwesomeIcon icon={faSadTear} className=" size-6" />
                  </button>
                </div>
              )}
              {showReduceInput === index && (
                <div className="flex items-center mt-2">
                  <input
                    placeholder="Kurangi Jumlah Utang"
                    type="text"
                    value={formatNumber(changeDebtAmount2)}
                    onChange={(e) =>
                      setChangeDebtAmount2(e.target.value.replace(/\D/g, ""))
                    }
                    className="flex-grow border border-gray-300 rounded-l-md p-2"
                  />
                  <button
                    onClick={() => {
                      handleUpdateAmountMinus(index, Number(changeDebtAmount2));
                      setShowReduceInput(null);
                    }}
                    className="bg-blue-500 text-white py-[9px] px-2.5 flex items-center  rounded-sm ml-2"
                  >
                    <FontAwesomeIcon
                      icon={faFaceLaughBeam}
                      className=" size-6"
                    />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex text-center gap-3 font-semibold text-white">
          <button
            className="flex-1 bg-red-500 rounded-md py-1"
            onClick={handleDeleteChecked}
          >
            Hapus Sebagian
          </button>
          <button
            className="flex-1 bg-red-500 rounded-md py-1"
            onClick={handleDeleteAllDebts}
          >
            Hapus Semua
          </button>
        </div>
      </div>
    </div>
  );
}
