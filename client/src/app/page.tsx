"use client";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_ALL_PERFUMES = gql`
  query GetAllPerfumes(
    $includePerfume: Boolean!
    $includeEauDePerfume: Boolean!
    $includeToilette: Boolean!
    $includeSize: String!
    $gender: String!
  ) {
    getAllPerfumes(gender: $gender) {
      id
      brandName
      productName
      gender
      perfume(size: $includeSize) @include(if: $includePerfume) {
        size
        price
        qty
      }
      eauDeParfume(size: $includeSize) @include(if: $includeEauDePerfume) {
        size
        price
        qty
      }
      toitlette(size: $includeSize) @include(if: $includeToilette) {
        size
        price
        qty
      }
    }
  }
`;

export default function Home() {
  const [perfumeType, setperfumeType] = useState("perfume");
  const [gender, setGender] = useState("male");
  const [productSize, setProductSize] = useState("sm");

  console.log("Perfume Type:", perfumeType);
  console.log("Gender:", gender);
  console.log("Product Size:", productSize);

  const { loading, error, data } = useQuery(GET_ALL_PERFUMES, {
    variables: {
      includePerfume: perfumeType === "perfume",
      includeEauDePerfume: perfumeType === "eauDeParfume",
      includeToilette: perfumeType === "toitlette",
      includeSize: productSize,
      gender
    },
    onError: (error) => {
      console.error("GraphQL Error:", error);
      console.log("Variables:", {
        includePerfume: perfumeType === "perfume",
        includeEauDePerfume: perfumeType === "eauDeParfume",
        includeToilette: perfumeType === "toitlette",
        includeSize: productSize,
        gender
      });
    }
  });

  return (
    <div className="flex min-h-screen font-['Montserrat']">
      <div className="w-1/3 bg-gray-200 p-6 flex flex-col font-medium">
        <h2 className="text-xl font-bold mb-4">Filter Perfumes</h2>
        <select
          className="p-2 border rounded-md shadow-md bg-white text-gray-700"
          value={perfumeType}
          onChange={(e) => setperfumeType(e.target.value)}
        >
          <option value="perfume">Perfume</option>
          <option value="eauDeParfume">Eau de Parfum</option>
          <option value="toitlette">Toilette Perfume</option>
        </select>
        
        <div className="flex gap-3 mt-4">
          {["male", "female"].map((g) => (
            <button
              key={g}
              className={`p-2 border rounded-md shadow-md ${g === gender ? "bg-gray-500 text-white" : "bg-white"}`}
              onClick={() => setGender(g)}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          {["sm", "md", "lg"].map((size, index) => (
            <button
              key={size}
              className={`p-2 border rounded-md shadow-md ${productSize === size ? "bg-gray-500 text-white" : "bg-white"}`}
              onClick={() => setProductSize(size)}
            >
              {index === 0 ? "50 ml" : index === 1 ? "100 ml" : "150 ml"}
            </button>
          ))}
        </div>
      </div>
      <div className="w-2/3 bg-white p-6 overflow-y-auto font-light">
        <h1 className="text-2xl font-extrabold text-center mb-6">Perfume Collection</h1>
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error.message}</p>}
        <div className="grid grid-cols-1 gap-6">
          {data?.getAllPerfumes?.map((perfume: any) => (
            <div key={perfume.id} className="bg-gray-100 shadow-lg rounded-lg p-4 font-normal">
              <h2 className="text-lg font-semibold">{perfume.brandName}</h2>
              <p className="text-gray-500">{perfume.productName}</p>
              <p className="text-sm text-gray-600">Gender: {perfume.gender}</p>
              <div className="mt-4">
                {perfume[perfumeType] && (
                  <p className="text-sm font-semibold">Size {perfume[perfumeType][productSize]}: ${perfume[perfumeType].price} ({perfume[perfumeType].qty} left)</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}