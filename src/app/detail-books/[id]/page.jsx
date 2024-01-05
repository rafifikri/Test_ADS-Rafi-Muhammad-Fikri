"use client";

import { getDetailBooks } from "@/lib/apis/books/api";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Detail() {
  const [books, setBooks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getDetailBooks(id);
      setBooks(result.data);
    } catch (error) {
      console.log(error.toString());
    }
  }

  const bookDetails = [
    { label: "Judul", value: books.title },
    { label: "Deskripsi", value: books.description },
    { label: "Harga", value: books.price },
    { label: "Penulis", value: books.author },
  ];

  return (
    <div className="w-full h-screen">
      <div className="m-52 p-10 shadow-md">
        <h1 className="mb-10 border-b text-3xl font-semibold pb-1">
          Detail Buku
        </h1>
        {bookDetails.map((detail, index) => (
          <div key={index} className="mb-3">
            <h1 className="text-lg font-semibold">{detail.label}</h1>
            <p className="pt-3">{detail.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
