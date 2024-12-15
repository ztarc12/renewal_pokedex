import { Suspense } from "react";
import PokemonList from "./components/PokemonList";
import Loading from "@/Loading";

export default function Home() {
  return (
    <div>
      <PokemonList/>
    </div>
  );
}
