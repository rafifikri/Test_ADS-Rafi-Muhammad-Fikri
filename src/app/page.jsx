"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";

import { getBooks, deleteBook } from "@/lib/apis/books/api";
import Button from "@/components/button";
import Table from "@/components/table";

export default function Page() {
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const router = useRouter();

  const columns = useMemo(
    () => [
      {
        header: "Judul",
        accessorKey: "title",
        cell: (info) => (
          <div
            className="cursor-pointer hover:underline"
            onClick={() => onClickDetail(info.row.original.id)}
          >
            {info.getValue()}
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        header: "Deskripsi",
        accessorKey: "description",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Harga",
        accessorKey: "price",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Penulis",
        accessorKey: "author",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Aksi",
        accessorKey: "actionEdit",
        cell: (info) => (
          <div className="flex flex-col">
            <div className="pb-2">
              <Button
                label="Ubah"
                className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
                onClick={() => onClickEdit(info.row.original.id)}
              />
            </div>
            <div>
              <Button
                label="Hapus"
                className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => onClickDelete(info.row.original.id)}
              />
            </div>
          </div>
        ),
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getBooks();
      setBooks(result.data);
      setTotalBooks(result.data.length);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function onClickDelete(book_id) {
    try {
      await deleteBook(book_id);
      toast.success("Data buku berhasil dihapus");
      fetchData();
    } catch (error) {
      toast.error(error.message);
    }
  }

  function onClickEdit(id) {
    router.push(`/create-edit-books/${id}`);
  }

  function onClickDetail(id) {
    router.push(`/detail-books/${id}`);
  }

  return (
    <div className="w-full">
      <div className="m-52">
        <h1 className="mb-8 border-b-2 text-5xl pb-3">Daftar Buku</h1>
        <p className="mb-3 text-lg font-semibold">
          Jumlah buku tersedia : {totalBooks}
        </p>
        <Button
          label="Tambah Buku"
          className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2 text-white py-3 px-6 rounded-lg font-semibold"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
                fill="white"
              />
              <path
                d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z"
                fill="white"
              />
            </svg>
          }
          href={`/create-edit-books`}
        />
        <div className="w-full h-full  shadow-md mt-5">
          <h1 className="px-5 pt-5 text-xl font-semibold">Data Buku</h1>
          <Table datas={books} columns={columns} />
        </div>
      </div>
    </div>
  );
}
