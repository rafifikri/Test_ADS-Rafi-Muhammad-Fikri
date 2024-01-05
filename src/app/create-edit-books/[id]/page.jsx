"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { Input } from "@/components/input";
import Button from "@/components/button";
import { createBook, updateBook, getDetailBooks } from "@/lib/apis/books/api";

export default function CreateEditBook() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    author: "",
  });
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    setSelectedId(id ? parseInt(id) : 0);
    if (id) {
      fetchData();
    }
  }, [id]);

  async function fetchData() {
    try {
      const result = await getDetailBooks(id);
      const bookData = result.data;
      setFormData(bookData);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createBook(formData);
      toast.success("Data buku berhasil ditambahkan");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();

    try {
      await updateBook(id, formData);
      toast.success("Data buku berhasil diubah");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (selectedId === 0) {
      handleSubmit(event);
    } else {
      handleSubmitEdit(event);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="mx-52 my-24 p-10 shadow-md">
        <h1 className="mb-2 text-3xl pb-3">
          {selectedId === 0 ? "Form Tambah Buku" : "Form Edit Buku"}
        </h1>
        <form onSubmit={handleFormSubmit}>
          <Input
            label="Judul"
            type="text"
            placeholder="Judul"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <Input
            label="Deskripsi"
            type="text"
            placeholder="Deskripsi"
            className="pb-40"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <Input
            label="Harga"
            type="number"
            placeholder="Harga"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          <Input
            label="Penulis"
            type="text"
            placeholder="Penulis"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            label={selectedId === 0 ? "Tambah" : "Ubah"}
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded flex items-center justify-center"
          />
        </form>
      </div>
    </div>
  );
}
