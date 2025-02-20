"use client";
import { gql, useQuery } from "@apollo/client";

const GET_ALL_PERFUMES = gql`
 query GetAllPerfumes(
    $includePerfume: Boolean!
    $includeEauDePerfume: Boolean!
    $includeToilette: Boolean!
) {
    getAllPerfumes {
        id
        brandName
        productName
        gender
        perfume(size: "sm") @include(if: $includePerfume) {
            size
            price
            qty
        }
        eauDeParfume(size: "md") @include(if: $includeEauDePerfume) {
            size
            price
            qty
        }
        toitlette(size: "lg")@include(if: $includeToilette) {
            size
            price
            qty
        }
    }
}
 `;


export default function Home() {

  const { loading, error, data } = useQuery(GET_ALL_PERFUMES, {
    variables: {
      includePerfume: true,
      includeEauDePerfume: false,
      includeToilette: false,
    },
  });

  console.log(data);

  return (
   <>ssssss</>
  );
}
